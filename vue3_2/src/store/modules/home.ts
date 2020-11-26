import { CATEGORY_TYPES, HomeState, Lessons, Slider } from '@/types/home'
import { Module } from 'vuex'
import { GlobalState } from '..'
import * as types from '../action-types'
import * as mockData from '@/api/mock'

const state: HomeState = {
  currentCategory: CATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    hasMore: true, // 是否有更多数据
    loading: false, // 是否加载中
    offset: 0,
    limit: 5,
    list: [] // 显示到页面中的list
  }
}

// Module里的参数 1)自己状态 2) 全局状态
const home: Module<HomeState, GlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [types.SET_CATEGORY](state, payload: CATEGORY_TYPES) {
      state.currentCategory = payload
      // 初始化
      state.lessons.list = []
      state.lessons.offset = 0
      state.lessons.hasMore = true
    },
    [types.SET_SLIDER_LIST](state, payload: Slider[]) {
      state.sliders = payload
    },
    [types.SET_LOADING](state, payload: boolean) {
      state.lessons.loading = payload
    },
    [types.SET_LESSON_LIST](state, payload: Lessons) {
      state.lessons.list = [...state.lessons.list, ...payload.list]
      state.lessons.hasMore = payload.hasMore
      state.lessons.offset = state.lessons.list.length
    }
  },
  actions: {
    async [types.SET_SLIDER_LIST]({ commit }) {
      const data = mockData.sliderList
      await new Promise(r => {
        setTimeout(() => r(), 200)
      })
      commit(types.SET_SLIDER_LIST, data)
    },
    async [types.SET_LESSON_LIST]({ state, commit }) {
      if (state.lessons.loading) return
      if (!state.lessons.hasMore) return
      commit(types.SET_LOADING, true)
      const lessons = mockData.getLessons(
        state.currentCategory,
        state.lessons.offset,
        state.lessons.limit
      )
      await new Promise(r => {
        setTimeout(() => r(), 500)
      })
      commit(types.SET_LESSON_LIST, lessons)
      commit(types.SET_LOADING, false)
    }
  }
}

export default home
