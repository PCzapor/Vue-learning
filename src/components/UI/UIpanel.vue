<template>
  <div class="dropdown">
    <img
      src="/User_Icon.png"
      alt="User Avatar"
      class="rounded-circle"
      :style="{ width: '64px', height: '64px', cursor: 'pointer' }"
      id="user-avatar"
      @click="toggleDropdown"
    />
    <div
      class="dropdown-menu dropdown-menu-right"
      :class="{ dropdownShow: toggleDropdown }"
      v-show="isDropdownOpen"
    >
      <a @click="logout" class="dropdown-item" href="/"> Logout </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const logout = () => {}
</script>

<style>
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}
.dropdownShow {
  display: block;
}

.dropdown-menu-right {
  right: 0;
  left: auto;
}
.rounded-circle {
  border-radius: 50%;
}
</style>
