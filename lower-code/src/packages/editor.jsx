import { defineComponent, inject, ref, computed } from 'vue'
import './editor.scss'
import EditorBlock from './editor-block'
import deepcopy from 'deepcopy'
import { useDragger } from './useDragger'
import useFocus from './useFocus'
import useConDragger from './useConDragger'
import useCommand from './useCommand'
import $dialog from '../components/dialog'

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
    // 是否是预览状态 不能移动 可以操作
    const preview = ref(true)

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
      lastSelectBlock,
      clearBlockFocus
    } = useFocus(data, preview, e => {
      mousedown(e)
    })
    // 内容区拖拽
    const { mousedown, markline } = useConDragger(
      focusData,
      lastSelectBlock,
      data
    )

    const { commands } = useCommand(data)

    const buttons = [
      { label: '撤销', icon: 'icon-back', handler: () => commands.undo() },
      { label: '重做', icon: 'icon-forward', handler: () => commands.redo() },
      {
        label: '导出',
        icon: 'icon-export',
        handler: () => {
          $dialog({
            title: '导出json',
            content: JSON.stringify(data.value)
          })
        }
      },
      {
        label: '导入',
        icon: 'icon-import',
        handler: () => {
          $dialog({
            title: '导入json',
            content: '',
            footer: true,
            confirm(content) {
              commands.updateData(JSON.parse(content))
            }
          })
        }
      },
      {
        label: '置顶',
        icon: 'icon-place-top',
        handler: () => commands.placeTop(focusData)
      },
      {
        label: '置底',
        icon: 'icon-place-bottom',
        handler: () => commands.placeBottom(focusData)
      },
      {
        label: '删除',
        icon: 'icon-delete',
        handler: () => commands.delete(focusData)
      },
      {
        label: () => (preview.value ? '编辑' : '预览'),
        icon: () => (preview.value ? 'icon-edit' : 'icon-preview'),
        handler: () => {
          preview.value = !preview.value
          clearBlockFocus()
        }
      }
    ]

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
        <div class="editor-top">
          {buttons.map((btn, index) => {
            const icon = typeof btn.icon === 'function' ? btn.icon() : btn.icon
            const label =
              typeof btn.label === 'function' ? btn.label() : btn.label
            return (
              <div class="editor-top-button" onClick={btn.handler}>
                <i class={icon}></i>
                <span>{label}</span>
              </div>
            )
          })}
        </div>
        <div class="editor-container">
          <div
            class="editor-container__content"
            style={containerStyles.value}
            ref={containerRef}
            onMousedown={containerMousedown}
          >
            {markline.x !== null ? (
              <div class="line-x" style={{ left: markline.x + 'px' }}></div>
            ) : (
              ''
            )}
            {markline.y !== null ? (
              <div class="line-y" style={{ top: markline.y + 'px' }}></div>
            ) : (
              ''
            )}
            {data.value.blocks.map((block, index) => (
              <EditorBlock
                onMousedown={e => blockMousedown(e, block, index)}
                class={block.focus ? 'editor-block-focus' : ''}
                class={preview.value ? 'editor-block-preview' : ''}
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
