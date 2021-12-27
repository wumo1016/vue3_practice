<template>
  <Child v-bind="name" />
</template>
<script setup lang="ts">
import { reactive } from '@vue/reactivity'
import Child from './child.vue'
const name = reactive({
  name: 'wyb',
  age: 18
})
</script>