from gpiozero import Button
import time

rain_sensor = Button(6)
bucket_size = 0.2794
count = 0

def bucket_tipped():
  global count
  count +=1
  print(count * bucket_size)

def reset_rainfall():
  global count
  count = 0

rain_sensor.when_pressed = bucket_tipped

while True:
  count = 0
  time.sleep(5)