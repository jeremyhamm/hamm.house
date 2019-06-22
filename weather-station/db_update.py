import psycopg2
from psycopg2 import sql
from datetime import datetime

# Connect to DB
connection = psycopg2.connect(
  database="raspberrypi",
  user="raspberrypi",
  password="ptnvwQSqSS",
  host="165.227.6.231",
  port="5432"
  #sslmode="verify-full"  {'ca': '/etc/sll/certs/hamm.house.pem'}
)

def insert_data(package):
  utc_datetime = datetime.utcnow()
  formatted_date = utc_datetime.strftime('%Y-%m-%d %H:%M:%S')
  
  # Insert into DB
  try:
    with connection.cursor() as cursor:
      for key, prop in package.items():
        cursor.execute(
          sql.SQL("INSERT INTO {} (value, date) VALUES (%s, %s)").format(sql.Identifier(key)),[prop, formatted_date]
        )
        connection.commit()
      
  finally:
    # Print for debug
    degree = u"\u00b0"
    # print( str(round(fahrenheit_temp)) + degree + "F" )
    # print( str(round(celsius_temperature)) +  degree + "C" )
    # print( str(round(humidity)) + "% humidity" )
    # print( str(round(pressure, 2)) + " in" )