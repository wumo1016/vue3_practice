<template>
  <Child />
  <input v-focus />
</template>
<script setup lang="ts">
import { ref } from '@vue/reactivity'
import Child from './child.vue'

const vFocus = {
  mounted(el) {
    el.focus()
  }
}

const myColor = ref('red')
</script>
<style scoped>
div {
  color: v-bind(myColor);
}
</style>