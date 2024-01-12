<template>
  <div class="b">
    <UserRow />
  </div>
  <div class="d">
    <MainWeather />
  </div>
</template>

<script setup lang="ts">
import UserRow from './UI/UserRow.vue'
import MainWeather from './weather/MainWeather.vue'
</script>

<style scoped></style>
