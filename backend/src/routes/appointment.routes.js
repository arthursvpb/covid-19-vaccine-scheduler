const express = require('express');

const router = express.Router();

const AppointmentController = require('../controllers/appointment.controller');

router.get('/appointments', AppointmentController.index);

module.exports = router;
