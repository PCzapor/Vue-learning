<template>
  <button type="button" class="notification-button notification-button--primary">
    Notifications <span class="notification-button__badge">4</span>
  </button>
</template>

<script setup lang="ts"></script>

<style>
.notification-button {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.notification-button--primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.notification-button__badge {
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  color: #212529;
  background-color: #f8f9fa;
}
</style>
