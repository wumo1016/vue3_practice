import { HomeState } from '@/types/home'
import { createStore } from 'vuex'
import home from './modules/home'

export interface GlobalState {
  home: HomeState // 某个页面，某个模块可以在这增加
}

export default createStore<GlobalState>({
  mutations: {},
  actions: {},
  modules: {
    home
  }
})
