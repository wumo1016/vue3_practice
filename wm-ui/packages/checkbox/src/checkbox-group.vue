<template>
  <div class="wu-checkbox-group">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from 'vue'

export default defineComponent({
  name: 'WmCheckboxGroup',
  props: {
    modelValue: Array
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {

    const changeEvent = (vaule) => {
      emit('change', vaule)
      emit('update:modelValue', vaule)
    }

    provide('group-data', {
      name: 'checkboxGroup',
      modelValue: computed(() => props.modelValue),
      changeEvent
    })

    return {}
  },
})
</script>

<style scoped>
</style>