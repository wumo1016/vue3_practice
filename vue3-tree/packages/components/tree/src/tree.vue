<template>
  <div :class="bem.b()">
    <z-virtual-list
      :items="flattenTree"
      :remain="8"
      :size="35"
    >
      <template #default="{ node }">
        <ZTreeNode
          :node="node"
          :expanded="isExpanded(node)"
          :loadingKeys="loadingKeysRef"
          :selectedKeys="selectKeysRef"
          @toggle="toggleExpand"
          @select="handleSelect"
        >
        </ZTreeNode>
      </template>
    </z-virtual-list>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { createNamespace } from '@zi-shui/utils/create'
import { ref, watch, provide, useSlots } from 'vue'
import {
  TreeOption,
  treeProps,
  TreeNode,
  Key,
  treeEmits,
  treeInjectKey
} from './tree'
import ZTreeNode from './tree-node.vue'
import ZVirtualList from '@zi-shui/components/virtual-list'

const bem = createNamespace('tree')

defineOptions({
  name: 'z-tree'
})

const props = defineProps(treeProps)
// console.log(props)

// 格式化数据
function createTree(data: TreeOption[], parent: TreeNode | null = null) {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      const children = treeOptions.getChildren(node) || []
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [], // 默认为空
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        // 判断节点是否自带isLeaf 如果自带了 以自带的为准，如果没有自带的则看一下有没有children属性
        // 对 ||的增强操作  ?.  ??
        isLeaf: node.isLeaf ?? children?.length == 0, // 是否是叶子节点
        disabled: !!node.disabled // 添加disabled属性
      }
      if (children.length > 0) {
        // 有孩子再去递归孩子，将其格式化成treeNode类型
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }
  const result: TreeNode[] = traversal(data, parent)
  return result
}
const treeOptions = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField
)
function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string // 用户传递的key
    },
    getLabel(node: TreeOption) {
      return node[label] as string // 用户传递label
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[] // 用户传递的children获取孩子
    }
  }
}

// 我们将props.data 格式化后放到tree中
const tree = ref<TreeNode[]>([])
// 监控数据变化，调用格式化方法。 一上来先格式化一次
watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data)
    // console.log(tree.value)
  },
  { immediate: true }
)

// 需要展开的key 有哪些
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))

// 默认显示的拍平的数据
const flattenTree = computed(() => {
  const expandedKeys = expandedKeysSet.value // 要展开的keys有哪些
  // 最终拍平的节点
  const flattenNodes: TreeNode[] = [] // 这个就是拍平后的结果
  const nodes = tree.value || [] // 被格式化后的节点
  const stack: TreeNode[] = [] // 用于遍历树的栈  [40,30,31,32,41]
  // [40, 41]
  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i])
  }
  // [41,50,40,30]
  // 深度遍历
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    flattenNodes.push(node)
    if (expandedKeys.has(node.key)) {
      const children = node.children // [30,31,32];
      if (children) {
        for (let i = node.children.length - 1; i >= 0; --i) {
          stack.push(node.children[i])
        }
      }
    }
  }
  return flattenNodes
})

// console.log(flattenTree.value)

// loading功能 当前正在加载的key
const loadingKeysRef = ref(new Set<Key>())
function triggerLoading(node: TreeNode) {
  // 没有孩子 并且有不是叶子节点
  if (!node.children.length && !node.isLeaf) {
    const loadingKeys = loadingKeysRef.value
    const { onLoad } = props
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key)
      if (onLoad) {
        onLoad(node.rawNode).then((children: TreeOption[]) => {
          // 修改原来的节点
          node.rawNode.children = children
          // 更新自定义的节点
          node.children = createTree(children, node)
          loadingKeys.delete(node.key)
        })
      }
    }
  }
}
// 当前节点是否展开
function isExpanded(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key)
}
// 展开功能
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key)
  triggerLoading(node)
}
// 折叠功能
function collpase(node: TreeNode) {
  expandedKeysSet.value.delete(node.key)
}
// 切换展开
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeysSet.value
  // 正在加载中不允许收起
  if (expandKeys.has(node.key) && !loadingKeysRef.value.has(node.key)) {
    collpase(node)
  } else {
    expand(node)
  }
}

// 5) 实现选中节点
const emit = defineEmits(treeEmits)

const selectKeysRef = ref<Key[]>([])

watch(
  () => props.selectedKeys,
  value => {
    if (value) {
      selectKeysRef.value = value
      console.log(selectKeysRef.value)
    }
  },
  {
    immediate: true
  }
)

function handleSelect(node: TreeNode) {
  let keys = Array.from(selectKeysRef.value)
  if (!props.selectable) return // 如果不能选择什么都不用做了
  if (props.multiple) {
    const index = keys.findIndex(key => key === node.key)
    if (index > -1) {
      keys.splice(index, 1)
    } else {
      keys.push(node.key)
    }
  } else {
    if (keys.includes(node.key)) {
      keys = []
    } else {
      keys = [node.key]
    }
  }
  emit('update:selectedKeys', keys)
}

// 将插槽传递下去
provide(treeInjectKey, {
  slots: useSlots()
})
</script>