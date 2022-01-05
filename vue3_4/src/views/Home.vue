<template>
  <Child />
  <input v-focus />
</template>
<script setup lang="ts">
import Child from './child.vue'

const vFocus = {
  mounted(el) {
    el.focus()
  }
}
</script>