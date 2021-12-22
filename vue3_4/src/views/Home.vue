<template>
  <h3 v-bind="obj">{{ name }}</h3>
  <input type="text" v-model="name" a="1" />
  <div>{{ Math.max(1, 2) }}</div>
  <div>{{ globalObj.name }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const name = ref('wyb')

const obj = {
  name: 'wyb',
  age: 123,
}
</script>


