<template>
  <div class="UIcontainer">
    <UserNotification />
    <UIpanel />
  </div>
</template>

<script setup lang="ts">
import UserNotification from './UserNotification.vue'
import UIpanel from './UIpanel.vue'
</script>

<style>
.UIcontainer {
  display: flex;
  width: 100%;
  height: 64px;
  justify-content: end;
}
</style>
