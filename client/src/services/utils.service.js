import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import styles from '@/assets/scss/variables.scss';
import _ from 'lodash';
export default {

  /**
   * Sort and return api weather data
   *
   * @param {Object} api data
   */
  sortData (data, property) {
    dayjs.extend(utc);
    const orderedData = _.orderBy(data[property.toLowerCase()], ['date'], ['asc']);
    let apiData = [];
    let range = [];
    for (let i = 0; i < orderedData.length; i++) {
      apiData.push(orderedData[i].value);
      range.push(dayjs(orderedData[i].date).format('M/D/YY hh:mm a'));
    }
    return { 'apiData': apiData, 'range': range };
  },

  /**
   * Format start and end dates for chart
   *
   * @param {Int} start date
   * @param {Int} end date
   */
  unixFormatDates (start, end) {
    start = dayjs(start).unix();
    end = dayjs(end).unix();
    return { 'start': start, 'end': end };
  },

  /**
   * Format key name
   *
   * @param {String} key
   */
  formatKey (key) {
    return _.replace(_.upperFirst(key), '_', ' ');
  },

  /**
   * Format string with title case
   *
   * @param {String} string to format
   */
  titleCase (string) {
    return _.startCase(_.toLower(string));
  },

  /**
   * Format temperature color
   *
   * @param {Int} temperature
   */
  temperatureColor (temp) {
    switch (true) {
      // Less than 32
      case (temp <= 32):
        return styles['blues-dark'];
      // Between 32 & 39
      case (temp > 32 && temp < 40):
        return styles['blues-standard'];
      // Between 40 & 44
      case (temp >= 40 && temp < 45):
        return styles['blues-light'];
      // Between 45 & 49
      case (temp >= 45 && temp < 50):
        return styles['greens-dark'];
      // Between 50 & 54
      case (temp >= 50 && temp < 55):
        return styles['greens-dark'];
      // Between 55 & 59
      case (temp >= 55 && temp < 60):
        return styles['greens-dark'];
      // Between 60 & 64
      case (temp >= 60 && temp < 65):
        return styles['greens-standard'];
      // Between 65 & 69
      case (temp >= 65 && temp < 70):
        return styles['greens-light'];
      // Between 70 & 74
      case (temp >= 70 && temp < 75):
        return styles['yellows-dark'];
      // Between 75 & 79
      case (temp >= 75 && temp < 80):
        return styles['yellows-standard'];
      // Between 80 & 84
      case (temp >= 80 && temp < 85):
        return styles['yellows-light'];
      // Between 85 & 89
      case (temp >= 85 && temp < 90):
        return styles['oranges-dark'];
      // Between 90 & 94
      case (temp >= 90 && temp < 95):
        return styles['oranges-standard'];
      // Between 95 & 99
      case (temp >= 95 && temp < 100):
        return styles['oranges-light'];
      // Between 100 & 105
      case (temp >= 100 && temp < 105):
        return styles['reds-dark'];
      // Between 105 & 109
      case (temp >= 105 && temp < 110):
        return styles['reds-standard'];
      // Between 105 & 109
      case (temp >= 110):
        return styles['reds-dark'];
      // Catch all
      default:
        return styles['greens-light'];
    }
  },

  /**
   * Calculate total rainfall from reported data
   *
   * @param {Int} amount
   */
  calculateRainfall (amount) {
    let total = 0;
    amount.forEach(function (element) {
      total += parseFloat(element.value);
    });
    return total.toFixed(2);
  }
}
