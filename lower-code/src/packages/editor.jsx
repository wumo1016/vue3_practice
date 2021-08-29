import { computed, defineComponent } from 'vue'
import './editor.scss'
import EditorBlock from './editor-block.jsx'

export default defineComponent({
  components: {
    EditorBlock
  },
  props: {
    modelValue: {
      type: Object
    }
  },
  setup(props) {
    const data = computed({
      get() {
        return props.modelValue
      }
    })

    const containerStyles = computed(() => ({
      width: data.value.container.width + 'px',
      height: data.value.container.height + 'px'
    }))

    return () => (
      <div class="editor">
        <div class="editor-left">左侧</div>
        <div class="editor-top">顶部</div>
        <div class="editor-container">
          <div class="editor-container__content" style={containerStyles.value}>
            {data.value.blocks.map(block => (
              <EditorBlock block={block} />
            ))}
          </div>
        </div>
        <div class="editor-right">右侧</div>
      </div>
    )
  }
})
