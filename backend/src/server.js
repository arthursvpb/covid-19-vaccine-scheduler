/* Environment */
require('dotenv/config');

/* Database */
require('./database/connection');

/* Imports */
const express = require('express');
const cors = require('cors');

const app = express();
const morgan = require('morgan');
const routes = require('./routes');
const { accessLogConfig, method } = require('./config/morgan.config');

/* Express configuration */
app.use(morgan(method, { ...accessLogConfig }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

module.exports = app;

/* Server */
app.listen(process.env.PORT || 8080, () =>
  console.log(`✨ Server is listening. `),
);
