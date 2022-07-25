<template>
  <div
    :class="[bem.b(), bem.is('selected', isSelected!),bem.is('disabled',node.disabled)]"
  >
    <div
      :class="bem.e('content')"
      :style="{ paddingLeft: `${node.level * 16}px` }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node.isLeaf },
          bem.is('leaf', node.isLeaf)
        ]"
        @click="handleExpand"
      >
        <z-icon size="25">
          <Switcher v-if="!isLoading"></Switcher>
          <Loading v-else></Loading>
        </z-icon>
      </span>
      <span
        :class="bem.e('label')"
        @click="handleContentClick(node)"
      >
        {{ node.label }}
        <!-- <ZTreeNodeContent :node="node"></ZTreeNodeContent> -->
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ZIcon from '@zi-shui/components/icon'
import Switcher from './icon/Switcher'
import Loading from './icon/Loading'
import { computed } from 'vue'
import { createNamespace } from '@zi-shui/utils/create'
import { TreeNode, treeNodeEmitts, treeNodeProps } from './tree'
const bem = createNamespace('tree-node')
const props = defineProps(treeNodeProps)

const emit = defineEmits(treeNodeEmitts)

function handleExpand() {
  emit('toggle', props.node)
}

const isLoading = computed(() => {
  return props.loadingKeys?.has(props.node.key)
})

const isSelected = computed(() => {
  // 判断是否选中
  return props.selectedKeys?.includes(props.node.key)
})

const handleContentClick = (node: TreeNode) => {
  // 内容点击触发选择
  if (node.disabled) return
  emit('select', node)
}
</script>
