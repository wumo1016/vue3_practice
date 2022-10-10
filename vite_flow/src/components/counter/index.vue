<template>
  <div>
    <button @click="handleClick" class="block rounded-lg text-#fff bg-black-1">
      计数器
    </button>
    <div>{{ store.count }}</div>
    <div>{{ store.doubleCount }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
const handleClick = () => {
  store.changeCount(5).then(() => {
    console.log('ok')
  })
}
</script>
