import { computed, defineComponent, inject, onMounted, ref } from 'vue'

export default defineComponent({
  props: {
    block: {
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
    })

    const blockStyles = computed(() => ({
      top: `${props.block.top}px`,
      left: `${props.block.left}px`,
      zIndex: `${props.block.zIndex}`
    }))

    return () => {
      const component = config.componentMap[props.block.key]
      const componentRender = component.render

      return (
        <div ref={refBlock} class="editor-block" style={blockStyles.value}>
          {componentRender()}
        </div>
      )
    }
  }
})
