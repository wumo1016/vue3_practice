<template>
  <div class="mine">
    <h1>{{ count }}</h1>
    <button @click="increment">increment</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const count = ref(0)
    const increment = () => {
      count.value++
    }
    return {
      count,
      increment
    }
  }
})
</script>
