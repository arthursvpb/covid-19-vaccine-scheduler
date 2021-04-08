const mongoose = require('mongoose');

const appointment = {
  name: { type: String, required: true },
  birthday: { type: Date, required: true },
  vaccinationDate: { type: Date, required: true },
};

const AppointmentSchema = new mongoose.Schema(appointment, {
  timestamps: true,
});
const Appointment = mongoose.model('appointment', AppointmentSchema);

module.exports = Appointment;
