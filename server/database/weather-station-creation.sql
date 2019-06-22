-- Create tables for raspberry pi weather station

CREATE TABLE atmospheric_pressure (
  id SERIAL PRIMARY KEY,
  value NUMERIC (20,17) NOT NULL,
  date timestamp NOT NULL
);

CREATE TABLE humidity (
  id SERIAL PRIMARY KEY,
  value NUMERIC (20,17) NOT NULL,
  date timestamp NOT NULL
);

CREATE TABLE rainfall (
  id SERIAL PRIMARY KEY,
  value NUMERIC (20,17) NOT NULL,
  date timestamp NOT NULL
);

CREATE TABLE temperature (
  id SERIAL PRIMARY KEY,
  value NUMERIC (20,17) NOT NULL,
  date timestamp NOT NULL
);

CREATE TABLE soil_temperature (
  id SERIAL PRIMARY KEY,
  value NUMERIC (20,17) NOT NULL,
  date timestamp NOT NULL
);

CREATE TABLE wind_direction (
  id SERIAL PRIMARY KEY,
  value VARCHAR (10) NOT NULL,
  date timestamp NOT NULL
);

CREATE TABLE wind_gust (
  id SERIAL PRIMARY KEY,
  value NUMERIC (20,17) NOT NULL,
  date timestamp NOT NULL
);

CREATE TABLE wind_speed (
  id SERIAL PRIMARY KEY,
  value NUMERIC (20,17) NOT NULL,
  date timestamp NOT NULL
);