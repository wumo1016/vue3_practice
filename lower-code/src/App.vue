<template>
  <div class="app">
    <Editor v-model="state" :formData="formData" />
  </div>
</template>

<script>
import { defineComponent, provide, ref } from 'vue'
import data from './data'
import Editor from './packages/editor'
import { registerConfig as config } from './utils/editor-config.jsx'

export default defineComponent({
  name: 'App',
  components: { Editor },
  setup() {
    provide('config', config)
    const state = ref(data)

    const formData = ref({
      username: 'wyb',
      password: 123456
    })

    return {
      state,
      formData
    }
  }
})
</script>

<style lang="scss">
.app {
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>
