import { reactive } from 'vue'

export default (focusData, lastSelectBlock, data) => {
  let drapState = {}
  // 参考的位置
  let markline = reactive({
    x: null,
    y: null
  })
  // 被拖动元素B 参考元素A
  const mousedown = e => {
    const { width: BWidth, height: BHeight } = lastSelectBlock.value

    drapState = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: lastSelectBlock.value.left, // 被拖动元素 left
      startTop: lastSelectBlock.value.top, // 被拖动元素 top
      startPos: focusData.value.focus.map(({ top, left }) => ({ top, left })),
      lines: (() => {
        // 拿到所有没有选中的组件
        const { unFocus } = focusData.value
        let lines = { left: [], top: [] }
        ;[
          ...unFocus,
          {
            top: 0,
            left: 0,
            width: data.value.container.width,
            height: data.value.container.height
          }
        ].forEach(block => {
          const {
            top: ATop,
            left: ALeft,
            width: AWidth,
            height: AHeight
          } = block
          /* 水平辅助线 计算top */

          // B底对A顶
          lines.top.push({ showTop: ATop, top: ATop - BHeight })
          // B顶对A顶
          lines.top.push({ showTop: ATop, top: ATop })
          // 中间对中间
          lines.top.push({
            showTop: ATop + AHeight / 2,
            top: ATop - (BHeight / 2 - AHeight / 2)
          })
          // B底对A底
          lines.top.push({
            showTop: ATop + AHeight,
            top: ATop - (BHeight - AHeight)
          })
          // B顶对A底
          lines.top.push({
            showTop: ATop + AHeight,
            top: ATop + AHeight
          })

          /* 垂直辅助线 计算left */
          // B右对A左
          lines.left.push({
            showLeft: ALeft,
            left: ALeft - BWidth
          })
          // B左对A左
          lines.left.push({
            showLeft: ALeft,
            left: ALeft
          })
          // B中对A中
          lines.left.push({
            showLeft: ALeft - (BWidth / 2 - AWidth / 2),
            left: ALeft
          })
          // B右对A右
          lines.left.push({
            showLeft: ALeft + AWidth,
            left: ALeft - (BWidth - AWidth)
          })
          // B左对A右
          lines.left.push({
            showLeft: ALeft + AWidth,
            left: ALeft + AWidth
          })
        })
        return lines
      })()
    }
    document.addEventListener('mouseover', mouseover)
    document.addEventListener('mouseup', mouseup)
  }
  const mouseover = e => {
    let { clientX: endClientX, clientY: endClientY } = e
    let {
      startX: startClientX,
      startY: startClientY,
      startLeft,
      startTop
    } = drapState
    // 鼠标移动的距离
    let moveX = endClientX - startClientX
    let moveY = endClientY - startClientY

    // 计算被拖动元素最新的位置
    let left = moveX + startLeft
    let top = moveY + startTop

    let marklineY = null
    let marklineX = null
    for (let i = 0; i < drapState.lines.top.length; i++) {
      const target = drapState.lines.top[i]
      if (Math.abs(target.top - top) < 5) {
        moveY = target.top - startTop
        marklineY = target.showTop
        break
      }
    }

    for (let i = 0; i < drapState.lines.left.length; i++) {
      const target = drapState.lines.left[i]
      if (Math.abs(target.left - left) < 5) {
        moveX = target.left - startLeft
        marklineX = target.showLeft
        break
      }
    }

    markline.x = marklineX
    markline.y = marklineY

    focusData.value.focus.forEach((block, idx) => {
      block.left = drapState.startPos[idx].left + moveX
      block.top = drapState.startPos[idx].top + moveY
    })
  }
  const mouseup = () => {
    markline.x = null
    markline.y = null
    document.removeEventListener('mousedown', mousedown)
    document.removeEventListener('mouseup', mouseup)
    document.removeEventListener('mouseover', mouseover)
  }

  return {
    mousedown,
    markline
  }
}
