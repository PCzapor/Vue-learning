<template>
  <div v-if="activeCity" class="weather-info">
    <div class="weather-info__icon-container">
      <div v-if="iconCode">
        <img :src="iconApiKey(iconCode)" alt="Weather Icon" class="weather-info__icon" />
      </div>
      <div class="weather-info__date-container">
        <h5>{{ moment(activeCity.list[0].dt * 1000).format('[Today is] dddd') }}</h5>
        <div>{{ moment(activeCity.list[0].dt).format('MMM Do') }}</div>
      </div>
    </div>
    <div class="weather-info__temperature">
      {{ activeCity.list[0].main.temp }}
      <div class="weather-info__temperature-unit">°C</div>
    </div>
    <div class="weather-info__location">
      {{ activeCity.city.name }}, {{ activeCity.city.country }}
    </div>
    <div class="weather-info__additional">
      Feels like {{ activeCity.list[0].main.feels_like }}°C, sunset
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
.weather-info {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
}

.weather-info__icon-container {
  display: flex;
  justify-content: center;
}

.weather-info__icon {
  width: 48px;
  height: 48px;
}

.weather-info__date-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-info__temperature {
  width: 100%;
  align-items: center;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  justify-content: center;
  display: flex;
}

.weather-info__temperature-unit {
  font-size: 1.5rem;
  height: 100%;
  align-self: flex-start;
}

.weather-info__location,
.weather-info__additional {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}
</style>
