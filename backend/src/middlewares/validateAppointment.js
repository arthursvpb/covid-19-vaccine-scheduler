const Appointment = require('../models/appointment.model');

const validateAppointment = async (req, res, next) => {
  const { vaccinationDate, vaccinationTime } = req.body;
  const {
    MAX_DAILY_APPOINTMENT_DISPONIBILITY,
    MAX_APPOINTMENT_DISPONIBILITY_PER_TIME,
  } = process.env;

  // Check daily disponibility
  const isDayAvailable =
    (await Appointment.count({ vaccinationDate, isConcluded: false })) <
    MAX_DAILY_APPOINTMENT_DISPONIBILITY;

  if (!isDayAvailable) {
    return res.status(400).json({ message: `😓 This day isn't available.` });
  }

  // Check time disponibility
  const isTimeAvailable =
    (await Appointment.count({
      vaccinationDate,
      vaccinationTime,
      isConcluded: false,
    })) < MAX_APPOINTMENT_DISPONIBILITY_PER_TIME;

  if (!isTimeAvailable) {
    return res.status(400).json({ message: `😓 This time isn't available.` });
  }

  return next();
};

module.exports = validateAppointment;
