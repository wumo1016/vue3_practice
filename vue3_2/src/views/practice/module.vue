<template>
  <div>
    <h1>x: {{ x }}</h1>
    <h1>y: {{ y }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useMousePosition from '@/hooks/useMousePosition'
export default defineComponent({
  setup() {
    const { x, y } = useMousePosition()
    return {
      x,
      y
    }
  }
})
</script>

<style scoped></style>
