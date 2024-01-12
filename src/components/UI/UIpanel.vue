<template>
  <div class="user-dropdown">
    <img
      src="/User_Icon.png"
      alt="User Avatar"
      class="user-dropdown__avatar"
      id="user-avatar"
      @click="toggleDropdown"
    />
    <div
      class="user-dropdown__menu"
      :class="{ 'user-dropdown__menu--show': isDropdownOpen }"
      v-show="isDropdownOpen"
    >
      <a @click="logout" class="user-dropdown__item" href="/"> Logout </a>
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
.user-dropdown {
  position: relative;
}

.user-dropdown__avatar {
  width: 64px;
  height: 64px;
  cursor: pointer;
  border-radius: 50%;
}

.user-dropdown__menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  display: none;
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

.user-dropdown__menu--show {
  display: block;
}
</style>
