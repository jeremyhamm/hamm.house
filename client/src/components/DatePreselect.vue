<template>
  <select class="custom-select" v-model="selectedDate" @change="updateDateFilter()">
    <option v-for="date in dateFilters" :key="date" :value="date">
      {{ date }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    dateFilters: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      selectedDate: this.dateFilters[0]
    }
  },
  methods: {
    updateDateFilter () {
      this.$emit('preset', this.selectedDate);
    }
  }
}
</script>
