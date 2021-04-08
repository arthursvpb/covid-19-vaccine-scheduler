const mongoose = require('mongoose');

const {
  DB_PROTOCOL,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

const URI =
  DB_USER || DB_PASS
    ? `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    : `${DB_PROTOCOL}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;
