<template>
  <div>
    <TodoList :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import TodoList from '@/components/todo-list'
const todos = ref(['测试1'])
</script>

<style scoped></style>
