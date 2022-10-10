<template>
  <div>
    <Todo />
  </div>
</template>

<script setup lang="ts">
import Todo from '@/components/todo/index.vue'

import { login } from '@/api/user'

login<{ username: string; token: string }>({
  username: 'hello 123',
  password: 'jw'
}).then((res) => {
  console.log(res.data?.username)
})
</script>

<style scoped></style>
