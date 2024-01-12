<template>
  <div class="weather-carousel">
    <div
      class="weather-carousel__navigation weather-carousel__navigation--left"
      v-if="canNavigateLeft"
      @click="navigateLeft"
    >
      &lt;
    </div>

    <div
      v-for="city in displayedArray"
      :class="city.active === 'active' ? 'weather-card weather-card--active' : 'weather-card'"
      :key="city.city.name"
      @click="weatherStore.setActive(city)"
    >
      <p>
        <b>{{ city.city.name }}</b>
      </p>
      <p>
        {{ city.city.country }} <br />
        {{ city.list[0].weather[0].description }}
      </p>
      <img
        v-if="city.list[0].weather[0].icon"
        :src="`https://openweathermap.org/img/wn/${city.list[0].weather[0].icon}.png`"
        :alt="`${city.city.name} icon `"
        class="weather-card__icon"
      />
      <button class="weather-card__remove-btn" @click.stop="weatherStore.removeCityData(city)">
        X
      </button>
    </div>

    <div
      class="weather-carousel__navigation weather-carousel__navigation--right"
      v-if="canNavigateRight"
      @click="navigateRight"
    >
      &gt;
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '@/stores/useWeatherStore'
import { computed, ref, watch } from 'vue'

const weatherStore = useWeatherStore()
const sevenDayData = ref(weatherStore.sevenDayForecastData)

const showRange = 4
const currentShowStart = ref(0)
watch(sevenDayData, () => {
  currentShowStart.value = 0
})
const morphedArr = computed(() => {
  return sevenDayData.value.slice(currentShowStart.value, currentShowStart.value + showRange)
})
const canNavigateLeft = computed(() => currentShowStart.value > 0)
const canNavigateRight = computed(
  () => currentShowStart.value + showRange < sevenDayData.value.length
)
const navigateLeft = () => {
  if (currentShowStart.value > 0) currentShowStart.value -= 1
}
const navigateRight = () => {
  if (currentShowStart.value + showRange < sevenDayData.value.length) currentShowStart.value++
}

const displayedArray = computed(() => {
  return sevenDayData.value.length > 3 ? morphedArr.value : sevenDayData.value
})
</script>

<style scoped>
.weather-carousel {
  display: flex;
  height: 250px;
  width: 100%;
  position: relative;
  align-items: center;
  margin-top: 1rem;
}

.weather-card {
  position: relative;
  height: 250px;
  width: 140px;
  border: 1px solid red;
  margin: 0.3rem;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 15%;
  cursor: pointer;
}

.weather-card--active {
  background-color: rgb(123, 111, 232);
}

.weather-carousel__navigation {
  position: absolute;
  width: 25px;
  height: 25px;
  font-size: 2rem;
  top: 40%;
  color: red;
}

.weather-carousel__navigation--left {
  left: -4%;
}

.weather-carousel__navigation--right {
  right: -4%;
}

.weather-card__icon {
  height: 64px;
  width: 64px;
}

.weather-card__remove-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  background: none;
  border: none;
  color: red;
  font-size: 1.3rem;
  cursor: pointer;
}
</style>
