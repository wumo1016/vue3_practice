import { defineComponent, computed } from 'vue'
import deepcopy from '_deepcopy@2.1.0@deepcopy'
import { ElButton } from 'element-plus'
import $tableDialog from '../components/table-dialog'

export default defineComponent({
  props: {
    config: {
      type: Object
    },
    modelValue: {
      type: Array
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const data = computed({
      get() {
        return props.modelValue
      },
      set(newValue) {
        ctx.emit('update:modelValue', deepcopy(newValue))
      }
    })
    const add = () => {
      $tableDialog({
        title: '下拉选项',
        config: props.config,
        data: data.value,
        onConfirm(value) {
          data.value = value
        }
      })
    }
    return () => {
      return (
        <div>
          {(!data.value || data.value.length == 0) && (
            <ElButton onClick={add}>添加</ElButton>
          )}
        </div>
      )
    }
  }
})
