<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
</script>

<template>
  <main>
    <RouterView />
    <Toaster position="top-center" closeButton richColors offset="300px" />
  </main>
</template>

<style scoped>
main {
  margin: 2rem;
  width: 800px;
  min-width: 800px;
  min-height: 80%;
  display: flex;
  justify-content: center;
}
</style>
