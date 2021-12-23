<template>
  <div>
    <input type="text" @input="change($event)" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import Child from './child.vue'

const change = (e: Event) => {
  console.log((e.target as HTMLInputElement).value);
}

</script>


