<template>
  <div>
    <div>x: <input type="text" v-model="x" /></div>
    <div>y: <input type="text" v-model="y" /></div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'

const x = ref(0)
const y = ref(0)
watchEffect(() => {
  const res = x.value + y.value
  console.log(res)
})
</script>


