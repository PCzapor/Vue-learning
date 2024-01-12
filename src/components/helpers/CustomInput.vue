<template>
  <div class="customInput">
    <label v-if="label">{{ label }}</label>
    <input :type="type" :value="value" @input="handleInput" />
    <slot name="error"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(newValue: any) {
        this.$emit('update:modelValue', newValue)
      }
    }
  },
  methods: {
    handleInput(event: Event) {
      const input = event.target as HTMLInputElement
      this.$emit('update:modelValue', input.value)
    }
  }
})
</script>

<style scoped>
.customInput {
  margin-bottom: 10px;
}

.customInput label {
  display: block;
  margin-bottom: 5px;
}

.customInput input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
}
</style>
