<template>
  <div>
    <Suspense>
      <template #default>
        <!-- <TestSuspense /> -->
        <TestSuspense1 />
      </template>
      <template #fallback>
        loading...
      </template>
    </Suspense>
    <p>{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from 'vue'
import TestSuspense from './suspense.vue'
import TestSuspense1 from './suspense1.vue'
export default defineComponent({
  components: { TestSuspense, TestSuspense1 },
  setup() {
    const error = ref(null)
    onErrorCaptured((e: any) => {
      error.value = e
      // 返回值 错误是否向上传播
      return true
    })
    return {
      error
    }
  }
})
</script>
