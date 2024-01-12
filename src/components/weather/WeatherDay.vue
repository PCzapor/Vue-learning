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
<template>
  <div class="flex2 justify-start">{{ formattedDate }}</div>
  <div class="flex1">
    <fa icon="fa-solid fa-droplet" class="humidity"></fa> {{ Math.round(humidity) }}%
  </div>
  <img
    v-if="iconUrl"
    class="flex1 weather-icon"
    :src="iconUrl"
    alt="Weather Icon"
    style="width: 30px; height: 30px"
  />
  <div class="flex1">{{ props.temp_min }}</div>
  <div class="flex3 align-middle">
    <WeatherGraph :temp="temp" :temp_min="props.temp_min" :temp_max="temp_max" />
  </div>
  <div class="flex1">{{ temp_max }}</div>
</template>
<style>
.weather-icon {
  width: 30px;
  height: 30px;
}
.flex1 {
  flex: 1;
}
.flex2 {
  flex: 2.5;
}
.flex3 {
  flex: 3;
}
.justify-start {
  text-align: left;
}

.weather-date,
.weather-humidity,
.weather-temperature {
  display: flex;
  align-items: center;
}

.humidity {
  color: #007bff;
}
</style>
