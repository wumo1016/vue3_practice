<template>
  <div :class="[$attrs.class, 'test1']">第一行</div>
  <div>第二行</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const change = () => { }

</script>