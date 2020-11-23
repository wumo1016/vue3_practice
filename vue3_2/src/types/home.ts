export interface Slider {
  url: string
}

export interface LessonList {
  title: string
  video: string
  poster: string
  price: number
  category?: string
}

export interface Lessons {
  hasMore: boolean
  loading: boolean
  offset: number
  limit: number
  list: LessonList[]
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
