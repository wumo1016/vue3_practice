<template>
  <div>
    <Create @handlePlan="handlePlan" />
  </div>
</template>

<script>
import Create from './create'
import { useStore } from 'vuex'
import * as types from '@/store/action-types'
export default {
  components: {
    Create
  },
  setup() {
    const store = useStore()
    const handlePlan = plan => {
      store.dispatch(types.ADD_PLAN, plan)
    }
    return {
      handlePlan
    }
  }
}
</script>

<style></style>
