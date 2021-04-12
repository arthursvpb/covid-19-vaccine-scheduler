const Appointment = require('../models/appointment.model');

const AppointmentController = {
  async index(_, res) {
    try {
      const appointments = await Appointment.find();

      return res.status(200).json(appointments);
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  },
  async create(req, res) {
    const { body } = req;
    const { vaccinationDate, vaccinationTime } = body;
    const {
      MAX_DAILY_APPOINTMENT_DISPONIBILITY,
      MAX_APPOINTMENT_DISPONIBILITY_PER_TIME,
    } = process.env;

    // Check daily disponibility
    const isDayAvailable =
      (await Appointment.count({ vaccinationDate })) <
      MAX_DAILY_APPOINTMENT_DISPONIBILITY;

    if (!isDayAvailable) {
      return res.status(400).json({ message: `This day isn't available.` });
    }

    // Check time disponibility
    const isTimeAvailable =
      (await Appointment.count({ vaccinationDate, vaccinationTime })) <
      MAX_APPOINTMENT_DISPONIBILITY_PER_TIME;

    if (!isTimeAvailable) {
      return res.status(400).json({ message: `This time isn't available.` });
    }

    try {
      const appointment = await Appointment.create(body);

      return res.status(200).json({
        message: '✅ Created appointment successfully!',
        data: appointment,
      });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  },
};

module.exports = AppointmentController;
