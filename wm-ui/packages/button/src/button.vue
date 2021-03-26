<template>
  <button
    :class="classs"
    @click="handleClick"
    :disabled="disabled"
  >
    <i
      v-if="icon && !loading"
      :class="icon"
    ></i>
    <i
      v-if="loading"
      class="wm-icon-loading"
    ></i>
    <span>
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
type ButtonType =
  | 'primary'
  | 'warning'
  | 'danger'
  | 'default'
  | 'info'
  | 'success'
export default defineComponent({
  name: 'WmButton',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: '',
      validator: (v: string) => {
        if(v === '') return true
        return [
          'primary',
          'warning',
          'danger',
          'default',
          'info',
          'success',
        ].includes(v)
      },
    },
    icon: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    loading: Boolean,
    round: Boolean,
  },
  emits: ['click'],
  setup(props, ctx) {
    // console.log(props.disabled);
    const classs = computed(() => {
      return [
        'wm-button',
        `wm-button--${props.type}`,
        {
          'is-disabled': props.disabled,
          'is-loading': props.loading,
          'is-round': props.round,
        },
      ]
    })
    const handleClick = (e) => {
      ctx.emit('click', e)
    }
    return {
      classs,
      handleClick,
    }
  },
})
</script>
