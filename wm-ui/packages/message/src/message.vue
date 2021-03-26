<template>
  <transition name="wm-message-fade" @before-leave="onClose" @after-leave="$emit('destory')">
    <div :class="classs" v-show="visible" :style="styles">
      <slot>
        <i :class="`wm-icon-${type}`"></i>
        <span>{{ message }}</span>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  Prop,
  PropType,
  ref,
} from 'vue'
import type { TMessageType } from './types'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<TMessageType>,
      default: 'info',
    },
    duration: {
      type: Number,
      default: 2000,
    },
    center: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
    offset: {
      type: Number,
      default: 20,
    },
  },
  setup(props) {

    const visible = ref(false)

    const classs = computed(() => [
      'wm-message',
      `wm-message--${props.type}`,
      props.center ? 'is-center' : '',
    ])

    const styles = computed(() => {
      return {
        top: `${props.offset}px`
      }
    })

    let timer

    onMounted(() => {
      visible.value = true
      timer = setTimeout(() => {
        visible.value = false
      }, props.duration)
    })

    onUnmounted(() => {
      clearTimeout(timer)
    })

    return {
      classs,
      visible,
      styles
    }
  },
})
</script>

<style scoped>
</style>
