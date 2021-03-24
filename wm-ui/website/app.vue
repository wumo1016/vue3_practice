<template>
  <div class="app_container">
    <!-- 按钮 -->
    <h3>Button按钮</h3>
    <div class="module_wrapper">
      <div>
        <wm-button @click="handle">普通按钮</wm-button>
        <wm-button disabled @click="handle">禁用按钮</wm-button>
        <wm-button type="primary">主要按钮</wm-button>
        <wm-button type="success">成功按钮</wm-button>
        <wm-button type="info">信息按钮</wm-button>
        <wm-button type="warning">警告按钮</wm-button>
        <wm-button type="danger">危险按钮</wm-button>
        <wm-button icon="wm-icon-search">带图标按钮</wm-button>
        <wm-button loading>loading按钮</wm-button>
      </div>
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
}
h3 {
  margin: 10px 0;
}
.module_wrapper {
  border: 1px solid rgb(216, 216, 216);
  padding: 20px;
  button {
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
