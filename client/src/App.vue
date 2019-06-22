<template>
  <div class="container">
    <div class="card-columns mt-4" v-if="currentWeather.reportDate">

      <!-- Primary Card -->
      <div class="card">
        <div class="card-body row">
          <!-- Icon -->
          <div class="col-6 text-center" v-if="icon">
            <img height="100" width="100" :src="'/static/weather-icons/' + icon.icon + '.svg'" />
          </div>
          <!-- Description -->
          <div class="col-6 justify-content-center pt-3" v-if="icon">
            <h2 :style="'color: ' + formatTemperatureColor(currentWeather.temperature)"> {{ currentWeather.temperature }}&#176; F</h2>
            <p class="text-muted">{{ icon.description }}</p>
          </div>
        </div>
        <!-- Chart -->
        <p class="text-center small">
          <a class="text-muted" v-b-toggle.temperature href="javascript:void(0)">
            Chart
            <span class="pl-1"><font-awesome-icon icon='angle-double-down' /></span>
          </a>
        </p>
        <b-collapse id="temperature">
          <chart-template :data="setData('temperature')"></chart-template>
        </b-collapse>
        <!-- Updated date -->
        <div class="card-footer">
          <small class="text-muted">Last Updated {{ currentWeather.reportDate }}</small>
        </div>
      </div>

      <!-- Soil Temperature -->
      <div class="card">
        <!-- Data -->
        <div class="card-body row">
          <div class="col-6 d-flex align-items-center">
            <p class="text-muted">Soil Temperature</p>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-center">
            <h3 :style="'color: ' + formatTemperatureColor(currentWeather.soil_temperature)">{{ currentWeather.soil_temperature }}&#176; F</h3>
          </div>
        </div>
        <!-- Chart -->
        <p class="text-center small">
          <a class="text-muted" v-b-toggle.soil-temperature href="javascript:void(0)">
            Chart
            <span class="pl-1"><font-awesome-icon icon='angle-double-down' /></span>
          </a>
        </p>
        <b-collapse id="soil-temperature">
          <chart-template :data="setData('soil_temperature')"></chart-template>
        </b-collapse>
        <!-- Updated date -->
        <div class="card-footer">
          <small class="text-muted">Last Updated {{ currentWeather.reportDate }}</small>
        </div>
      </div>

      <!-- Humidity -->
      <div class="card">
        <!-- Data -->
        <div class="card-body row">
          <div class="col-6 d-flex align-items-center">
            <p class="text-muted">Humidity</p>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-center">
            <h3>{{ currentWeather.humidity }}%</h3>
          </div>
        </div>
        <!-- Chart -->
        <p class="text-center small">
          <a class="text-muted" v-b-toggle.humidity href="javascript:void(0)">
            Chart
            <span class="pl-1"><font-awesome-icon icon='angle-double-down' /></span>
          </a>
        </p>
        <b-collapse id="humidity">
          <chart-template :data="setData('humidity')"></chart-template>
        </b-collapse>
        <!-- Updated date -->
        <div class="card-footer">
          <small class="text-muted">Last Updated {{ currentWeather.reportDate }}</small>
        </div>
      </div>

      <!-- Atmospheric Pressure -->
      <div class="card">
        <!-- Data -->
        <div class="card-body row">
          <div class="col-6 d-flex align-items-center">
            <p class="text-muted">Atmospheric Pressure</p>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-center">
            <h3>{{ currentWeather.atmospheric_pressure }} in</h3>
          </div>
        </div>
        <!-- Chart -->
        <p class="text-center small">
          <a class="text-muted" v-b-toggle.atmospheric-pressure href="javascript:void(0)">
            Chart
            <span class="pl-1"><font-awesome-icon icon='angle-double-down' /></span>
          </a>
        </p>
        <b-collapse id="atmospheric-pressure">
          <chart-template :data="setData('atmospheric_pressure')"></chart-template>
        </b-collapse>
        <!-- Updated date -->
        <div class="card-footer">
          <small class="text-muted">Last Updated {{ currentWeather.reportDate }}</small>
        </div>
      </div>

      <!-- Wind Speed -->
      <div class="card">
        <div class="card-body row">
          <div class="col-6 d-flex align-items-center">
            <p class="text-muted">Average Wind Speed</p>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-center">
            <h3>{{ currentWeather.wind_speed }} mph</h3>
          </div>
        </div>
        <!-- Chart -->
        <p class="text-center small">
          <a class="text-muted" v-b-toggle.wind-speed href="javascript:void(0)">
            Chart
            <span class="pl-1"><font-awesome-icon icon='angle-double-down' /></span>
          </a>
        </p>
        <b-collapse id="wind-speed">
          <chart-template :data="setData('wind_speed')"></chart-template>
        </b-collapse>
        <!-- Updated date -->
        <div class="card-footer">
          <small class="text-muted">Last Updated {{ currentWeather.reportDate }}</small>
        </div>
      </div>

      <!-- Wind Gust -->
      <div class="card">
        <div class="card-body row">
          <div class="col-6 d-flex align-items-center">
            <p class="text-muted">Wind Gust</p>
          </div>
          <div class="col-6 d-flex align-items-bottom justify-content-center">
            <h3>{{ currentWeather.wind_gust }} mph <font-awesome-icon v-if="currentWeather.wind_gust > 5" icon='wind' /></h3>
          </div>
        </div>
        <!-- Chart -->
        <p class="text-center small">
          <a class="text-muted" v-b-toggle.wind-gust href="javascript:void(0)">
            Data
            <span class="pl-1"><font-awesome-icon icon='angle-double-down' /></span>
          </a>
        </p>
        <b-collapse class="card-body" id="wind-gust">
          <div class="row">
            <div class="col-12">
              <p class="text-center small text-muted">Top wind gust between:</p>
            </div>
          </div>
          <div class="row input-group mt-1">
            <div class="col-12 col-sm-5">
              <datepicker
                :bootstrap-styling="true"
                :clear-button="true"
                :disabledDates="disabledDate"
                v-model="dates.start"
                placeholder="Start Date"
                format="M/d/yyyy">
              </datepicker>
            </div>
            <div class="col-12 col-sm-5">
              <datepicker
                :bootstrap-styling="true"
                :clear-button="true"
                v-model="dates.end"
                placeholder="End Date"
                format="M/d/yyyy">
              </datepicker>
            </div>
            <div class="col-12 col-sm-2">
              <button type="button" class="btn btn-primary" @click="topWindGust()" :disabled="!dates.start && !dates.end">
                <font-awesome-icon icon='arrow-right' />
              </button>
            </div>
          </div>
          <div class="row mt-5" v-if="topGust">
            <div class="col-12">
              <h3 class="text-center">{{ parseFloat(topGust.value).toFixed(1) }} mph</h3>
              <p class="text-center text-muted">{{ topGust.date}}</p>
            </div>
          </div>
        </b-collapse>
        <!-- Updated date -->
        <div class="card-footer">
          <small class="text-muted">Last Updated {{ currentWeather.reportDate }}</small>
        </div>
      </div>

      <!-- Wind Direction-->
      <div class="card">
        <div class="card-body row">
          <div class="col-6 d-flex align-items-cente">
            <p class="text-muted">Wind Direction</p>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-center">
            <h3>{{ currentWeather.wind_direction }} <i :class="'icon wi wi-wind ' + windDirection(currentWeather.wind_direction)"></i></h3>
          </div>
        </div>
      </div>

      <!-- Rainfall -->
      <div class="card">
        <!-- Data -->
        <div class="card-body row">
          <div class="col-6 d-flex align-items-center">
            <p class="text-muted">Rainfall <br> <small>Since {{ currentWeather.rainfallDate }}</small></p>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-center">
            <h3>{{ currentWeather.rainfall }} in</h3>
          </div>
        </div>
        <!-- Chart -->
        <div>
          <p class="text-center small">
            <a class="text-muted" v-b-toggle.rainfall href="javascript:void(0)">
              Chart
              <span class="pl-1"><font-awesome-icon icon='angle-double-down' /></span>
            </a>
          </p>
          <b-collapse id="rainfall">
            <chart-template :data="setData('rainfall')"></chart-template>
          </b-collapse>
        </div>
        <!-- Updated date -->
        <div class="card-footer">
          <small class="text-muted">Last Updated {{ currentWeather.reportDate }}</small>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import '@/assets/scss/app.scss';
import dayjs from 'dayjs';
import icons from './services/icon.service';
import utils from './services/utils.service';
import WeatherIcons from 'weather-icons2/css/weather-icons.css';
import WindDirectionIcons from 'weather-icons2/css/weather-icons-wind.css';
import ChartTemplate from './components/ChartTemplate';
import Datepicker from 'vuejs-datepicker';
import { BCollapse } from 'bootstrap-vue';

export default {
  props: ['data'],
  components: {
    'chart-template': ChartTemplate,
    'datepicker': Datepicker,
    'b-collapse': BCollapse
  },
  data () {
    return {
      dates: {
        start: null,
        end: null
      }
    }
  },
  created () {
    this.init();
  },
  computed: {
    disabledDate () {
      return this.$store.getters['weather/getDisabledDate'];
    },
    currentWeather () {
      return this.$store.getters['weather/getCurrentWeather'];
    },
    icon () {
      return this.$store.getters['weather/getWeatherIcon'];
    },
    topGust () {
      return this.$store.getters['weather/getTopGust'];
    }
  },
  methods: {
    init () {
      this.$store.dispatch('weather/getCurrentWeather');
      this.$store.dispatch('weather/getWeatherIcon');
    },
    windSpeed (value) {
      return icons.windSpeedIcons(value);
    },
    windDirection (value) {
      return icons.windDirectionIcons(value);
    },
    formatTemperatureColor (temp) {
      return utils.temperatureColor(temp);
    },
    setData (property) {
      switch (property) {
        case 'temperature':
          return this.dataProperties('line', property, ' °F', '/temperature/');
        case 'humidity':
          return this.dataProperties('line', property, '%', '/humidity/');
        case 'atmospheric_pressure':
          return this.dataProperties('line', property, ' in', '/pressure/');
        case 'soil_temperature':
          return this.dataProperties('line', property, ' °F', '/soil-temperature/');
        case 'rainfall':
          return this.dataProperties('bar', property, ' in', '/rainfall/');
        case 'wind_speed':
          return this.dataProperties('bar', property, ' mph', '/wind-speed/');
      }
    },
    dataProperties (type, property, icon, api) {
      return {
        type: type,
        property: property,
        icon: icon,
        api: api
      }
    },
    topWindGust () {
      if (this.dates.start && this.dates.end) {
        let unixDates = utils.unixFormatDates(this.dates.start, this.dates.end);
        this.$store.dispatch('weather/getTopWindGust', unixDates)
          .then(
            response => {
              this.topGust.date = dayjs().local(this.topGust.date).format('M/D/YY h:m a')
            }
          )
      }
    }
  }
}
</script>
