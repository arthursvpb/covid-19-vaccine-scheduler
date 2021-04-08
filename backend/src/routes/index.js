const express = require('express');

const app = express();

const AppointmentRoutes = require('./appointment.routes');

app.get('/', (req, res) => res.json({ message: 'Hello World!' }));
app.use('/', AppointmentRoutes);

module.exports = app;
