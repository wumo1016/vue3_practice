<!--
 * @Description: 带连接线的 el-tree (暂不支持懒加载)
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2022-04-10 17:57:54
-->
<template>
  <el-tree
    ref="refTree"
    class="tree_line"
    v-bind="$attrs"
    :indent="0"
    :data="treeData"
  >
    <template #default="{ node, data }">
      <div :class="['custom_node', { rootLast: data.ROOTLAST }]">
        <div :class="data._thread_class"></div>
        <div v-if="node.childNodes.length" class="icon_box">
          <span v-if="node.expanded" style="position: relative; top: -1px">
            -
          </span>
          <span v-else>+</span>
        </div>
        <div
          v-if="data._placeholder"
          style="width: 14px; margin-right: 6px"
        ></div>
        <div class="custom_node_content">{{ node.label }}</div>
      </div>
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUpdated, type PropType } from 'vue'
import type { IObject } from '@/utils/typing'

const props = defineProps({
  data: {
    type: Array as PropType<IObject[]>,
    default: []
  }
})

const refTree = ref(null)

const dealData = (sourceData: IObject[]) => {
  if (!sourceData.length) return []
  sourceData[0].ROOT = true
  sourceData[sourceData.length - 1].ROOTLAST = true
  const loop = (list: IObject[]) => {
    const len = list.length
    list.forEach((item, index) => {
      if (list.every(v => !v.Children?.length)) {
        item._thread_class = `thread thread${index === len - 1 ? 1 : 2}`
      } else {
        if (index === 0) {
          if (!item.ROOT) item._thread_class = 'thread thread1'
        } else {
          if (!item.Children?.length) {
            item._placeholder = true
            item._thread_class = `thread thread${index === len - 1 ? 3 : 4}`
          }
        }
      }
      if (item.Children?.length) loop(item.Children)
    })
  }
  loop(sourceData)
  return sourceData
}

const treeData = computed(() => dealData(props.data))

const dealRootLastNode = () => {
  ;(refTree.value as any).$el
    ?.querySelector('.rootLast')
    ?.parentNode?.parentNode?.classList.add('root_last_tree_node')
}
onMounted(() => dealRootLastNode())
onUpdated(() => dealRootLastNode())
</script>

<style lang="scss">
.tree_line {
  overflow: hidden;
  .el-tree-node {
    position: relative;
    padding-left: 20px;
    &:not(:last-child) {
      &::before {
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
      padding-left: 15px;
    }
  }
  .el-tree-node__expand-icon {
    position: absolute;
    left: 25px;
    top: 1px;
    z-index: 3;
    opacity: 0;
  }
  .custom_node {
    padding-left: 10px;
    position: relative;
    z-index: 2;
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
    .custom_node_content {
      position: relative;
      z-index: 2;
    }
    .thread {
      width: 8px;
      height: 20px;
      position: absolute;
      left: 0px;
      top: -9px;
      border-left: 1px dotted #4386c6;
      border-bottom: 1px dotted #4386c6;
    }
    .thread1 {
      &::after {
        content: '';
        width: 5px;
        height: 6px;
        background: #fff;
        position: absolute;
        top: 7px;
        left: 13px;
        z-index: 1;
      }
    }
    .thread2 {
      &::before {
        content: '';
        height: 6px;
        position: absolute;
        left: -1px;
        top: 100%;
        border-left: 1px dotted #4386c6;
      }
      &::after {
        content: '';
        width: 5px;
        height: 35px;
        background: #fff;
        position: absolute;
        top: 0;
        left: 13px;
        z-index: 1;
      }
    }
    .thread3 {
      width: 8px;
      height: 6px;
      left: 16px;
      top: 7px;
    }
    .thread4 {
      width: 7px;
      height: 12px;
      left: 17px;
      top: 1px;
      border-left: none;
    }
  }
  .root_last_tree_node {
    &::before {
      display: none;
    }
  }
}
</style>
