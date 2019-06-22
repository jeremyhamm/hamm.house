# raindrop sensor DO connected to GPIO18
# HIGH = no rain, LOW = rain detected
# Buzzer on GPIO13
from time import sleep
from gpiozero import InputDevice
 
rain = InputDevice(18)

while True:
  if not rain.is_active:
    print("It's raining - get the washing in!")
  sleep(1)