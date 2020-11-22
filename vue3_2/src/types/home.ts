export interface Slider {
  url: string
}

export interface LessonList {
  title: string
  video: string
  poster: string
  orice: number
  category?: string
}

export interface Lessons {
  hasMore: boolean
  loading: boolean
  offset: number
  limit: number
  list: LessonList[]
}

export enum CATOGORY_TYPES {
  ALL,
  REACT,
  VUE,
  NODE
}

export interface HomeState {
  currentCategory: CATOGORY_TYPES
  sliders: Slider[]
  lessons: Lessons
}
