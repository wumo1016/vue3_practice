import { defineComponent, inject, reactive, watch } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElButton,
  ElInput,
  ElColorPicker,
  ElSelect,
  ElOption
} from 'element-plus'

export default defineComponent({
  props: {
    block: { type: Object },
    data: { type: Object },
    updateContainer: { type: Function },
    updateBlock: { type: Function }
  },
  setup(props) {
    const config = inject('config')
    const state = reactive({
      editData: {}
    })

    const reset = () => {
      if (props.block) {
        state.editData = { ...(props.block.props || {}) }
      } else {
        state.editData = { ...props.data.container }
      }
    }
    watch(() => props.block, reset, { immediate: true })

    const apply = () => {
      if (props.block) {
        props.updateBlock(
          {
            ...props.block,
            props: state.editData
          },
          props.block
        )
      } else {
        props.updateContainer({
          ...props.data,
          container: state.editData
        })
      }
    }

    return () => {
      let content = []
      if (props.block) {
        let component = config.componentMap[props.block.key]
        if (component && component.props) {
          content.push(
            Object.entries(component.props).map(([key, config]) => {
              return (
                <el-form-item label={config.label}>
                  {{
                    input: () => (
                      <el-input v-model={state.editData[key]}></el-input>
                    ),
                    color: () => (
                      <el-color-picker
                        v-model={state.editData[key]}
                      ></el-color-picker>
                    ),
                    select: () => (
                      <el-select v-model={state.editData[key]}>
                        {config.options.map(item => (
                          <el-option
                            label={item.label}
                            value={item.value}
                          ></el-option>
                        ))}
                      </el-select>
                    )
                  }[config.type]()}
                </el-form-item>
              )
            })
          )
        }
      } else {
        content.push(
          <>
            <el-form-item label="容器宽度">
              <el-input-number v-model={state.editData.width} />
            </el-form-item>
            <el-form-item label="容器高度">
              <el-input-number v-model={state.editData.height} />
            </el-form-item>
          </>
        )
      }
      return (
        <el-form labelPosition="top" style="padding:30px">
          {content}
          <el-form-item>
            <el-button type="primary" onClick={() => apply()}>
              应用
            </el-button>
            <el-button onClick={reset}>重置</el-button>
          </el-form-item>
        </el-form>
      )
    }
  }
})
