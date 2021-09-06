import { defineComponent, inject } from 'vue'
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
    data: { type: Object }
  },
  setup(props) {
    const config = inject('config')
    return () => {
      let content = []
      if (!props.block) {
        content.push(
          <>
            <el-form-item label="容器宽度">
              <el-input-number></el-input-number>
            </el-form-item>
            <el-form-item label="容器高度">
              <el-input-number></el-input-number>
            </el-form-item>
          </>
        )
      } else {
        let component = config.componentMap[props.block.key]
        if (component && component.props) {
          content.push(
            Object.entries(component.props).map(([key, config]) => {
              return (
                <el-form-item label={config.label}>
                  {{
                    input: () => <el-input></el-input>,
                    color: () => <el-color-picker></el-color-picker>,
                    select: () => (
                      <el-select>
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
      }
      return (
        <el-form labelPosition="top" style="padding:30px">
          {content}
          <el-form-item>
            <el-button type="primary">应用</el-button>
            <el-button>充值</el-button>
          </el-form-item>
        </el-form>
      )
    }
  }
})
