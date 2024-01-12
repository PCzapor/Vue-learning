<script lang="ts">
import router from '@/router'
import type { ValidationRuleCollection } from '@vuelidate/core'
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { reactive } from 'vue'
import { toast } from 'vue-sonner'
import CustomInput from './../helpers/CustomInput.vue'
interface LoginForm {
  email: string
  password: string
}

interface LoginFormValidation {
  email: ValidationRuleCollection<any>
  password: ValidationRuleCollection<any>
}

export default {
  components: {
    CustomInput
  },
  name: 'LoginForm',
  setup() {
    const form: LoginForm = reactive({ email: '', password: '' })
    const rules: LoginFormValidation = {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }

    const v$ = useVuelidate(rules, form)
    const mockUser = { email: 'admin@admin', password: 'admin1' }
    const handleSubmit = () => {
      console.log('dzialam', v$.value.$invalid)
      v$.value.$touch()
      if (v$.value.$invalid) {
        if (form.email === mockUser.email && form.password === mockUser.password) {
          console.log('succes')
          toast.success('Login succesful!')
          setTimeout(() => {
            router.push('/dashboard')
          }, 700)
        }
      } else {
        toast.error('Login Error!')
      }
    }

    return { form, v$: v$.value, handleSubmit }
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <CustomInput
      id="email"
      v-model="form.email"
      type="email"
      label="Email:"
      class="login-form__input"
    >
      <template v-slot:error>
        <div v-if="v$.email.$dirty" class="login-form__error-container">
          <div class="login-form__error-message" v-if="!v$.email.required && v$.email.email">
            Email jest wymagany
          </div>
          <div class="login-form__error-message" v-else-if="!v$.email.email">
            Podaj prawidłwy adres email
          </div>
        </div>
      </template>
    </CustomInput>

    <CustomInput
      id="password"
      v-model="form.password"
      type="password"
      label="Hasło:"
      class="login-form__input"
    >
      <template v-slot:error>
        <div v-if="v$.password.$dirty" class="login-form__error-container">
          <div
            class="login-form__error-message"
            v-if="!v$.password.required && v$.password.minLength.$invalid"
          >
            Hasło jest wymagane
          </div>
          <div class="login-form__error-message" v-if="v$.password.minLength.$invalid">
            Hasło musi mieć co najmniej 6 znaków
          </div>
        </div>
      </template>
    </CustomInput>
    <slot name="toggleForm" class="login-form__toggle"></slot>
    <button type="submit" class="login-form__submit-button">Zaloguj się</button>
  </form>
</template>

<style scoped>
.login-form {
  min-width: 300px;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.login-form__input {
  margin-bottom: 10px;
}

.login-form__input label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.login-form__input input[type='email'],
.login-form__input input[type='password'] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-form__submit-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #5c6bc0;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.login-form__submit-button:hover {
  background-color: #3f51b5;
}

.login-form__error-container {
  color: red;
}

.login-form__error-message {
  font-size: 14px;
}
</style>
