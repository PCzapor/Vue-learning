<template>
  <div class="progress">
    <div
      class="progress-bar progress-bar-transparent"
      role="progressbar"
      :style="{ width: weekMinToDayMin + '%' }"
      :aria-valuemax="weekMinToDayMin"
    ></div>
    <div
      class="progress-bar progress-bar-cold"
      role="progressbar"
      :style="{ width: props.temp + '%' }"
      :aria-valuemin="weekMinToDayMin"
      :aria-valuemax="props.temp"
    ></div>
    <div
      class="progress-bar progress-bar-hot"
      role="progressbar"
      :style="{ width: centerToDayMax + '%' }"
      :aria-valuemin="props.temp"
      :aria-valuemax="maxTempDiff"
    ></div>
    <div
      class="progress-bar progress-bar-transparent"
      role="progressbar"
      :style="{ width: maxTempDiff + '%' }"
      :aria-valuemin="centerToDayMax"
      :aria-valuemax="maxTempDiff"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  temp: { type: Number, default: 0 },
  temp_min: { type: Number, default: 0 },
  temp_max: { type: Number, default: 0 }
})

const weekMax = computed(() => props.temp_max + props.temp_max * 0.05)
const weekMin = computed(() => props.temp_min - props.temp_min * 0.05)
const conversion = computed(() => 100 / (weekMax.value - weekMin.value))
const weekMinToDayMin = computed(() => conversion.value * (props.temp_min - weekMin.value))
const averageTemp = computed(() => (props.temp_max + props.temp_min) / 2)
const centerToDayMax = computed(() => conversion.value * (props.temp_max - averageTemp.value))
const maxTempDiff = computed(() => conversion.value * (weekMax.value - props.temp_max))
</script>
<style>
.progress {
  display: flex;
  height: 0.5rem;
  overflow: hidden;
  line-height: 0;
  font-size: 0.75rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
  /* style="height: 4px; min-width: 200px" */
}
.progress-bar {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #007bff;
  transition: width 0.6s ease;
}

.progress-bar-transparent {
  background-color: transparent;
  height: 100%;
}

.progress-bar-cold {
  background-color: #17a2b8;
  height: 100%;
}

.progress-bar-hot {
  background-color: #ffc107;
  height: 100%;
}
</style>
