function onCalendarEventCreated(event) {
  try {
    var calendarEvent = event;
    var attendees = calendarEvent.getGuestList();
    
    // Ensure at least two participants are present
    if (attendees.length < 2) {
      Logger.log("Not enough participants to create a handoff folder.");
      return;
    }
    
    // Retrieve email addresses of the first two participants
    var participantA = attendees[0].getEmail();
    var participantB = attendees[1].getEmail();
    var folderName = participantA + " + " + participantB + " Handoff";
    
    // Create a new folder in the root directory of Google Drive
    var parentFolder = DriveApp.getRootFolder();
    var handoffFolder = parentFolder.createFolder(folderName);
    
    // Share the folder with Participant A
    handoffFolder.addEditor(participantA);
    
    Logger.log("Folder created: " + folderName);
  } catch (e) {
    Logger.log("Error in onCalendarEventCreated: " + e.toString());
  }
}

function monitorFormResponses() {
  try {
    // Open the Google Form using its URL
    var form = FormApp.openByUrl("<FORM_URL>");
    var responses = form.getResponses();
    
    // Exit if no responses are available
    if (responses.length === 0) return;
    
    // Get the latest response
    var latestResponse = responses[responses.length - 1];
    var responseItems = latestResponse.getItemResponses();
    
    // Format responses into a text block
    var pdfContent = "Form Responses:\n";
    responseItems.forEach(function(item) {
      pdfContent += item.getItem().getTitle() + ": " + item.getResponse() + "\n";
    });
    
    // Convert the formatted text into a PDF file
    var pdfBlob = Utilities.newBlob(pdfContent, "application/pdf", "handoff.pdf");
    
    // Retrieve the existing handoff folder by name
    var handoffFolder = DriveApp.getFoldersByName(participantA + " + " + participantB + " Handoff").next();
    
    // Save the PDF file in the handoff folder
    var pdfFile = handoffFolder.createFile(pdfBlob);
    
    // Notify both participants about the uploaded document
    sendNotificationEmail(participantA, participantB, pdfFile.getUrl());
  } catch (e) {
    Logger.log("Error in monitorFormResponses: " + e.toString());
  }
}

function sendNotificationEmail(participantA, participantB, fileUrl) {
  try {
    var subject = "Handoff Document Available";
    var body = "The handoff document has been uploaded. Access it here: " + fileUrl;
    
    // Send notification emails to both participants
    MailApp.sendEmail(participantA, subject, body);
    MailApp.sendEmail(participantB, subject, body);
  } catch (e) {
    Logger.log("Error in sendNotificationEmail: " + e.toString());
  }
}

function setupTriggers() {
  // Set up a trigger for calendar event updates
  ScriptApp.newTrigger("onCalendarEventCreated")
    .forUserCalendar(Session.getActiveUser().getEmail())
    .onEventUpdated()
    .create();
  
  // Set up a trigger to monitor form responses every 5 minutes
  ScriptApp.newTrigger("monitorFormResponses")
    .timeBased()
    .everyMinutes(5)
    .create();
}
