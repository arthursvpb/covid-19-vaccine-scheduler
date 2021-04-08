const Appointment = require('../models/appointment.model');

const AppointmentController = {
  async index(req, res) {
    return res.status(200).json({ message: 'Hello Appointment' });
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
