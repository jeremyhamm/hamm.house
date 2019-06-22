from gpiozero import Button
import time
import math
import statistics
import bme280_sensor
import wind_direction_byo
import ground_temp
import db_update

# Variables
radius_in = 3.54331
adjustment_factor = 1.18
sec_per_hour = 3600
in_per_mi = 63360
wind_count = 0
store_speeds = []
wind_interval = 100 #5
interval = 300 #10
store_directions = []
bucket_size = 0.2794 #mm
rain_count = 0

# Wind Speed & Direction
def spin ():
  global wind_count
  wind_count += 1

def calculate_speed (time_sec):
  global wind_count
  circumference_in = (2 * math.pi) * radius_in

  # Mile per hour conversion
  dist_mi = (circumference_in * wind_count) / in_per_mi
  mps = dist_mi / time_sec
  mph = (mps * sec_per_hour) * adjustment_factor
  
  return mph

# Rainfall
def bucket_tipped():
  global rain_count
  rain_count +=1

# Reset functions
def reset_wind():
  global wind_count
  wind_count = 0

def reset_gust():
  global gust
  gust = 0

def reset_rainfall():
  global rain_count
  rain_count = 0

wind_speed_sensor = Button(5)
wind_speed_sensor.when_pressed = spin
rain_sensor = Button(6)
rain_sensor.when_pressed = bucket_tipped

# Ground temp
temp_probe = ground_temp.DS18B20()

while True:
  start_time = time.time()
  while time.time() - start_time <= interval:
    wind_start_time = time.time()
    final_speed = calculate_speed(wind_interval)
    store_speeds.append(final_speed)
    while time.time() - wind_start_time <= wind_interval:
      store_directions.append(wind_direction_byo.get_value())

  # Humidity, pressure, temperature
  ambient_temp, humidity, pressure = bme280_sensor.read_all()

  # Soil temp
  soil_temp = temp_probe.read_temp()
  
  # Wind speed and gust
  wind_gust = max(store_speeds)
  wind_speed = statistics.mean(store_speeds)
  reset_wind()
  store_speeds = []
  
  # Wind direction
  wind_average_degrees = wind_direction_byo.get_average(store_directions)
  wind_average_direction = wind_direction_byo.deg_to_compass(wind_average_degrees)
  store_directions = []
  
  # Rainfall
  rainfall_in = (rain_count * bucket_size) * 0.0393701
  reset_rainfall()

  # print(ambient_temp, soil_temp, humidity, pressure, wind_speed, wind_gust, wind_average_direction, rainfall_in)

  # Save data to DB
  data_package = {
    'temperature': ambient_temp, 
    'soil_temperature': soil_temp,
    'humidity': humidity, 
    'atmospheric_pressure': pressure, 
    'wind_speed': wind_speed, 
    'wind_gust': wind_gust,
    'wind_direction': wind_average_direction, 
    'rainfall': rainfall_in
  }
  db_update.insert_data(data_package)