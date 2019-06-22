import axios from 'axios'
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import iconService from '@/services/icon.service';
import utils from '@/services/utils.service';

const weather = {
  namespaced: true,
  state: {
    loaded: {
      temperature: false,
      humidity: false,
      pressure: false,
      soil_temperature: false
    },
    currentWeather: {},
    weatherIcon: null,
    gust: null,
    disabledDate: {
      to: new Date('2019-04-01')
    }
  },
  mutations: {
    setChartLoaded (state, data) {
      switch (data.property) {
        case 'Temperature':
          state.loaded.temperature = true;
          break;
        case 'Humidity':
          state.loaded.humidity = true;
          break;
        case 'Pressure':
          state.loaded.pressure = true;
          break;
        case 'Ground Temperature':
          state.loaded.soil_temperature = true;
          break;
      }
    },
    setCurrentWeather (state, data) {
      dayjs.extend(relativeTime);
      dayjs.extend(utc);
      state.currentWeather = {
        reportDate: dayjs.utc(data['atmospheric_pressure'].date).fromNow(),
        rainfallDate: dayjs().format('M/D/YY'),
        temperature: parseFloat(data['temperature'].value).toFixed(1),
        humidity: parseFloat(data['humidity'].value).toFixed(1),
        atmospheric_pressure: parseFloat(data['atmospheric_pressure'].value).toFixed(1),
        soil_temperature: parseFloat(data['soil_temperature'].value).toFixed(1),
        wind_speed: parseFloat(data['wind_speed'].value).toFixed(1),
        wind_gust: parseFloat(data['wind_gust'].value).toFixed(1),
        wind_direction: data['wind_direction'].value,
        rainfall: parseFloat(data['rainfall'].value).toFixed(1)
      }
    },
    setWeatherIcon (state, data) {
      dayjs.extend(isBetween);
      state.weatherIcon = {};
      state.weatherIcon.name = data.weather[0].main;
      state.weatherIcon.description = utils.titleCase(data.weather[0].description);
      let sunrise = dayjs.unix(data.sys.sunrise);
      let sunset = dayjs.unix(data.sys.sunset);
      let now = dayjs();
      if (now.isBetween(sunrise, sunset)) {
        state.weatherIcon.icon = iconService.dayIcons(data.weather[0].id);
      } else {
        state.weatherIcon.icon = iconService.nightIcons(data.weather[0].id);
      }
    },
    setTopGust (state, data) {
      state.gust = data;
    }
  },
  actions: {
    getCurrentWeather ({ state, commit }) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + '/current-weather')
          .then(
            response => {
              commit('setCurrentWeather', response.data);
              resolve(response);
            },
            error => {
              reject(error);
            }
          )
      })
    },
    getWeatherIcon ({ state, commit }) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_OPEN_WEATHER_MAP_URL)
          .then(
            response => {
              commit('setWeatherIcon', response.data);
              resolve(response);
            },
            error => {
              reject(error);
            }
          )
      })
    },
    getTopWindGust ({ state, commit }, dates) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + '/wind-gust/' + dates.start + '/' + dates.end)
          .then(
            response => {
              commit('setTopGust', response.data);
              resolve(response);
            },
            error => {
              reject(error);
            }
          )
      })
    },
    getChartData ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + data.property + data.dates.start + '/' + data.dates.end, { crossdomain: true })
          .then(response => {
            commit('setChartLoaded', { 'property': utils.formatKey(data.property) });
            resolve(response);
          })
      });
    }
  },
  getters: {
    getDisabledDate (state) {
      return state.disabledDate;
    },
    getTempLoaded (state) {
      return state.loaded.temperature;
    },
    gethumidityLoaded (state) {
      return state.loaded.humidity;
    },
    getPressureLoaded (state) {
      return state.loaded.pressure;
    },
    getGroundTempLoaded (state) {
      return state.loaded.pressure;
    },
    getCurrentWeather (state) {
      return state.currentWeather;
    },
    getWeatherIcon (state) {
      return state.weatherIcon;
    },
    getTopGust (state) {
      return state.gust;
    }
  }
}

export default weather
