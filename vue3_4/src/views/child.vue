<template>
  <div>第一行{{ name }}</div>
  <div>第一行{{ age }}</div>
</template>
<script setup lang="ts">
defineProps<{ name?: string; age: number }>()
</script>