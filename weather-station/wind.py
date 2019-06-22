import math
import time
from gpiozero import Button
import statistics

wind_count = 0
radius_in = 3.54331
wind_interval = 5
store_speeds = []

def reset_wind():
  global wind_count
  wind_count = 0

def spin ():
  global wind_count
  wind_count = wind_count + 1

def calculate_speed (time_sec):
  global wind_count
  circumference_in = (2 * math.pi) * radius_in
  rotations = wind_count / 2.0
  dist_in = circumference_in * rotations

  # Mile per hour
  adjustment_factor = 1.18
  sec_per_hour = 3600
  in_per_mi = 63360
  dist_mi = dist_in / in_per_mi
  mps = dist_mi / time_sec
  mph = (mps * sec_per_hour) * adjustment_factor
  
  return mph

wind_speed_sensor = Button(5)
wind_speed_sensor.when_pressed = spin

# Report wind speed at 5 second intervals
while True:
  start_time = time.time()
  while time.time() - start_time <= wind_interval:
    reset_wind()
    time.sleep(wind_interval)
    final_speed = calculate_speed(wind_interval)
    store_speeds.append(final_speed)

  wind_gust = max(store_speeds)
  wind_speed = statistics.mean(store_speeds)
  