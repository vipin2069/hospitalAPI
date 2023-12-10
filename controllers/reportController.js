const Report = require('../models/reportModel');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');

// Create Report
exports.createReport = async (req, res) => {
  const { patientId, status } = req.body;
  const createdBy = req.user.id;
  const userRole = req.user.role;

  try {
    // Check if the user is a doctor
    if (userRole !== 'doctor') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the patient and doctor exist
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(createdBy);

    if (!patient || !doctor) {
      return res.status(400).json({ message: 'Patient or doctor not found' });
    }

    // Create a new report
    const report = new Report({ createdBy, patient: patientId, status });

    await report.save();

    res.status(200).json({ message: 'Report created successfully', report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get All Reports for a Patient
exports.getAllReportsForPatient = async (req, res) => {
  const patientId = req.params.id;

  try {
    // Get all reports for the patient sorted by date
    const reports = await Report.find({ patient: patientId }).sort({ date: 'asc' });

    res.status(200).json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get All Reports by Status
exports.getAllReportsByStatus = async (req, res) => {
  const status = req.params.status;

  try {
    // Check if the user is a doctor
    if (req.user.role !== 'doctor') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get all reports for all patients with the specified status
    const reports = await Report.find({ status });

    res.status(200).json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
