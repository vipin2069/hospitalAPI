# Hospital API

This is the API for a hospital application managing COVID-19 patients and doctors.

## Getting Started

1. Install dependencies:

   ```bash
   npm install

## 1. Set up MongoDB: Update config.js with your MongoDB connection string.

2. Run the server:

   ```bash
   npm start

## 3.Use the provided routes to interact with the API.

# Routes
## Doctors
    `POST /doctors/register - Register a new doctor
    `POST /doctors/login - Login and get a JWT token
## Patients
    `POST /patients/register - Register a new patient
    `POST /patients/login - Login and get a JWT token
## Reports
    `POST /reports/:id/create_report - Create a report for a patient (Doctor authentication required)
    `GET /reports/:id/all_reports - Get all reports for a patient (Patient authentication required)
    `GET /reports/:status - Get all reports filtered by status (Doctor authentication required)