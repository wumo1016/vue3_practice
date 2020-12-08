<template>
  <div class="mine">
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <button @click="increment">increment</button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
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
      ...toRefs(data)
    }
  }
})
</script>
