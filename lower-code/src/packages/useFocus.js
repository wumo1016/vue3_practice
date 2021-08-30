import { computed } from 'vue'

export default (data, callback) => {
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
  const blockMousedown = (e, block) => {
    e.preventDefault()
    e.stopPropagation()
    // 定义当前component是否聚焦
    // 如果没有按下shift键 就直接清空
    if (block.focus) {
      block.focus = false
    } else {
      if (!e.shiftKey) {
        clearBlockFocus()
      }
      block.focus = true
    }
    callback(e)
  }
  // 内容区的鼠标点击事件
  const containerMousedown = e => {
    clearBlockFocus()
  }

  return {
    blockMousedown,
    containerMousedown,
    focusData
  }
}
