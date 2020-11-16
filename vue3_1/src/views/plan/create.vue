<template>
  <a-form :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
    <a-form-item label="请选择日期">
      <a-date-picker
        v-model:value="form.date"
        show-time
        format="YYYY-MM-DD"
        type="date"
        placeholder="请选择日期"
        style="width: 100%;"
      />
    </a-form-item>
    <a-form-item label="请选择耗时">
      <a-input-number
        v-model:value="form.time"
        :min="1"
        :max="10"
        @change="onChange"
      />
    </a-form-item>
    <a-form-item label="请输入待办事项">
      <a-textarea v-model:value="form.content" showCount :maxlength="100" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="onSubmit">创建任务</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { reactive, toRefs } from 'vue'
import moment from 'moment'
export default {
  setup(props, ctx) {
    const state = reactive({
      form: {
        date: moment(Date.now()).format('YYYY-MM-DD'),
        time: 0,
        content: ''
      }
    })
    const onSubmit = () => {
      ctx.emit('handle-plan', state.form)
    }
    return {
      ...toRefs(state),
      onSubmit
    }
  }
}
</script>
