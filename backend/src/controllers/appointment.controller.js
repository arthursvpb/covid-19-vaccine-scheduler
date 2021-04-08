const AppointmentController = {
  async index(req, res) {
    return res.status(200).json({ message: 'Hello Appointment' });
  },
};

module.exports = AppointmentController;
