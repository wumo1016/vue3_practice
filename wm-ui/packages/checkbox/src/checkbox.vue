<template>
  <div class="wm-checkbox">
    <span class="wm-checkbox__input"><input
        type="checkbox"
        v-model="checkValue"
        :name="name"
        :disabled="disabled"
        :indeterminate="indeterminate"
        :checked="checked"
        @change="change"
      ></span>
    <span
      class="wm-checkbox__label"
      @click="changeStatus"
    >
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { ICheckboxGroupProvide } from './checkbox-types'

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
  setup(props, { emit, slots }) {
    // 多选组
    const groupOptions = inject<ICheckboxGroupProvide>('group-data', {})
    const checked = computed(() => {
      const list = groupOptions.modelValue.value
      return Array.isArray(list) ? list.includes(props.label) : false
    })
    const changeGroupStatus = (value) => {
      if (groupOptions.name) {
        let ret = [...groupOptions.modelValue.value]
        if (value) {
          ret.push(props.label)
        } else {
          ret.splice(
            ret.findIndex((v) => v === props.label),
            1
          )
        }
        groupOptions?.changeEvent(ret)
      }
    }

    const checkValue = computed({
      get() {
        return groupOptions.name ? checked.value : props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
        changeGroupStatus(value)
      },
    })

    const change = (e: InputEvent) => {
      const target = e.target as HTMLInputElement
      const value = target.checked ? true : false
      emit('change', value)
    }

    const changeStatus = () => {
      if(props.disabled) return
      const value = !checkValue.value
      emit('update:modelValue', value)
      emit('change', value)
      changeGroupStatus(value)
    }

    return {
      checkValue,
      change,
      changeStatus,
    }
  },
})
</script>
