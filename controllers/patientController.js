const Patient = require('../models/patientModel');

// Patient Registration
exports.register = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Check if the patient already exists
    let patient = await Patient.findOne({ phoneNumber });

    if (patient) {
      return res.status(400).json({ message: 'Patient already exists', patient });
    }

    // Create a new patient
    patient = new Patient({ phoneNumber });

    await patient.save();

    res.status(200).json({ message: 'Patient registered successfully', patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Patient Login
exports.login = async (req, res) => {
    const { phoneNumber } = req.body;
  
    try {
      // Check if the patient exists
      const patient = await Patient.findOne({ phoneNumber });
  
      if (!patient) {
        return res.status(400).json({ message: 'Patient not found' });
      }
  
      res.status(200).json({ message: 'Patient logged in successfully', patient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };