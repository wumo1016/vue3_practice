import { createVNode, defineComponent, reactive, render } from 'vue'
import {
  ElDialog,
  ElButton,
  ElTable,
  ElTableColumn,
  ElInput
} from 'element-plus'
import deepcopy from '_deepcopy@2.1.0@deepcopy'

const TableDialog = defineComponent({
  props: {
    options: {
      type: Object
    }
  },
  setup(props, ctx) {
    const state = reactive({
      options: props.options,
      dialogVisible: false,
      tableData: []
    })

    const hideDialog = () => (state.dialogVisible = false)

    const confirm = () => {
      hideDialog()
      state.options.confirm && state.options.confirm(state.tableData)
    }

    ctx.expose({
      showDialog(options) {
        state.dialogVisible = true
        state.options = options // 更新弹框选项
        state.tableData = deepcopy(options.data)
      }
    })

    const addData = () => {
      state.tableData.push({})
    }

    return () => {
      return (
        <ElDialog title={state.options.title} v-model={state.dialogVisible}>
          {{
            default: () => (
              <div>
                <div>
                  <ElButton onClick={addData}>添加</ElButton>
                  <ElButton>重置</ElButton>
                </div>
                <ElTable data={state.tableData}>
                  <ElTableColumn type="index" label="序号"></ElTableColumn>
                  {state.options.config.table.options.map((item, index) => {
                    return (
                      <ElTableColumn label={item.label}>
                        {{
                          default: ({ row }) => (
                            <ElInput v-model={row[item.field]}></ElInput>
                          )
                        }}
                      </ElTableColumn>
                    )
                  })}
                  <ElTableColumn label="操作">
                    <ElButton type="danger">删除</ElButton>
                  </ElTableColumn>
                </ElTable>
              </div>
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
    vm = createVNode(TableDialog, { options })
    document.body.appendChild((render(vm, el), el))
  }
  const { showDialog } = vm.component.exposed
  showDialog(options)
}
