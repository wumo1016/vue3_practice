<template>
  <teleport to="#model">
    <div v-if="isOpen" id="center">
      <h2><slot>this is a modal</slot></h2>
      <button @click="closeModel">关闭</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    closeModel: null
  },
  setup(props, ctx) {
    const closeModel = () => {
      ctx.emit('closeModel')
    }
    return {
      closeModel
    }
  }
})
</script>

<style>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>
