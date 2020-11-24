import { CATEGORY_TYPES, Lesson } from '@/types/home'

export const sliderList = [
  { url: 'http://img.zhufengpeixun.cn/zfjgk.png' },
  { url: 'http://img.zhufengpeixun.cn/zhufengquanzhan.jpg' },
  { url: 'http://www.zhufengpeixun.cn/images/webpackxiaoke.jpeg' },
  { url: 'http://www.zhufengpeixun.cn/skin/20142/img/10banner.jpg?v=1' },
  { url: 'http://www.zhufengpeixun.cn/images/jsbanner.jpg' }
]

const lessons = {
  1: Array(6)
    .fill('')
    .map((v, index) => {
      return {
        title: `react课程${index + 1}`,
        img: 'http://img.zhufengpeixun.cn/6.vue.png',
        price: 123,
        category: 1
      }
    }),
  2: Array(6)
    .fill('')
    .map((v, index) => {
      return {
        title: `vue课程${index + 1}`,
        img: 'http://img.zhufengpeixun.cn/7.react.png',
        price: 123,
        category: 2
      }
    }),
  3: Array(6)
    .fill('')
    .map((v, index) => {
      return {
        title: `node课程${index + 1}`,
        img: 'http://img.zhufengpeixun.cn/4.nodey.png',
        price: 123,
        category: 3
      }
    })
}

export const getLessons = (type: CATEGORY_TYPES, offset = 0, limit = 5) => {
  let allLessons: Lesson[] = [],
    lessonList: Lesson[] = [],
    currentLessonList: Lesson[] = [],
    hasMore = true
  Object.values(lessons).map(item => {
    allLessons = allLessons.concat(item)
  })

  if (type === CATEGORY_TYPES.ALL) {
    lessonList = allLessons
  } else {
    lessonList = lessons[type]
  }

  const length = lessonList.length

  if (length <= offset + limit) {
    hasMore = false
    currentLessonList = lessonList.slice(offset, length - 1)
  } else {
    currentLessonList = lessonList.slice(offset, offset + limit)
  }

  return {
    hasMore,
    loading: true,
    offset,
    limit,
    list: currentLessonList
  }
}
