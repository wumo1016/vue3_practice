<template>
  <div class="mine">
    <button @click="change('a')">a</button>
    <button @click="change('b')">b</button>
    <button @click="change1('zf')">zf</button>
    <button @click="change1('qw')">qw</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
interface DataProps {
  name: string
}
export default defineComponent({
  setup() {
    // 监听一个响应式对象
    const title = ref('')
    const change = (value: string) => {
      title.value = value
    }
    watch(title, value => {
      document.title = value
    })
    // 监听一个响应式对象的属性
    const data: DataProps = reactive({
      name: 'wyb'
    })
    const change1 = (value: string) => {
      data.name = value
    }
    watch(
      () => data.name,
      value => {
        document.title = value
      }
    )
    return {
      title,
      change,
      change1,
      ...toRefs(data)
    }
  }
})
</script>
