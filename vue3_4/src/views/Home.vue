<template>
  <input type="text" v-model="name" />
  <Child @test="test" />
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import Child from './child.vue'

const test = params => {
  console.log(params)
}
</script>


