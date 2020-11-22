import { CATOGORY_TYPES, HomeState } from '@/types/home'
import { Module } from 'vuex'
import { GlobalState } from '..'

const state: HomeState = {
  currentCategory: CATOGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    hasMore: true, // 是否有更多数据
    loading: true, // 是否加载中
    offset: 0,
    limit: 5,
    list: [] // 显示到页面中的list
  }
}

// Module里的参数 1)自己状态 2) 全局状态
const home: Module<HomeState, GlobalState> = {
  namespaced: true,
  state
}

export default home
