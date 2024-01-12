<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import WeatherDay from './WeatherDay.vue'
import { useWeatherStore } from '@/stores/useWeatherStore'
import { useCity, type ListOfWeather } from '@/components/composables/fetch'

const weatherStore = useWeatherStore()
const { isLoading } = useCity()
const activeSevenDayData = ref()
const adjustedTempData = ref<Record<string, ListOfWeather[]> | undefined>()
watch(weatherStore.sevenDayForecastData, (newData) => {
  if (newData) {
    activeSevenDayData.value = weatherStore.sevenDayForecastData.find(
      (city) => city.active === 'active'
    )
    adjustedTempData.value = groupWeatherDataByDay(activeSevenDayData.value.list)
  }
})

function groupWeatherDataByDay(data: ListOfWeather[]) {
  return data.reduce<Record<string, ListOfWeather[]>>((groupedData, item) => {
    const date = item.dt_txt.split(' ')[0]
    groupedData[date] = groupedData[date] ? [...groupedData[date], item] : [item]
    return groupedData
  }, {})
}

const weatherStats = computed(() => {
  if (adjustedTempData.value) {
    return Object.entries(adjustedTempData.value).map(([date, dailyData]) => {
      const temperatures = dailyData.map((item) => item.main.temp)
      const humidityValues = dailyData.map((item) => item.main.humidity)
      const icons = dailyData.map((item) => item.weather[0].icon)
      const lowestTemp = Math.min(...temperatures)
      const avgTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length
      const highestTemp = Math.max(...temperatures)
      const avgHumidity =
        humidityValues.reduce((sum, humidity) => sum + humidity, 0) / humidityValues.length

      return {
        date,
        icon: icons[0],
        avgTemp,
        lowestTemp,
        highestTemp,
        avgHumidity
      }
    })
  }
  return []
})
</script>
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-if="!weatherStore.sevenDayForecastData.length">Please enter any city name...</div>
  <div v-if="activeSevenDayData && adjustedTempData && !isLoading" class="sevenDayDataContainer">
    <div v-for="(dayStats, idx) in weatherStats" :key="idx" class="row">
      <WeatherDay
        :date="dayStats.date"
        :temp="dayStats.avgTemp"
        :temp_min="dayStats.lowestTemp"
        :temp_max="dayStats.highestTemp"
        :humidity="dayStats.avgHumidity"
        :iconCode="dayStats.icon"
      />
    </div>
  </div>
</template>
<style scoped>
.sevenDayDataContainer {
  width: 100%;
}
.row {
  display: flex;
  width: 100%;
  gap: 10px;
  margin-bottom: 5px;
  align-items: center;
}
</style>
