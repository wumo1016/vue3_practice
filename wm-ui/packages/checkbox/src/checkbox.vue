<template>
  <div
    class="wm-checkbox"
    @click="changeStatus"
  >
    <span class="wm-checkbox__input"><input
        type="checkbox"
        v-model="checkValue"
        :name="name"
        :disabled="disabled"
        :indeterminate="indeterminate"
        :checked="checked"
        @change="change"
      ></span>
    <span class="wm-checkbox__label">
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'WmCheckbox',
  props: {
    name: String,
    indeterminate: Boolean,
    checked: Boolean,
    disabled: Boolean,
    modelValue: [String, Boolean, Number],
    label: [String, Boolean, Number],
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const checkValue = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
      },
    })

    const change = (e: InputEvent) => {
      const target = e.target as HTMLInputElement
      const value = target.checked ? true : false
      emit('change', value)
    }

    const changeStatus = () => {
      emit('update:modelValue', !checkValue.value)
    }

    return {
      checkValue,
      change,
      changeStatus,
    }
  },
})
</script>
