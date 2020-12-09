<template>
  <div>
    <Modal :isOpen="modalIsOpen" @closeModel="closeModal" />
    <button @click="openModal">打开</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Modal from './modal.vue'
export default defineComponent({
  components: { Modal },
  setup() {
    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const closeModal = () => {
      modalIsOpen.value = false
    }
    return {
      modalIsOpen,
      openModal,
      closeModal
    }
  }
})
</script>

<style scoped></style>
