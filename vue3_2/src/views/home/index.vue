<template>
  <div class="normal_page home">
    <!-- 首页头部 -->
    {{ category }}
    <HomeHeader :category="category" @setCurrentCategory="setCurrentCategory" />
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
import { Store, useStore } from 'vuex'
import { GlobalState } from '@/store'
import { CATEGORY_TYPES } from '@/types/home'
import * as Types from '@/store/action-types'
// 分类相关
function useCategory(store: Store<GlobalState>) {
  const category = computed(() => store.state.home.currentCategory)
  const setCurrentCategory = (category: CATEGORY_TYPES) => {
    store.commit(`home/${Types.SET_CATEGORY}`, category)
  }
  return {
    category,
    setCurrentCategory
  }
}

export default defineComponent({
  components: {
    HomeHeader,
    HomeSwiper,
    HomeList
  },
  setup() {
    const store = useStore<GlobalState>()
    const { category, setCurrentCategory } = useCategory(store)

    return {
      category,
      setCurrentCategory
    }
  }
})
</script>
<style lang="scss">
.home {
  padding-top: 65px;
}
</style>
