import { GlobalState } from '@/store'
import { computed, onMounted, Ref } from 'vue'
import { Store } from 'vuex'
import _ from 'lodash'

export function useLoadMore(
  refEl: Ref<null | HTMLElement>,
  store: Store<GlobalState>,
  type: string
) {
  let ele: HTMLElement
  function loadMore() {
    // 获取可视区域高度 卷起的高度 整个高度
    const containerHeight = ele.clientHeight
    const scrollTop = ele.scrollTop
    const scrollHeight = ele.offsetHeight
    if (containerHeight + scrollTop + 20 >= scrollHeight) {
      store.dispatch(type)
    }
  }
  onMounted(() => {
    ele = refEl.value as HTMLElement
    ele.addEventListener('scroll', _.debounce(loadMore, 200))
  })

  const isLoading = computed(() => store.state.home.lessons.loading)
  const hasMore = computed(() => store.state.home.lessons.hasMore)

  return {
    isLoading,
    hasMore
  }
}
