import {
  createVNode,
  defineComponent,
  reactive,
  render,
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  provide,
  inject
} from 'vue'

export const DropdownItem = defineComponent({
  props: {
    label: String,
    icon: String
  },
  setup(props) {
    const hideDropdown = inject('hideDropdown')
    const { icon, label } = props
    return () => (
      <div class="dropdown-item" onClick={hideDropdown}>
        <i class={icon}></i>
        <span>{label}</span>
      </div>
    )
  }
})

const DropdownComponent = defineComponent({
  props: {
    options: {
      type: Object
    }
  },
  setup(props, ctx) {
    const state = reactive({
      options: props.options,
      isShow: false,
      top: 0,
      left: 0
    })

    ctx.expose({
      showDropdown(options) {
        state.options = options
        state.isShow = true
        let { top, left, height } = options.el.getBoundingClientRect()
        state.top = top + height
        state.left = left
      }
    })

    provide('hideDropdown', () => (state.isShow = false))

    const classs = computed(() => [
      'dropdown',
      {
        'dropdown-show': state.isShow
      }
    ])

    const styles = computed(() => ({
      top: `${state.top}px`,
      left: `${state.left}px`
    }))

    const el = ref(null)

    const onMousedownBody = e => {
      if (!el.value.contains(e.target)) {
        state.isShow = false
      }
    }

    onMounted(() => {
      document.body.addEventListener('mousedown', onMousedownBody)
    })

    onBeforeUnmount(() => {
      document.body.removeEventListener('mousedown', onMousedownBody)
    })

    return () => {
      return (
        <div class={classs.value} style={styles.value} ref={el}>
          {state.options.content()}
        </div>
      )
    }
  }
})

let vm
export default options => {
  if (!vm) {
    const el = document.createElement('div')
    // 创建vnode并挂载到元素上
    vm = createVNode(DropdownComponent, { options })
    document.body.appendChild((render(vm, el), el))
  }
  const { showDropdown } = vm.component.exposed
  showDropdown(options)
}
