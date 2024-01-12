<template>
  <form @submit.prevent="handleSubmit" class="register-form">
    <CustomInput
      name="name"
      id="name"
      v-model="form.name"
      label="Podaj imię"
      class="register-form__input"
    />

    <CustomInput
      name="email"
      id="email"
      v-model="form.email"
      label="Podaj email"
      class="register-form__input"
    >
      <template v-slot:error>
        <div v-if="v$.email.$dirty" class="register-form__error-container">
          <div class="register-form__error-message" v-if="!v$.email.required && v$.email.email">
            Email jest wymagany
          </div>
          <div class="register-form__error-message" v-else-if="!v$.email.email">
            Podaj prawidłwy adres email
          </div>
        </div>
      </template>
    </CustomInput>

    <CustomInput
      name="password"
      id="password"
      v-model="form.password"
      label="Podaj hasło"
      class="register-form__input"
    >
      <template v-slot:error>
        <div v-if="v$.password.$dirty" class="register-form__error-container">
          <div
            class="register-form__error-message"
            v-if="!v$.password.required && v$.password.minLength.$invalid"
          >
            Hasło jest wymagane
          </div>
          <div class="register-form__error-message" v-if="v$.password.minLength.$invalid">
            Hasło musi mieć co najmniej 6 znaków
          </div>
        </div>
      </template>
    </CustomInput>

    <CustomInput
      name="confirmPassword"
      id="confirmPassword"
      v-model="form.confirmPassword"
      label="Potwierdz hasło"
      class="register-form__input"
    >
      <template v-slot:error>
        <div v-if="v$.confirmPassword.$dirty" class="register-form__error-container">
          <div
            class="register-form__error-message"
            v-if="!v$.confirmPassword.sameAsPassword.$valid"
          >
            {{ v$.confirmPassword.sameAsPassword.$message }}
          </div>
        </div>
      </template>
    </CustomInput>
    <slot name="toggleForm" class="register-form__toggle"></slot>
    <button type="submit" class="register-form__submit-button">Zarejestruj się</button>
  </form>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { required, email, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import CustomInput from '.././helpers/CustomInput.vue'
import type { ValidationRuleCollection, ValidatorResponse } from '@vuelidate/core/index.js'

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface RegisterFormValidation {
  name: ValidationRuleCollection<any>
  email: ValidationRuleCollection<any>
  password: ValidationRuleCollection<any>
  confirmPassword: ValidationRuleCollection<any>
}

export default {
  components: { CustomInput },
  name: 'RegisterForm',
  setup() {
    const form: RegisterForm = reactive({ name: '', email: '', password: '', confirmPassword: '' })
    const sameAsPassword = (value: any): ValidatorResponse => {
      return { $valid: form.password === value }
    }
    const rules: RegisterFormValidation = {
      name: {},
      email: { required, email },
      password: { required, minLength: minLength(6) },
      confirmPassword: {
        required,
        sameAsPassword: {
          $validator: sameAsPassword,
          $message: 'Hasła nie są takie same'
        }
      }
    }
    const v$ = useVuelidate(rules, form)

    const handleSubmit = () => {
      v$.value.$touch()
      if (!v$.value.$invalid) {
        console.log(v$)
      }
    }
    return { handleSubmit, form, v$: v$.value }
  }
}
</script>

<style lang="scss" scoped>
.register-form {
  min-width: 300px;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.register-form__input {
  margin-bottom: 10px;
}

.register-form__input label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.register-form__input input[type='email'],
.register-form__input input[type='password'] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.register-form__submit-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #5c6bc0;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.register-form__submit-button:hover {
  background-color: #3f51b5;
}

.register-form__error-container {
  color: red;
}

.register-form__error-message {
  font-size: 14px;
}
</style>
