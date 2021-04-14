/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();

const AppointmentController = require('../controllers/appointment.controller');

const validateAppointment = require('../middlewares/validateAppointment');

router.get('/appointments', AppointmentController.index);
router.post('/appointments', validateAppointment, AppointmentController.create);
router.put('/appointments/:id', validateAppointment, AppointmentController.update);

module.exports = router;
