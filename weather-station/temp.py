#!/usr/bin/env python3

import bme280
import smbus2

# RaspberryPi Logic
port = 1
address = 0x76 # Adafruit BME280 address. Other BME280s may be different
bus = smbus2.SMBus(port)
bme280.load_calibration_params(bus,address)

def read_all():
  bme280_data = bme280.sample(bus,address)

  print(bme280_data)

  humidity  = bme280_data.humidity
  pressure  = bme280_data.pressure * 0.029530
  celsius_temperature = bme280_data.temperature
  fahrenheit_temp = ((celsius_temperature * 1.8000) + 32.00)
  
  # Print for debug
  degree = u"\u00b0"
  # print( str(round(fahrenheit_temp)) + degree + "F" )
  # print( str(round(humidity)) + "% humidity" )
  # print( str(round(pressure, 2)) + " in" )
  
  return fahrenheit_temp, humidity, pressure

read_all()
