# DFCAMCLP Faculty Evaluation System 🎓

A modern, web-based evaluation portal designed for **DFCAMPERS** and **IT-Scholars** to provide structured feedback for faculty members. This system was built to replace manual processes with a streamlined, digital-first approach.

## 🚀 Key Features
* **Dynamic Faculty Filtering:** Quickly locate teachers by Course, Year, and Section.
* **Authorized Session Identity:** Custom "Student Identity" portal for **DFCAMPERS** (No login required).
* **Admin Control:** Built-in "Site Availability" toggle to manage evaluation periods.
* **Optimized UX:** Auto-scrolling results, "Quick Start" guide pop-ups, and full mobile responsiveness.

## 🛠️ Tech Stack
* **Frontend:** React.js (Vite)
* **UI Framework:** Material UI (MUI)
* **Backend:** Google Apps Script / Google Sheets API
* **Environment:** Windows / WSL (Ubuntu)

## 📊 Data Integrity Logic
To ensure data accuracy, the system generates a **Unique Key** for every submission:
If the system detects a duplicate key in the Google Sheet, it prevents the submission and highlights the conflict in **Red Fill** for the administrator to review.
