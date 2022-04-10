<!--
 * @Description: 
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2022-04-10 18:08:11
-->
<template>
  <div class="tree_box">
    <LineTree
      :data="data"
      :props="defaultProps"
      :indent="0"
      :expand-on-click-node="false"
      default-expand-all
    />
  </div>
</template>

<script lang="ts" setup>
import type { IObject } from '@/utils/typing'
import { ref } from 'vue'
import LineTree from './index.vue'
import { mockData } from './mock'

const defaultProps = {
  children: 'Children',
  label: 'Name'
}

const data = ref<IObject[]>([])

setTimeout(() => {
  data.value = mockData
}, 1000)

</script>

<style lang="scss" scoped>
.tree_box {
  margin: 20px;
  height: 80%;
  padding: 20px;
  background: #fff;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid gray;
}
</style>
