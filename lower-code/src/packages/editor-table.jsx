import { defineComponent, computed } from 'vue'
import deepcopy from '_deepcopy@2.1.0@deepcopy'
import { ElButton } from 'element-plus'

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
    return () => {
      return (
        <div>
          {(!data.value || data.value.length == 0) && <ElButton>添加</ElButton>}
        </div>
      )
    }
  }
})
