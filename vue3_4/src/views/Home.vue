<template>
  <input type="text" :ref="inputRef" />
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue'

const inputRef = el => {
  console.log(el)
}
</script>


