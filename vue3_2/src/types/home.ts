export interface Slider {
  url: string
}

export interface Lesson {
  title: string
  img: string
  price: number
  category?: number
}

export interface Lessons {
  hasMore: boolean
  loading: boolean
  offset: number
  limit: number
  list: Lesson[]
}

export enum CATEGORY_TYPES {
  ALL,
  REACT,
  VUE,
  NODE
}

export interface HomeState {
  currentCategory: CATEGORY_TYPES
  sliders: Slider[]
  lessons: Lessons
}
