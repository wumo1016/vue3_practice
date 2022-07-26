<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { Key } from '@zi-shui/components/tree/src/tree'
import { ref } from 'vue'

function createData(level = 4, parentKey = ''): any {
  if (!level) return []
  const arr = new Array(6 - level).fill(0)
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx
    return {
      label: createLabel(level), // 显示的内容
      key, // 为了唯一性
      children: createData(level - 1, key) // 孩子
    }
  })
}

function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false // 这里isLeaf 为false 表示点击的时候动态的加载子节点
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false
//     }
//   ]
// }

// function nextLabel(currentLabel?: string | number): string {
//   if (!currentLabel) return 'Out of Tao, One is born'
//   if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
//   if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
//   if (currentLabel === 'Out of Two, Three') {
//     return 'Out of Three, the created universe'
//   }
//   if (currentLabel === 'Out of Three, the created universe') {
//     return 'Out of Tao, One is born'
//   }
//   return ''
// }

const data = ref(createData())

// const handleLoad = (node: TreeOption) => {
//   // 内部肯定需要将展开的节点传递给我
//   return new Promise<TreeOption[]>(resolve => {
//     setTimeout(() => {
//       resolve([
//         // 这个数据会作为当前展开的node的children属性
//         {
//           label: nextLabel(node.label),
//           key: node.key + nextLabel(node.label),
//           isLeaf: false
//         }
//       ])
//     }, 500)
//   })
// }
// console.log(data.value)

const selectedKeys = ref<Key[]>(['40'])
</script>

<template>
  <z-icon
    :color="'red'"
    :size="20"
  >
    <AddCircle></AddCircle>
  </z-icon>

  <z-tree
    v-model:selected-keys="selectedKeys"
    :data="data"
    :default-expanded-keys="['40']"
    label-field="label"
    key-field="key"
    children-field="children"
    selectable
  >
  </z-tree>
</template>
