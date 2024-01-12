<script setup lang="ts">
import LoginForm from '@/components/LoginSection/LoginForm.vue'
import RegisterComponent from '@/components/LoginSection/RegisterComponent.vue'
import { reactive } from 'vue'

const showForm = reactive({ show: 'login' })
const toggleForm = () => {
  showForm.show = showForm.show === 'login' ? 'register' : 'login'
}
</script>

<template>
  <div class="loginDisplayContainer">
    <LoginForm v-if="showForm.show === 'login'"
      ><template v-slot:toggleForm>
        <div>
          Kliknij tu,
          <button class="toggleButton" type="button" @click="toggleForm">
            aby się zarejestrować
          </button>
        </div>
      </template>
    </LoginForm>
    <RegisterComponent v-else
      ><template v-slot:toggleForm>
        <div>
          Kliknij tu,
          <button class="toggleButton" type="button" @click="toggleForm">aby się zalogować</button>
        </div>
      </template></RegisterComponent
    >
  </div>
</template>
<style scoped>
.loginDisplayContainer {
  display: flex;
  align-self: center;
}
.toggleButton {
  background: none;
  border: none;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
}
</style>
