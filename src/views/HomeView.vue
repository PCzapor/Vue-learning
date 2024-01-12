<script setup lang="ts">
import LeftDashboardComponentVue from '@/components/LeftDashboardComponent.vue'
import RightDashboardComponentVue from '@/components/RightDashboardComponent.vue'
</script>

<template>
  <div class="dashboard"><LeftDashboardComponentVue /> <RightDashboardComponentVue /></div>
</template>
<style>
.dashboard {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(500px, 0.6fr) minmax(300px, 0.4fr);
  grid-template-rows: 100px 1fr;
  gap: 30px;
}

.a {
  grid-area: 1 / 1 / 2 / 2;
}
.b {
  grid-area: 1 / 2 / 2 / 3;
}
.c {
  grid-area: 2 / 1 / 3 / 2;
}
.d {
  grid-area: 2 / 2 / 3 / 3;
}
</style>
