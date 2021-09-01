import events from "./events"

export function useDragger(data, containerRef) {
  let currentComponent = null

  const dragenter = e => {
    e.dataTransfer.dropEffect = 'move' // h5拖动的图标
  }
  const dragover = e => {
    e.preventDefault()
  }
  const dragleave = e => {
    e.dataTransfer.dropEffect = 'none'
  }
  const drop = e => {
    data.value = {
      ...data.value,
      blocks: [
        ...data.value.blocks,
        {
          top: e.offsetY,
          left: e.offsetX,
          zIndex: 1,
          key: currentComponent.key,
          alignCenter: true // 松手的时候居中
        }
      ]
    }
    currentComponent = null
  }

  const dragstart = (e, component) => {
    const dom = containerRef.value
    dom.addEventListener('dragenter', dragenter)
    dom.addEventListener('dragover', dragover)
    dom.addEventListener('dragleave', dragleave)
    dom.addEventListener('drop', drop)
    currentComponent = component
    events.emit('start')
  }

  const dragend = e => {
    const dom = containerRef.value
    dom.removeEventListener('dragenter', dragenter)
    dom.removeEventListener('dragover', dragover)
    dom.removeEventListener('dragleave', dragleave)
    dom.removeEventListener('drop', drop)
    events.emit('end')
  }

  return {
    dragstart,
    dragend
  }
}
