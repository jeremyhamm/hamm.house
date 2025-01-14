require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// API routes
const currentWeather = require('./routes/weather');

// Run app
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Cors
app.use(cors());

// App
app.use('/', currentWeather);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
