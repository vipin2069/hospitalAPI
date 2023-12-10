const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  phoneNumber: { type: String, required: true, unique: true },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
