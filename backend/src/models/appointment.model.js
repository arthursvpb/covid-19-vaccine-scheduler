const mongoose = require('mongoose');

const appointment = {
  name: { type: String, required: true },
  birthday: { type: String, required: true },
  vaccinationDate: { type: String, required: true },
  vaccinationTime: { type: String, required: true },
  isConcluded: { type: Boolean, default: false },
  conclusion: { type: String, default: '' },
};

const AppointmentSchema = new mongoose.Schema(appointment, {
  timestamps: true,
});
const Appointment = mongoose.model('appointment', AppointmentSchema);

module.exports = Appointment;
