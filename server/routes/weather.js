const express = require('express');
const router = express.Router();

// Middleware
const asyncMiddleware = require('../middleware/async-middleware');

// Controller
const weatherController = require('../controllers/weather.controller');

// Routes
router.get('/api/current-weather', weatherController.getWeather);
router.get('/api/wind-gust/:start/:end', weatherController.getWindGust);
router.get('/api/:property/:start/:end', weatherController.getDataRange);

module.exports = router;