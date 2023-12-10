const Doctor = require('../models/doctorModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

// Doctor Registration
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the doctor already exists
    let doctor = await Doctor.findOne({ username });

    if (doctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    // Create a new doctor
    doctor = new Doctor({ username, password });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    doctor.password = await bcrypt.hash(password, salt);

    await doctor.save();

    res.status(200).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Doctor Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the doctor exists
    const doctor = await Doctor.findOne({ username });

    if (!doctor) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ user: { id: doctor.id } }, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
