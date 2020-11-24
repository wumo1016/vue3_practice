<template>
  <div class="normal_page home">
    <!-- 首页头部 -->
    <HomeHeader :category="category" @setCurrentCategory="setCurrentCategory" />
    <!-- 轮播图 -->
    <!-- 内置异步组件 Suspense -->
    <Suspense>
      <template #default>
        <HomeSwiper />
      </template>
      <template #fallback>
        <div>loading...</div>
      </template>
    </Suspense>
    <!-- 课程列表 -->
    <HomeList :lessonList="lessonList" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import HomeHeader from './home-header.vue'
import HomeSwiper from './home-swiper.vue'
import HomeList from './home-list.vue'
import { Store, useStore } from 'vuex'
import { GlobalState } from '@/store'
import * as Types from '@/store/action-types'
import { CATEGORY_TYPES } from '@/types/home'
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
// 列表相关
function useLessonList(store: Store<GlobalState>) {
  const lessonList = computed(() => store.state.home.lessons.list)
  onMounted(async () => {
    if (lessonList.value.length === 0) {
      await store.dispatch(`home/${Types.SET_LESSON_LIST}`)
    }
  })
  return {
    lessonList
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
    const { lessonList } = useLessonList(store)
    return {
      category,
      setCurrentCategory,
      lessonList
    }
  }
})
</script>
<style lang="scss">
.home {
  margin-top: 65px;
}
</style>
