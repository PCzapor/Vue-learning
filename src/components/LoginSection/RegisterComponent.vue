<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <CustomInput name="name" id="name" v-model="form.name" label="Podaj imię" />

      <CustomInput name="email" id="email" v-model="form.email" label="Podaj email">
        <template v-slot:error>
          <div v-if="v$.email.$dirty">
            <div class="error-message" v-if="!v$.email.required && v$.email.email">
              Email jest wymagany
            </div>
            <div class="error-message" v-else-if="!v$.email.email">Podaj prawidłwy adres email</div>
          </div>
        </template>
      </CustomInput>
      <CustomInput name="password" id="password" v-model="form.password" label="Podaj hasło">
        <template v-slot:error>
          <div v-if="v$.password.$dirty">
            <div
              class="error-message"
              v-if="!v$.password.required && v$.password.minLength.$invalid"
            >
              Hasło jest wymagane
            </div>
            <div class="error-message" v-if="v$.password.minLength.$invalid">
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
      >
        <template v-slot:error>
          <div v-if="v$.password.$dirty">
            <div class="error-message" v-if="!v$.confirmPassword.sameAsPassword.$valid">
              {{ v$.confirmPassword.sameAsPassword.$message }}
            </div>
          </div>
        </template>
      </CustomInput>
      <slot name="toggleForm"></slot>
      <button type="submit">Zarejestruj się</button>
    </form>
  </div>
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
form {
  min-width: 300px;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

div {
  margin-bottom: 10px;
  color: black;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type='submit'] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #5c6bc0;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button[type='submit']:hover {
  background-color: #3f51b5;
}

div.error-message {
  color: red;
  font-size: 14px;
}
</style>
