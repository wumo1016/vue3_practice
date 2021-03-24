<template>
  <div class="app_container">
    <!-- 按钮 -->
    <h3>Button按钮</h3>
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
        icon="wm-icon-search"
        type="primary"
      >带图标按钮</wm-button>
      <wm-button
        loading
        type="primary"
      >loading按钮</wm-button>
    </div>
    <h3>Button按钮组</h3>
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
    <h3>Layout布局</h3>
    <div class="module_wrapper layout_wrapper">
      <wm-row>
        <wm-col span="12" offset="2" class="bg-purple">1</wm-col>
        <wm-col span="12" offset="2" class="bg-purple-dark">2</wm-col>
        <wm-col span="12" offset="2">3</wm-col>
        <wm-col span="12" offset="2">4</wm-col>
      </wm-row>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup () {
    const handle = () => {
      console.log('click');
    }
    return {
      handle
    }
  }
})
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.app_container {
  padding: 20px;

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
    .wm-button-group{
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
}
</style>
