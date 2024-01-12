<template>
  <div class="wrapper">
    <div class="navigationLeft" v-if="canNavigateLeft" @click="navigateLeft">&lt;</div>

    <div
      v-for="city in displayedArray"
      :class="city.active === 'active' ? 'card active' : 'card'"
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
      />
      <button class="removeButton" @click.stop="weatherStore.removeCityData(city)">X</button>
    </div>
    <div class="navigationRight" v-if="canNavigateRight" @click="navigateRight">&gt;</div>
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
.wrapper {
  display: flex;
  height: 250px;
  width: 100%;
  position: relative;
  align-items: center;
  margin-top: 1rem;
}
.card {
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
.active {
  background-color: rgb(123, 111, 232);
}
.navigationLeft {
  position: absolute;
  width: 25px;
  height: 25px;
  font-size: 2rem;
  left: -4%;
  top: 40%;
  color: red;
}
.navigationRight {
  position: absolute;
  width: 25px;
  height: 25px;
  font-size: 2rem;
  right: -4%;
  top: 40%;
  color: red;
}
img {
  height: 64px;
  width: 64px;
}
.removeButton {
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
