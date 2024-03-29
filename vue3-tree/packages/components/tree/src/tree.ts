// vue组件的props

import { ExtractPropTypes, InjectionKey, PropType, SetupContext } from 'vue'

export type Key = string | number

export interface TreeOption {
  label?: Key
  key?: Key
  children?: TreeOption[]
  isLeaf?: boolean
  [key: string]: unknown // 任意的接口
}
export interface TreeNode extends Required<TreeOption> {
  level: number
  rawNode: TreeOption
  children: TreeNode[]
  isLeaf: boolean // 仅仅 lazy 模式下生效
  disabled: boolean
}

export const treeProps = {
  // props 是仅读的
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  labelField: {
    type: String,
    default: 'label'
  },
  keyField: {
    type: String,
    default: 'key'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  selectable: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  selectedKeys: Array as PropType<Key[]>,
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  showCheckbox: {
    type: Boolean,
    default: false
  },
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
} as const

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    required: true
  },
  selectedKeys: {
    type: Array as PropType<Key[]>
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  checked: Boolean,
  disabled: Boolean,
  indeterminate: Boolean
} as const

export const treeEmits = {
  'update:selectedKeys': (keys: Key[]) => keys
}
export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node
}

export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>

export interface TreeContext {
  slots: SetupContext['slots']
}
export const treeInjectKey: InjectionKey<TreeContext> = Symbol()

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
} as const
