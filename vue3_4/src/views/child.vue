<template>
  <div>第一行{{ name }}</div>
</template>

<script setup lang="ts">
const props = defineProps(['name'])
console.log(props.name)
</script>