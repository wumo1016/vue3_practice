<template>
  <!-- <div>第一行{{ name }}</div> -->
  <Child1 />
</template>
<script setup lang="ts">
import { useAttrs } from '@vue/runtime-core'
import Child1 from './Child1.vue'
defineProps<{ name?: string }>()

</script>