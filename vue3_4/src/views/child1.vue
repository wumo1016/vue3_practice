<template>
  <div>第二行{{ age }}</div>
</template>
<script setup lang="ts">
const props = defineProps<{ age?: number }>()
console.log(props.age);

</script>