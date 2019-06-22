export default {

  /**
   * Get weather icon for day
   *
   * @param {Int} weather icon code
   * @return {String} weather icon name
   */
  dayIcons (code) {
    switch (true) {
      case (code >= 200 && code <= 232):
        return 'thunder';
      case (code >= 300 && code <= 321):
        return 'drizzle';
      case (code === 500 || code === 501):
        return 'rain';
      case (code >= 502 && code <= 504):
        return 'heavy-rain';
      case (code === 511):
        return 'freezing-rain';
      case (code >= 520 && code <= 531):
        return 'showers';
      case (code >= 600 && code <= 622):
        return 'heavy-snow';
      case (code === 801 || code === 802):
        return 'partly-cloudy';
      case (code === 803):
        return 'mostly-cloudy';
      case (code === 804):
        return 'cloudy';
      default:
        return 'day';
    }
  },

  /**
   * Get weather icon for night
   *
   * @param {Int} weather icon code
   * @return {String} weather icon name
   */
  nightIcons (code) {
    switch (true) {
      case (code >= 200 && code <= 232):
        return 'thunder';
      case (code >= 300 && code <= 321):
        return 'drizzle';
      case (code === 500 || code === 501):
        return 'rain';
      case (code >= 502 && code <= 504):
        return 'heavy-rain';
      case (code === 511):
        return 'freezing-rain';
      case (code >= 520 && code <= 531):
        return 'showers';
      case (code >= 600 && code <= 622):
        return 'heavy-snow';
      case (code === 801 || code === 802):
        return 'partly-cloudy-n';
      case (code === 803):
        return 'mostly-cloudy-n';
      case (code === 804):
        return 'cloudy';
      default:
        return 'night';
    }
  },

  /**
   * Get wind speed icon
   *
   * @param {Int} wind speed
   */
  windSpeedIcons (speed) {
    speed = parseFloat(speed)
    switch (true) {
      case speed < 2:
        return 'wi-wind-beaufort-0';
      case speed > 1 && speed < 5:
        return 'wi-wind-beaufort-1';
      case speed > 3 && speed < 8:
        return 'wi-wind-beaufort-2';
      case speed > 7 && speed < 13:
        return 'wi-wind-beaufort-3';
      case speed > 12 && speed < 19:
        return 'wi-wind-beaufort-4';
      case speed > 18 && speed < 25:
        return 'wi-wind-beaufort-5';
      case speed > 24 && speed < 32:
        return 'wi-wind-beaufort-6';
      case speed > 31 && speed < 39:
        return 'wi-wind-beaufort-7';
      case speed > 38 && speed < 47:
        return 'wi-wind-beaufort-8';
      case speed > 46 && speed < 55:
        return 'wi-wind-beaufort-9';
      case speed > 54 && speed < 64:
        return 'wi-wind-beaufort-10';
      case speed > 63 && speed < 73:
        return 'wi-wind-beaufort-11';
      case speed > 73:
        return 'wi-wind-beaufort-12';
    }
  },

  /**
   * Get icon for direction wind is coming from
   *
   * @param {String} direction wind is coming from
   */
  windDirectionIcons (direction) {
    switch (direction) {
      case 'N':
        return 'wi-from-n';
      case 'NNE':
        return 'wi-from-nne';
      case 'NE':
        return 'wi-from-ne';
      case 'ENE':
        return 'wi-from-ene';
      case 'E':
        return 'wi-from-e';
      case 'ESE':
        return 'wi-from-ese';
      case 'SE':
        return 'wi-from-se';
      case 'SSE':
        return 'wi-from-sse';
      case 'S':
        return 'wi-from-s';
      case 'SSW':
        return 'wi-from-ssw';
      case 'SW':
        return 'wi-from-sw';
      case 'WSW':
        return 'wi-from-wsw';
      case 'WNW':
        return 'wi-from-wnw';
      case 'NW':
        return 'wi-from-nw';
      case 'NNW':
        return 'wi-from-nnw';
    }
  }
}
