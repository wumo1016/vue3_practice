<template>
  <div class="app_container">
    <!-- 按钮 -->
    <h3>Button 按钮</h3>
    <div class="module_wrapper button_wrapper">
      <wm-button>默认按钮</wm-button>
      <wm-button
        type="primary"
        disabled
      >禁用按钮</wm-button>
      <wm-button type="primary">主要按钮</wm-button>
      <wm-button type="success">成功按钮</wm-button>
      <wm-button type="info">信息按钮</wm-button>
      <wm-button type="warning">警告按钮</wm-button>
      <wm-button type="danger">危险按钮</wm-button>
      <wm-button
        type="primary"
        round
      >圆角按钮</wm-button>
      <wm-button
        icon="wm-icon-search"
        type="primary"
      >带图标按钮</wm-button>
      <wm-button
        loading
        type="primary"
      >loading按钮</wm-button>
    </div>
    <h3>Button 按钮组</h3>
    <div class="module_wrapper button_group_wrapper">
      <wm-button-group>
        <wm-button type="primary">前进</wm-button>
        <wm-button type="primary">返回</wm-button>
      </wm-button-group>
      <wm-button-group>
        <wm-button type="primary">第一页</wm-button>
        <wm-button type="primary">第二页</wm-button>
        <wm-button type="primary">第三页</wm-button>
      </wm-button-group>
    </div>
    <!-- 布局 -->
    <h3>Layout 布局</h3>
    <div class="module_wrapper layout_wrapper">
      <wm-row>
        <wm-col span="24">
          <div class="bg-purple-dark">1</div>
        </wm-col>
      </wm-row>
      <wm-row>
        <wm-col span="12">
          <div class="bg-purple">1</div>
        </wm-col>
        <wm-col span="12">
          <div class="bg-purple-dark">1</div>
        </wm-col>
      </wm-row>
      <wm-row>
        <wm-col
          span="10"
          offset="2"
        >
          <div class="bg-purple">1</div>
        </wm-col>
        <wm-col
          span="10"
          offset="2"
        >
          <div class="bg-purple-dark">1</div>
        </wm-col>
      </wm-row>
      <wm-row gutter="10">
        <wm-col span="12">
          <div class="bg-purple">1</div>
        </wm-col>
        <wm-col span="12">
          <div class="bg-purple">1</div>
        </wm-col>
      </wm-row>
      <wm-row
        gutter="10"
        justify="space-between"
      >
        <wm-col span="4">
          <div class="bg-purple">1</div>
        </wm-col>
        <wm-col span="4">
          <div class="bg-purple">1</div>
        </wm-col>
      </wm-row>
    </div>
    <!-- checkbox -->
    <h3>Checkbox 多选框</h3>
    <div class="module_wrapper checkbox_wrapper">
      <wm-checkbox v-model="checkValue">选项一{{ checkValue }}</wm-checkbox>
    </div>
    <h3>CheckboxGroup 多选框组</h3>
    <div class="module_wrapper checkbox_group_wrapper">
      {{ checkGroupValue }}
      <wm-checkbox-group v-model="checkGroupValue">
        <wm-checkbox label="上海"></wm-checkbox>
        <wm-checkbox label="北京"></wm-checkbox>
        <wm-checkbox label="天津"></wm-checkbox>
      </wm-checkbox-group>
    </div>
    <!-- transfer -->
    <h3>Transfer 穿梭框</h3>
    <div class="module_wrapper transfer_wrapper">
      <wm-transfer
        :data="transferData"
        v-model="transferValue"
        :props="transferProp"
      ></wm-transfer>
    </div>
    <!-- message -->
    <h3>Message 消息提示</h3>
    <div class="module_wrapper message_wrapper">
      <wm-button
        type="primary"
        @click="showMessage('success', '成功')"
      >成功</wm-button>
      <wm-button
        type="primary"
        @click="showMessage('warning', '警告')"
      >警告</wm-button>
      <wm-button
        type="primary"
        @click="showMessage('info', '消息')"
      >消息</wm-button>
      <wm-button
        type="primary"
        @click="showMessage('error', '错误')"
      >错误</wm-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Message from '../packages/message'

function useCheckbox() {
  const checkValue = ref(true)
  const checkGroupValue = ref([
    '上海',
    '北京',
    // '天津',
  ])

  const transferData = () => {
    const data = []
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `备选项 ${i}`,
        disabled: i % 4 === 0,
      })
    }
    return ref(data)
  }
  const transferValue = ref([1, 4])

  return {
    checkValue,
    checkGroupValue,
    transferData: transferData(),
    transferValue,
    transferProp: {
      key: 'key',
      label: 'label',
      disabled: 'disabled',
    },
  }
}

export default defineComponent({
  setup() {
    const handle = (value) => {
      console.log('change', value)
    }

    const showMessage = (type, message) => {
      Message({ type, message })
    }

    return {
      handle,
      ...useCheckbox(),
      showMessage,
    }
  },
})
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

html,
body {
  height: 100%;
  font-size: 14px;
}

#app {
  height: 100%;
  overflow-y: auto;
}

.app_container {
  padding: 20px;
  padding-bottom: 700px;

  h3 {
    margin: 10px 0;
  }

  .module_wrapper {
    border: 1px solid rgb(223, 223, 223);
    padding: 20px;
    border-radius: 4px;
  }

  .button_wrapper {
    .wm-button {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
  .button_group_wrapper {
    .wm-button-group {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
  .layout_wrapper {
    .bg-purple {
      background: #d3dce6;
    }

    .bg-purple-dark {
      background: #99a9bf;
    }

    .wm-row {
      line-height: 36px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    .wm-col {
      overflow: hidden;
      > div {
        border-radius: 4px;
      }
    }
  }
  .checkbox_group_wrapper {
    .wm-checkbox {
      margin-right: 10px;
    }
  }
  .message_wrapper {
    .wm-button {
      margin-right: 5px;
    }
  }
}
</style>
