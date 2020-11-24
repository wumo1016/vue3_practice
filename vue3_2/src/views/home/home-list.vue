<template>
  <div class="home_list">
    <van-card
      v-for="(item, index) in lessonList"
      :key="`${item.category}${index}`"
      :price="item.price"
      :title="item.title"
      :thumb="item.img"
    >
      <template #tags>
        <van-tag plain type="danger">{{
          filterCategory(item.category)
        }}</van-tag>
      </template>
    </van-card>
  </div>
</template>
<script lang="ts">
import { Lesson } from '@/types/home'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    lessonList: {
      type: Array as PropType<Lesson[]>
    }
  },
  setup() {
    const filterCategory = (type: number) => {
      switch (type) {
        case 1:
          return 'react课程'
        case 2:
          return 'vue课程'
        case 3:
          return 'node课程'
        default:
          break
      }
    }
    return {
      filterCategory
    }
  }
})
</script>
