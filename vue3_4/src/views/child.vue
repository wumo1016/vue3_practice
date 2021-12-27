<template>
  <div @click="emit('test', name++)">第一行</div>
</template>
<script setup lang="ts">
import { ref } from "@vue/reactivity"
const name = ref(0)
const emit = defineEmits({
  test(val) {
    console.log(val);
    return false
  }
}) // 必须定义
</script>