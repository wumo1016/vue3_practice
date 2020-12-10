<template>
  <div class="mine">
    <h1>{{ person.name }}</h1>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUpdated,
  reactive,
  toRefs
} from 'vue'
interface DataProps {
  person: { name?: string }
}
export default defineComponent({
  setup() {
    const data: DataProps = reactive({
      person: {}
    })
    onMounted(() => {
      console.log(data.person.name)
    })
    onUpdated(() => {
      console.log(data.person.name)
    })
    onRenderTracked(event => {
      console.log(event)
    })
    onRenderTriggered(event => {
      console.log(event)
    })
    setTimeout(() => {
      data.person.name = 'wyb'
    }, 1000)
    return {
      ...toRefs(data)
    }
  }
})
</script>
