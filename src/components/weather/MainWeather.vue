<template>
  <div v-if="activeCity" class="container-flex-center">
    <div class="centered-flex">
      <div v-if="iconCode">
        <img
          :src="iconApiKey(iconCode)"
          alt="Weather Icon"
          :style="{ width: '48px', height: '48px' }"
        />
      </div>
      <div class="centered-flex-column">
        <h5>{{ moment(activeCity.list[0].dt * 1000).format('[Today is] dddd') }}</h5>

        <div>{{ moment(activeCity.list[0].dt).format('MMM Do') }}</div>
      </div>
    </div>
    <div class="weather-display">
      {{ activeCity.list[0].main.temp }}
      <div class="temperature-display">°C</div>
    </div>
    <div class="location-display">{{ activeCity.city.name }}, {{ activeCity.city.country }}</div>
    <div class="location-display">
      Feels like {{ activeCity.list[0].main.feels_like }}°C, sunset{{ ' ' }}
      {{ moment(activeCity.city.sunset * 1000).format('h:mm A') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '@/stores/useWeatherStore'
import { ref, watch } from 'vue'
import { iconApiKey } from '../constants/ApiKey'
import moment from 'moment'

const weatherStore = useWeatherStore()
const activeCity = ref()
let iconCode: string
watch(weatherStore.sevenDayForecastData, (newData) => {
  if (newData) {
    activeCity.value = weatherStore.sevenDayForecastData.find((city) => city.active === 'active')
    iconCode = activeCity.value.list[0].weather[0].icon
  }
})
</script>

<style scoped>
.container-flex-center {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
}
.centered-flex {
  display: flex;
  justify-content: center;
}
.centered-flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.weather-display {
  width: 100%;
  align-items: center;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  justify-content: center;
  display: flex;
}
.temperature-display {
  font-size: 1.5rem;
  height: 100%;
  align-self: flex-start;
}
.location-display {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}
</style>
