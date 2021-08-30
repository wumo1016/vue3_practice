import { computed, defineComponent, inject, nextTick, ref } from 'vue'
import './editor.scss'
import EditorBlock from './editor-block.jsx'
import deepcopy from 'deepcopy'
import { useDragger } from './useDragger'

export default defineComponent({
  components: {
    EditorBlock
  },
  props: {
    modelValue: {
      type: Object
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const data = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        ctx.emit('update:modelValue', deepcopy(value))
      }
    })

    const containerStyles = computed(() => ({
      width: data.value.container.width + 'px',
      height: data.value.container.height + 'px'
    }))
    // 组件配置
    const config = inject('config')
    // 容器dom
    const containerRef = ref(null)

    // 清空所有的聚焦
    const clearBlockFocus = () => {
      data.value.blocks.forEach(block => {
        block.focus = false
      })
    }
    // 拖拽事件 从左侧拖到内容区
    const { dragstart, dragend } = useDragger(data, containerRef)
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
    }
    // 内容区的鼠标点击事件
    const containerMousedown = e => {
      clearBlockFocus()
    }

    return () => (
      <div class="editor">
        <div class="editor-left">
          {config.componentList.map(component => {
            return (
              <div
                class="editor-left-item"
                draggable
                onDragstart={e => dragstart(e, component)}
                onDragend={e => dragend(e, component)}
              >
                <span>{component.label}</span>
                <div>{component.preview()}</div>
              </div>
            )
          })}
        </div>
        <div class="editor-top">顶部</div>
        <div class="editor-container">
          <div
            class="editor-container__content"
            style={containerStyles.value}
            ref={containerRef}
            onMousedown={containerMousedown}
          >
            {data.value.blocks.map(block => (
              <EditorBlock
                onMousedown={e => blockMousedown(e, block)}
                class={block.focus ? 'editor-block-focus' : ''}
                block={block}
              />
            ))}
          </div>
        </div>
        <div class="editor-right">右侧</div>
      </div>
    )
  }
})
