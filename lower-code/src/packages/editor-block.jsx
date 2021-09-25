import { computed, defineComponent, inject, onMounted, ref } from 'vue'
import BlockResize from '../components/block-resize'

export default defineComponent({
  props: {
    block: {
      type: Object
    },
    formData: {
      type: Object
    }
  },
  setup(props) {
    const config = inject('config')

    const refBlock = ref(null)

    onMounted(() => {
      let { offsetHeight, offsetWidth } = refBlock.value
      if (props.block.alignCenter) {
        props.block.left = props.block.left - offsetWidth / 2
        props.block.top = props.block.top - offsetHeight / 2
        props.block.alignCenter = false
      }
      props.block.width = offsetWidth
      props.block.height = offsetHeight
    })

    const blockStyles = computed(() => ({
      top: `${props.block.top}px`,
      left: `${props.block.left}px`,
      zIndex: `${props.block.zIndex}`
    }))

    return () => {
      const component = config.componentMap[props.block.key]
      const componentRender = component.render({
        size: props.block.hasResize
          ? {
              width: props.block.width,
              height: props.block.height
            }
          : {},
        props: props.block.props,
        model: Object.keys(component.model || {}).reduce((prev, modelName) => {
          const propName = props.block.model[modelName]
          prev[modelName] = {
            modelValue: props.formData[propName],
            'onUpdate:modelValue': v => (props.formData[propName] = v)
          }
          return prev
        }, {})
      })
      const { width, height } = component.resize || {}

      return (
        <div ref={refBlock} class="editor-block" style={blockStyles.value}>
          {componentRender}
          {/* 传递block是为了修改当前block的宽高 传递component是为了明确修改宽还是高*/}
          {props.block.focus && (width || height) && (
            <BlockResize block={props.block} component={component} />
          )}
        </div>
      )
    }
  }
})
