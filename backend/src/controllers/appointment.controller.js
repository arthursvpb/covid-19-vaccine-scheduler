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
