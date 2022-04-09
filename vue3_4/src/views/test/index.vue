<template>
  <div class="tree_box">
    <el-tree
      class="tree-line"
      :data="data"
      :props="defaultProps"
      :indent="0"
      default-expand-all
    >
      <template class="custom-tree-node" #default="{ node, data }">
        <div class="custom_node">
          <div class="custom_tag" v-if="data.FIRST"></div>
          <span class="icon_box" v-if="node.childNodes.length">
            <span v-if="node.expanded" style="position: relative; top: -1px">
              -
            </span>
            <span v-else>+</span>
          </span>
          <span> {{ node.label }} </span>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { mockData } from './mock'

const loop = list => {
  const len = list.length
  if (len < 1) return
  list.forEach((item, index) => {
    if (index === 0 && !item.ROOT) item.FIRST = true
    if (item.Children?.length) loop(item.Children)
  })
}
mockData[0].ROOT = true
loop(mockData)

console.log(mockData)

const data = mockData

const defaultProps = {
  children: 'Children',
  label: 'Name'
}
</script>

<style>
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

<style lang="scss">
.tree-line {
  .el-tree-node {
    position: relative;
    padding-left: 20px;
    &:not(:last-child) {
      &:before {
        content: '';
        height: 100%;
        width: 1px;
        position: absolute;
        left: 36px;
        top: 9px;
        border-width: 1px;
        border-left: 1px dotted #4386c6;
        z-index: 1;
      }
    }
    .el-tree-node__children {
      padding-left: 25px;
    }
    .custom_tag {
      position: absolute;
    }
  }
  //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
  .el-tree-node__expand-icon {
    display: none;
  }

  .custom_node {
    padding-left: 10px;
    position: relative;
    z-index: 2;
    background: #fff;
    display: flex;
    align-items: center;
    .icon_box {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 1px solid gray;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: gray;
      margin-right: 6px;
      font-size: 16px;
      background: #fff;
      position: relative;
      z-index: 2;
    }
    .custom_tag {
      position: absolute;
      width: 14px;
      height: 20px;
      border-left: 1px dotted #4386c6;
      border-bottom: 1px dotted #4386c6;
      left: -5px;
      top: -9px;
    }
  }
}
</style>
