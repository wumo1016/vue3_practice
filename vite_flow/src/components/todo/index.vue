<template>
  <div>
    <div>
      <input type="text" v-model="todo" />
      <button @click="addTodo">添加内容</button>
    </div>
    <TodoList :todos="todos"></TodoList>
  </div>
</template>

<script setup lang="ts">
import TodoList from './todo-list'
const todo = ref('')
const todos = ref<string[]>([])

const addTodo = () => {
  if (!todo.value) return
  todos.value.push(todo.value)
}
</script>
