<template>
  <div>
    <img :src="result && result.message" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
export default defineComponent({
  async setup() {
    const res = await axios.get('https://dog.ceo/api/breeds/image/random')
    return {
      result: res.data
    }
  }
})
</script>

<style scoped></style>
