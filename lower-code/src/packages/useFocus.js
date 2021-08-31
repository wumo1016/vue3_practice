import { computed, ref } from 'vue'

export default (data, callback) => {
  const selectIndex = ref(-1) // 表示选中组件的最后一个的索引
  // 最后选择的组件 作辅佐线用
  const lastSelectBlock = computed(() => {
    return data.value.blocks[selectIndex.value]
  })

  const focusData = computed(() => {
    let focus = []
    let unFocus = []
    data.value.blocks.map(block => {
      ;(block.focus ? focus : unFocus).push(block)
    })
    return { focus, unFocus }
  })
  // 清空所有的聚焦
  const clearBlockFocus = () => {
    data.value.blocks.forEach(block => {
      block.focus = false
    })
  }
  // 内容区内的拖拽
  const blockMousedown = (e, block, index) => {
    e.preventDefault()
    e.stopPropagation()
    // 定义当前component是否聚焦
    // 如果没有按下shift键 就直接清空
    if (!block.focus) {
      if (!e.shiftKey) {
        clearBlockFocus()
      }
      block.focus = true
    }
    selectIndex.value = index
    callback(e)
  }
  // 内容区的鼠标点击事件
  const containerMousedown = e => {
    clearBlockFocus()
    selectIndex.value = -1
  }

  return {
    blockMousedown,
    containerMousedown,
    focusData,
    lastSelectBlock
  }
}
