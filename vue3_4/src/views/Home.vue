<template>
  <Child @test="test" />
</template>
<script setup lang="ts">
import Child from './child.vue'
const test = params => {
  console.log(params)
}
</script>