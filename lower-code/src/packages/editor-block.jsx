import { computed, defineComponent, inject, onMounted, ref } from 'vue'

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

      return (
        <div ref={refBlock} class="editor-block" style={blockStyles.value}>
          {componentRender}
        </div>
      )
    }
  }
})
