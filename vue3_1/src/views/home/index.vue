<template>
  <div>
    <div v-for="item in planList" :key="item._id">
      <span style="margin-right: 10px">{{ item.date }}</span>
      <span style="margin-right: 10px">{{ item.time }}</span>
        <span>{{ item.content }}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs } from 'vue'
import { useStore } from 'vuex'
import * as types from '@/store/action-types'
export default {
  setup() {
    const store = useStore()
    onMounted(() => {
      store.dispatch(types.SET_PLAN_LIST)
    })
    return {
      ...toRefs(store.state)
    }
  }
}
</script>

<style></style>
