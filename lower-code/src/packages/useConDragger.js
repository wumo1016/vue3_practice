export default focusData => {
  let drapState = {}
  const mousedown = e => {
    drapState = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: focusData.value.focus.map(({ top, left }) => ({ top, left }))
    }
    document.addEventListener('mouseover', mouseover)
    document.addEventListener('mouseup', mouseup)
  }
  const mouseover = e => {
    let { clientX, clientY } = e
    let { startX, startY } = drapState
    let moveX = clientX - startX
    let moveY = clientY - startY
    focusData.value.focus.forEach((block, idx) => {
      block.left = drapState.startPos[idx].left + moveX
      block.top = drapState.startPos[idx].top + moveY
    })
  }
  const mouseup = () => {
    document.removeEventListener('mousedown', mousedown)
    document.removeEventListener('mouseup', mouseup)
    document.removeEventListener('mouseover', mouseover)
  }

  return {
    mousedown
  }
}
