<template>
  <div>
    <h1 v-if="loading">loading...</h1>
    <img v-if="loaded" :src="result.message" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useUrlLoader from '@/hooks/useUrlLoader'
export default defineComponent({
  setup() {
    const { result, loading, loaded, error } = useUrlLoader(
      'https://dog.ceo/api/breeds/image/random'
    )
    return {
      result,
      loading,
      loaded,
      error
    }
  }
})
</script>

<style scoped></style>
