<template>
  <div class="home_header">
    <img src="@/assets/logo.png" alt="" />
    <van-dropdown-menu>
      <van-dropdown-item
        :modelValue="category"
        :options="options"
        @change="activeChange"
      />
    </van-dropdown-menu>
  </div>
</template>
<script lang="ts">
import { CATEGORY_TYPES } from '@/types/home'
import { defineComponent, PropType, reactive, toRefs } from 'vue'
export default defineComponent({
  props: {
    category: {
      type: Number as PropType<CATEGORY_TYPES> // 类型断言
    }
  },
  emits: ['set-current-category'],
  setup(props, ctx) {
    const state = reactive({
      options: [
        { text: '全部课程', value: CATEGORY_TYPES.ALL },
        { text: 'React课程', value: CATEGORY_TYPES.REACT },
        { text: 'Vue课程', value: CATEGORY_TYPES.VUE },
        { text: 'Node课程', value: CATEGORY_TYPES.NODE }
      ]
    })
    const activeChange = (value: CATEGORY_TYPES) => {
      ctx.emit('set-current-category', value)
    }
    return {
      ...toRefs(state),
      activeChange
    }
  }
})
</script>
<style lang="scss">
.home_header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 65px;
  background: #2a2a2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  img {
    height: 90%;
    width: auto;
  }
  .van-dropdown-menu__title {
    color: white;
  }
  .van-dropdown-menu__bar {
    background: #2a2a2a;
  }
}
</style>
