<template>
  <div class="home_swiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in sliderList" :key="item.url">
        <img :src="item.url" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import * as Types from '@/store/action-types'
import { useStore } from 'vuex'
import { GlobalState } from '@/store'

export default defineComponent({
  // setup 默认是不能加 async 的,如果加了就要配合异步组件 Suspense 使用
  async setup() {
    const store = useStore<GlobalState>()
    const sliderList = computed(() => store.state.home.sliders)
    if (sliderList.value.length === 0) {
      await store.dispatch(`home/${Types.SET_SLIDER_LIST}`)
    }
    await store.dispatch(`home/${Types.SET_SLIDER_LIST}`)
    return {
      sliderList
    }
  }
})
</script>
<style lang="scss">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 200px;
  text-align: center;
  background-color: #39a9ed;
  overflow: hidden;
  img {
    width: auto;
    height: 100%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
