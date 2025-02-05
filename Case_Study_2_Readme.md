# 📌 Implementation Guide: Automating Google Calendar & Forms

This guide outlines the step-by-step setup of an automated workflow integrating **Google Calendar, Google Forms, and Google Drive** using Google Apps Script.

---

## 🛠️ Step 1: Set Up Google Calendar Trigger

1. Open **Google Apps Script**: [script.google.com](https://script.google.com/)
2. Click **New Project** and paste the provided script.
3. Find `"<FORM_URL>"` in the script and **replace it** with your actual Google Form URL.
4. **Deploy the script** and authorize the required permissions.

---

## 📝 Step 2: Set Up Google Form Trigger

1. Ensure that your **Google Form collects email addresses** (Go to Form settings and enable it).
2. The script is designed to **automatically monitor new responses every 5 minutes**, eliminating manual intervention.

---

## 📂 Step 3: Configure Google Drive

- The script **creates a "handoff" folder** in Google Drive when a Google Calendar event is scheduled.
- This folder is **shared with Participant A**, ensuring easy access to all necessary documents.

---

## ✅ Step 4: Test & Debug

1. **Create a test event in Google Calendar** with at least **two participants**.
2. **Submit a response** in the linked **Google Form**.
3. **Verify Google Drive** → A new folder should be created.
4. **Check email notifications** → Both participants should receive a notification.
5. If any issues arise, **review the logs**:
   - Open Google Apps Script.
   - Go to **View → Execution Log**.

---

🚀 Your automation is now set up and running! If needed, adjust the script parameters or triggers for customization.
