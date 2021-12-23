<template>
  <div>
    <Child class="test" />
    <button @click="change">测试</button>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import Child from './child.vue'


const change = () => { }

</script>


