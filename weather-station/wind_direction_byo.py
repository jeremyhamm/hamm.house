from gpiozero import MCP3008
import time
import math

adc = MCP3008(channel=0)
count = 0
values = []
volts = {
  0.4: 0.0, 
  1.4: 22.5, 
  1.2: 45.0, 
  2.8: 67.5, 
  2.8: 90,
  2.9: 112.5, 
  2.2: 135.0, 
  2.5: 157.5, 
  1.8: 180.0, 
  2.0: 202.5, 
  0.7: 225.0, 
  0.8: 247.5, 
  0.1: 270.0, 
  0.3: 292.5, 
  0.2: 315.0, 
  0.6: 337.5
}

def get_average(angles):
  
  if len(angles) == 0:
    return 0.0
  
  sin_sum = 0.0
  cos_sum = 0.0

  for angle in angles:
    r = math.radians(angle)
    sin_sum += math.sin(r)
    cos_sum += math.cos(r)

  flen = float(len(angles))
  s = sin_sum / flen
  c = cos_sum / flen
  arc = math.degrees(math.atan(s / c))
  average = 0.0

  if s > 0 and c > 0:
    average = arc
  elif c < 0:
    average = arc + 180
  elif s < 0 and c > 0:
    average = arc + 360

  return 0.0 if average == 360 else average

def deg_to_compass(num):
  val = int((num/22.5)+.5)
  arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
  return arr[(val % 16)]

def get_value(length = 5):
  data = []
  start_time = time.time()

  while time.time() - start_time <= length:
    wind = round(adc.value * 3.3, 1)
    if wind in volts:
      data.append(volts[wind])

  return get_average(data)

get_value()