const express = require('express');

const app = express();

// const myRoute = require('./myRoute.route');

app.get('/', (req, res) => res.json({ message: 'Hello World!' }));
// app.use('/myRoute', myRoute);

module.exports = app;
