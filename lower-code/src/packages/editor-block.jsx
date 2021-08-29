import { computed, defineComponent, inject } from 'vue'

export default defineComponent({
  props: {
    block: {
      type: Object
    }
  },
  setup(props) {
    const config = inject('config')
    // console.log(config)

    const blockStyles = computed(() => ({
      top: `${props.block.top}px`,
      left: `${props.block.left}px`,
      zIndex: `${props.block.zIndex}`,
      width: '200px',
      height: '50px'
    }))

    return () => {
      const component = config.componentMap[props.block.key]
      const componentRender = component.render

      return (
        <div class="editor-block" style={blockStyles.value}>
          {componentRender()}
        </div>
      )
    }
  }
})
