<template>
  <i class="z-icon" :style="style">
    <slot />
  </i>
</template>
<script>
import { computed, defineComponent } from 'vue'
import { iconProps } from './index'

export default defineComponent({
  name: 'ZIcon', 
  props: iconProps,
  setup(props) {
    const style = computed(() => {
      const obj = {}
      if (props.size) {
        obj['font-size'] = props.size + 'px'
      }
      if (props.color) {
        obj['color'] = props.color
      }
      return obj
    })
    return {
      style
    }
  }
})
</script>