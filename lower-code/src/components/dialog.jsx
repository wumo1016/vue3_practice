import { createVNode, defineComponent, reactive, render } from 'vue'
import { ElDialog, ElInput, ElButton } from 'element-plus'

const DialogComponent = defineComponent({
  props: {
    options: {
      type: Object
    }
  },
  setup(props, ctx) {
    const state = reactive({
      options: props.options,
      dialogVisible: false
    })

    const hideDialog = () => (state.dialogVisible = false)

    const confirm = () => {
      hideDialog()
      state.options.confirm && state.options.confirm(state.options.content)
    }

    ctx.expose({
      showDialog(options) {
        state.dialogVisible = true
        state.options = options // 更新弹框选项
      }
    })

    return () => {
      return (
        <ElDialog title={state.options.title} v-model={state.dialogVisible}>
          {{
            default: () => (
              <ElInput
                type="textarea"
                v-model={state.options.content}
                autosize
              ></ElInput>
            ),
            footer: () =>
              state.options.footer && (
                <div>
                  <ElButton onClick={hideDialog}>取消</ElButton>
                  <ElButton type="primary" onClick={confirm}>
                    确定
                  </ElButton>
                </div>
              )
          }}
        </ElDialog>
      )
    }
  }
})

let vm
export default options => {
  if (!vm) {
    const el = document.createElement('div')
    // 创建vnode并挂载到元素上
    vm = createVNode(DialogComponent, { options })
    document.body.appendChild((render(vm, el), el))
  }
  const { showDialog } = vm.component.exposed
  showDialog(options)
}
