<template>
  <div id="fmea-tree" class="fmea_tree_wrapper"></div>
</template>
<script setup lang="ts">
import G6 from '@antv/g6';
import TreeGraphUtil from './TreeGraphUtil'
import MockData from './mock'

const treeGraphUtil = new TreeGraphUtil(MockData)
</script>
<style lang="scss" scoped>
.fmea_tree_wrapper {
  height: 100%;
}
</style>