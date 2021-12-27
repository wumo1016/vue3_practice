<template>
  <input type="text" v-model="name" />
  <Child :name="name" />
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import Child from './child.vue'

const name = ref('wyb')
</script>


