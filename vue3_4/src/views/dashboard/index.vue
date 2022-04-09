<template>
  <div>
    <h1>Dashboard page</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <el-icon>
      <plus />
    </el-icon>
    <el-button @click="test">测试</el-button>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()!

const test = () => {
  proxy?.$message.success('测试消息')
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
h1 {
  color: $menuActiveText;
}
</style>
