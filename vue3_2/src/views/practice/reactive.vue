<template>
  <div class="mine">
    <h1>{{ data.count }}</h1>
    <h1>{{ data.double }}</h1>
    <button @click="data.increment">increment</button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
// 解决data报错的问题
interface DataProps {
  count: number
  increment: () => void
  double: number
}
export default defineComponent({
  setup() {
    const data: DataProps = reactive({
      count: 0,
      increment: () => {
        data.count++
      },
      double: computed(() => data.count * 2)
    })
    return {
      data
    }
  }
})
</script>
