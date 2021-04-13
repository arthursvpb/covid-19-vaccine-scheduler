/* eslint-disable no-underscore-dangle */
const { parse, differenceInCalendarYears } = require('date-fns');
const Appointment = require('../models/appointment.model');

const validateAppointment = async (req, res, next) => {
  const { vaccinationDate, vaccinationTime, birthday } = req.body;
  const {
    MAX_DAILY_APPOINTMENT_DISPONIBILITY,
    MAX_APPOINTMENT_DISPONIBILITY_PER_TIME,
  } = process.env;

  // Check if pacient is older than the appointment person
  const pacientBirthday = parse(birthday, 'dd-MM-yyyy', new Date());
  const scheduledPacients = await Appointment.find({
    vaccinationDate,
    vaccinationTime,
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const scheduledPacient of scheduledPacients) {
    const scheduledPacientBirthday = parse(
      scheduledPacient.birthday,
      'dd-MM-yyyy',
      new Date(),
    );

    const scheduledPacientAge = differenceInCalendarYears(
      new Date(),
      scheduledPacientBirthday,
    );

    // The new pacient is older and the scheduled pacient is not aged too.
    if (
      scheduledPacientAge < 60 &&
      pacientBirthday < scheduledPacientBirthday
    ) {
      // eslint-disable-next-line no-await-in-loop
      await Appointment.findByIdAndUpdate(scheduledPacient._id, {
        ...req.body,
      });
      return res.status(200).json({
        message: `✅ You have priority! Created appointment successfully.`,
      });
    }
  }

  // Check daily disponibility
  const isDayAvailable =
    (await Appointment.count({ vaccinationDate, isConcluded: false })) <
    MAX_DAILY_APPOINTMENT_DISPONIBILITY;

  // Check time disponibility
  const isTimeAvailable =
    (await Appointment.count({
      vaccinationDate,
      vaccinationTime,
      isConcluded: false,
    })) < MAX_APPOINTMENT_DISPONIBILITY_PER_TIME;

  if (!isDayAvailable) {
    return res.status(400).json({ message: `😓 This day isn't available.` });
  }

  if (!isTimeAvailable) {
    return res.status(400).json({ message: `😓 This time isn't available.` });
  }

  return next();
};

module.exports = validateAppointment;
