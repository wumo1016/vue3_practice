import { defineComponent, inject, toRef } from 'vue'
import { treeInjectKey, treeNodeContentProps } from './tree'

export default defineComponent({
  name: 'ZTreeNodeContent',
  props: treeNodeContentProps,
  setup(props) {
    const treeContext = inject(treeInjectKey)
    const node = toRef(props, 'node')
    return () => {
      const defaultFn = treeContext?.slots.default
      return defaultFn ? defaultFn({ node: node.value }) : node.value?.label
    }
  }
})
