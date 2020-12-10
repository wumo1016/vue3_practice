<template>
  <div>
    <h1>{{ result }}</h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          result: 1016
        })
      }, 3000)
    })
  }
})
</script>
