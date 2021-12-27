<template>
  <div @click="emit('test', 'wyb')">第一行</div>
</template>

<script setup lang="ts">
const emit = defineEmits(['test'])
</script>