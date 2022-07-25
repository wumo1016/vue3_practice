<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
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

const data = ref(createData())
// console.log(data.value)
</script>

<template>
  <z-icon
    :color="'red'"
    :size="20"
  >
    <AddCircle></AddCircle>
  </z-icon>

  <z-tree
    :data="data"
    :default-expanded-keys="['40']"
    label-field="label"
    key-field="key"
    children-field="children"
  >
  </z-tree>
</template>
