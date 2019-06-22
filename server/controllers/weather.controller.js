const connection = require('../database/postgres.connection');

/**
 * Get most recent weather data
 * 
 */
exports.getWeather = async function (req, res, next) {
  
  // Format queries
  const tables = ['atmospheric_pressure', 'humidity', 'rainfall', 'soil_temperature', 'temperature', 'wind_direction', 'wind_gust', 'wind_speed'];
  let sql = '';
  tables.forEach(function(prop, index) {
    sql += 'SELECT * FROM $' + (index + 1) + '~ ORDER BY date DESC LIMIT 1;';
  });

  // Get data
  let weatherData = {};
  await connection.multi(sql, tables)
    .then(results => {
      tables.forEach(function(prop, index) {
        weatherData[prop] = results[index][0];
      });
      return res.json(weatherData);
    })
    .catch(error => {
      console.log('ERROR:', error);
    })
}

/**
 * Get property for date period
 *
 */
exports.getDataRange = async function (req, res, next) {

  // Format dates
  let property = req.params.property.replace('-', '_');
  let start = new Date(req.params.start * 1000).toISOString();
  let end = new Date(req.params.end * 1000).toISOString();
  
  // Write SQL statement
  let sql = `
    SELECT value, date
    FROM $1~
    WHERE date >= $2 AND date <= $3
    ORDER BY date DESC
    LIMIT 25
  `;
  
  // Get data
  let weatherData = {};
  await connection.query(sql, [property, start, end])
    .then(results => {
      weatherData[property] = results;
      return res.json(weatherData);
    })
    .catch(error => {
      console.log('ERROR:', error);
      return res.json(error);
    })
}

/**
 * Get top wind gust for datetime period
 * 
 */
exports.getWindGust = async function (req, res, next) {
  
  // Format dates
  let start = new Date(req.params.start * 1000).toISOString();
  let end = new Date(req.params.end * 1000).toISOString();
  
  // Format queries
  const sql = `
    SELECT * 
    FROM wind_gust 
    WHERE date >= $1 AND date <= $2
    ORDER BY value DESC 
    LIMIT 1
  `;
  
  // Get data
  await connection.one(sql, [start, end])
    .then(results => {
      return res.json(results);
    })
    .catch(error => {
      console.log('ERROR:', error);
      return res.json(error);
    })
}