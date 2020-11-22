<template>
  <div class="normal_page home">
    <!-- 首页头部 -->
    {{ category }}
    <HomeHeader />
    <!-- 轮播图 -->
    <HomeSwiper />
    <!-- 课程列表 -->
    <HomeList />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import HomeHeader from './home-header.vue'
import HomeSwiper from './home-swiper.vue'
import HomeList from './home-list.vue'
import { useStore } from 'vuex'
import { GlobalState } from '@/store'
export default defineComponent({
  components: {
    HomeHeader,
    HomeSwiper,
    HomeList
  },
  setup() {
    const store = useStore<GlobalState>()
    const category = computed(() => {
      return store.state.home.currentCategory
    })
    return {
      category
    }
  }
})
</script>
