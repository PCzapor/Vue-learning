<template>
  <div class="a">
    <p class="title">The Weather<strong>App</strong></p>
    <SearchBarVue />
  </div>
  <div class="c">
    <CardCarouselVue />
    <FiveDayWeatherChartVue />
  </div>
</template>

<script setup lang="ts">
import CardCarouselVue from './weather/CardCarousel.vue'
import FiveDayWeatherChartVue from '@/components/weather/FiveDayWeatherChart.vue'
import SearchBarVue from '@/components/UI/SearchBar.vue'
</script>

<style scoped>
.title {
  font-size: 2rem;
  text-align: left;
}
</style>
