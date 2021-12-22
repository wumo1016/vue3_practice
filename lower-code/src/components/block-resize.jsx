import { defineComponent } from 'vue'

const BlockResize = defineComponent({
  props: {
    block: {
      type: Object
    },
    component: {
      type: Object
    }
  },
  setup(props) {
    const { width, height } = props.component.resize || {}

    let data = {}
    const onmousemove = e => {
      let { clientX, clientY } = e
      const {
        startX,
        startY,
        startWidth,
        startHeight,
        startLeft,
        startTop,
        direction
      } = data

      // 针对中间点拖拽只改变一个方向
      if (direction.horizontal === 'center') {
        clientX = startX
      }
      if (direction.vertical === 'center') {
        clientY = startY
      }

      let durX = clientX - startX
      let durY = clientY - startY

      // 针对反向拖拽处理
      if (direction.vertical === 'start') {
        durY = -durY
        props.block.top = startTop - durY
      }
      if (direction.horizontal === 'start') {
        durX = -durX
        props.block.left = startLeft - durX
      }

      const endWidth = startWidth + durX
      const endHeight = startHeight + durY

      props.block.width = endWidth
      props.block.height = endHeight

      props.block.hasResize = true // 修改了宽高
    }
    const onmouseup = () => {
      document.body.removeEventListener('mousemove', onmousemove)
      document.body.removeEventListener('mouseup', onmouseup)
    }
    const onmousedown = (e, direction) => {
      e.stopPropagation() // 阻止冒泡
      data = {
        startX: e.clientX,
        startY: e.clientY,
        startWidth: props.block.width,
        startHeight: props.block.height,
        startLeft: props.block.left,
        startTop: props.block.top,
        direction
      }
      document.body.addEventListener('mousemove', onmousemove)
      document.body.addEventListener('mouseup', onmouseup)
    }
    return () => (
      <>
        {width && (
          <>
            <div
              class="block-resize block-resize-left"
              onMousedown={e =>
                onmousedown(e, { horizontal: 'start', vertical: 'center' })
              }
            ></div>
            <div
              class="block-resize block-resize-right"
              onMousedown={e =>
                onmousedown(e, { horizontal: 'end', vertical: 'center' })
              }
            ></div>
          </>
        )}
        {height && (
          <>
            <div
              class="block-resize block-resize-top"
              onMousedown={e =>
                onmousedown(e, { horizontal: 'center', vertical: 'start' })
              }
            ></div>
            <div
              class="block-resize block-resize-bottom"
              onMousedown={e =>
                onmousedown(e, { horizontal: 'center', vertical: 'end' })
              }
            ></div>
          </>
        )}
        {width && height && (
          <>
            <div
              class="block-resize block-resize-top-left"
              onMousedown={e =>
                onmousedown(e, { horizontal: 'start', vertical: 'start' })
              }
            ></div>
            <div
              class="block-resize block-resize-top-right"
              onMousedown={e =>
                onmousedown(e, { horizontal: 'end', vertical: 'start' })
              }
            ></div>
            <div
              class="block-resize block-resize-bottom-left"
              onMousedown={e =>
                onmousedown(e, { horizontal: 'start', vertical: 'end' })
              }
            ></div>
            <div
              class="block-resize block-resize-bottom-right"
              onMousedown={e =>
                onmousedown(e, { horizontal: 'end', vertical: 'end' })
              }
            ></div>
          </>
        )}
      </>
    )
  }
})

export default BlockResize
