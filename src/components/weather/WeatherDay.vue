<template>
  <div class="weather-details__date">{{ formattedDate }}</div>
  <div class="weather-details__humidity">
    <fa icon="fa-solid fa-droplet" class="weather-details__humidity-icon"></fa>
    {{ Math.round(humidity) }}%
  </div>
  <img v-if="iconUrl" class="weather-details__icon" :src="iconUrl" alt="Weather Icon" />
  <div class="weather-details__temp-min">{{ props.temp_min }}</div>
  <div class="weather-details__graph">
    <WeatherGraph :temp="temp" :temp_min="props.temp_min" :temp_max="temp_max" />
  </div>
  <div class="weather-details__temp-max">{{ temp_max }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'
import WeatherGraph from './WeatherGraph.vue'
import { iconApiKey } from './../constants/ApiKey'

const props = defineProps({
  iconCode: { type: String, default: '' },
  humidity: { type: Number, default: 0 },
  temp_max: { type: Number, default: 0 },
  temp_min: { type: Number, default: 0 },
  temp: { type: Number, default: 0 },
  date: { type: String, default: '' }
})

const iconUrl = computed(() => iconApiKey(props.iconCode))
const formattedDate = computed(() => moment(props.date).format('Do dddd'))
</script>

<style>
.weather-details__icon {
  width: 30px;
  height: 30px;
}

.weather-details__date,
.weather-details__humidity,
.weather-details__temp-min,
.weather-details__temp-max {
  flex: 1;
  text-align: left;
  display: flex;
  align-items: center;
}

.weather-details__humidity-icon {
  color: #007bff;
}

.weather-details__graph {
  flex: 3;
}

.weather-details__date {
  flex: 2.5;
}
</style>
