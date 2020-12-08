<template>
  <div class="mine">
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <button @click="increment">increment</button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const count = ref(0)
    const double = computed(() => {
      return count.value * 2
    })
    const increment = () => {
      count.value++
    }
    return {
      count,
      double,
      increment
    }
  }
})
</script>
