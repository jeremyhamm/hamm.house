<template>
  <div class="nav p3 justify-content-center footer py-3">
    <div class="text-center text-muted d-flex align-items-center">{{ date }} {{ time }}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      date: null,
      time: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.date = dayjs().format('MM/DD/YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
</style>
