import { defineComponent, inject, ref, computed } from 'vue'
import './editor.scss'
import EditorBlock from './editor-block.jsx'
import deepcopy from 'deepcopy'
import { useDragger } from './useDragger'
import useFocus from './useFocus'
import useConDragger from './useConDragger'

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
    // 容器宽高
    const containerStyles = computed(() => ({
      width: data.value.container.width + 'px',
      height: data.value.container.height + 'px'
    }))
    // 组件配置
    const config = inject('config')
    // 容器dom
    const containerRef = ref(null)

    // 拖拽事件 从左侧拖到内容区
    const { dragstart, dragend } = useDragger(data, containerRef)
    // 聚焦事件
    const {
      blockMousedown,
      containerMousedown,
      focusData,
      lastSelectBlock
    } = useFocus(data, e => {
      mousedown(e)
    })
    // 内容区拖拽
    const { mousedown } = useConDragger(focusData, lastSelectBlock)

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
            {data.value.blocks.map((block, index) => (
              <EditorBlock
                onMousedown={e => blockMousedown(e, block, index)}
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
