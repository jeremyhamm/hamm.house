<template>
  <div class="card-body">
    <!-- Dates -->
    <div class="row">
      <div class="col-6">
        <datepicker
          :bootstrap-styling="true"
          :clear-button="true"
          :disabledDates="disabledDate"
          v-model="dates.start"
          placeholder="Start Date"
          format="M/d/yyyy">
        </datepicker>
      </div>
      <div class="col-6">
        <datepicker
          :bootstrap-styling="true"
          :clear-button="true"
          v-model="dates.end"
          placeholder="End Date"
          format="M/d/yyyy">
        </datepicker>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <date-preselect :dateFilters="['30 days', 'This Month', 'YTD']" @preset="updateDateFilter"></date-preselect>
      </div>
    </div>
    <div class="row mt-4 justify-content-center">
      <div class="col-12 btn-group" role="group">
        <button type="button" class="btn btn-primary" :disabled="(!dates.start || !dates.end) && !dates.preselect" @click="initChartData()">Update</button>
        <button type="button" class="btn btn-outline-primary" :disabled="!loaded" @click="loaded = false">Clear</button>
      </div>
    </div>
    <div class="row mt-3" v-if="loaded">
      <!-- Chart -->
      <div class="col-12" v-if="chartData.datasets[0].data.length > 0">
        <chart :chartData="chartData" :chartOptions="chartOptions"></chart>
      </div>
      <!-- No data -->
      <div class="col-12 mt-4" v-else>
        <p class="text-center">No Data for this time period</p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Datepicker from 'vuejs-datepicker';
import DatePreselect from './DatePreselect';
import Chart from '../services/chart.service';
import utils from '../services/utils.service';

export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  components: {
    'datepicker': Datepicker,
    'date-preselect': DatePreselect,
    'chart': Chart
  },
  data () {
    return {
      type: this.data.type,
      dates: {
        start: dayjs().subtract(30, 'day').format('M/D/YYYY'),
        end: dayjs().add(1, 'day').format('M/D/YYYY'),
        preselect: true
      },
      chartOptions: {
        legend: {
          display: false
        },
        hover: {
          mode: 'index'
        },
        scales: {
          yAxes: [{
            ticks: {
              callback: (value, index, values) => {
                return value + this.data.icon;
              },
              beginAtZero: true
            }
          }]
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            label: (tooltipItem, data) => {
              return parseFloat(tooltipItem.value).toFixed(2) + this.data.icon;
            }
          }
        },
        defaults: {
          global: {
            elements: {
              points: {
                hitRadius: 15
              }
            }
          }
        }
      },
      chartData: null,
      loaded: false
    }
  },
  computed: {
    disabledDate () {
      return this.$store.getters['weather/getDisabledDate']
    }
  },
  methods: {
    initChartData () {
      let unixDates = utils.unixFormatDates(this.dates.start, this.dates.end);
      this.loadData(unixDates);
    },
    loadData (dates) {
      const data = {
        'property': this.data.api,
        'dates': {
          'start': dates.start,
          'end': dates.end
        }
      }
      this.$store.dispatch('weather/getChartData', data)
        .then(
          response => {
            const sortData = utils.sortData(response.data, this.data.property);
            const isAllZero = sortData.apiData.reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue)) === 0;
            
            console.log(isAllZero);
            
            this.chartOptions.scales.yAxes[0].ticks.beginAtZero = isAllZero;
            this.chartData = this.setChartData(sortData);
            this.loaded = true;
          }
        )
    },
    updateDateFilter (value) {
      switch (value) {
        case '30 days':
          this.dates.start = dayjs().subtract(30, 'day').format('M/D/YYYY');
          this.dates.end = dayjs().format('M/D/YYYY');
          break;
        case 'This Month':
          this.dates.start = dayjs().startOf('month');
          this.dates.end = dayjs().format('M/D/YYYY');
          break;
        case 'YTD':
          this.dates.start = dayjs().startOf('year');
          this.dates.end = dayjs().format('M/D/YYYY');
          break;
      }
    },
    setChartData (data) {
      return {
        labels: data.range,
        datasets: [{
          'borderColor': this.formatLineColor(data.apiData),
          'backgroundColor': this.formatLineColor(data.apiData),
          'borderWidth': 4,
          'fill': false,
          'data': data.apiData
        }]
      }
    },
    formatLineColor (data) {
      let colorList = [];
      for (let i = 0; i < data.length; i++) {
        let color = utils.temperatureColor(data[i]);
        colorList.push(color);
      }
      return colorList;
    }
  }
}
</script>
