import { createStore } from 'vuex'
import * as types from './action-types'
// import * as api from '@/api'
export default createStore({
  state: {
    planList: []
  },
  getters: {
    allTime: () => 0
  },
  mutations: {
    [types.ADD_PLAN](state, payload) {
      state.planList = [...state.planList, payload]
    },
    [types.DELETE_PLAN](state, payload) {
      state.planList = state.planList.filter(v => {
        return v._id !== payload._id
      })
    },
    [types.SET_PLAN_LIST](state, payload) {
      state.planList = payload
    }
  },
  actions: {
    async [types.ADD_PLAN]({ commit }, payload) {
      commit(types.ADD_PLAN, payload)
    },
    async [types.DELETE_PLAN]({ commit }, payload) {
      commit(types.DELETE_PLAN, payload)
    },
    async [types.SET_PLAN_LIST]({ commit }) {
      const planList = [
        {
          _id: 1,
          date: '2020-11-12',
          time: 8,
          content: '测试1'
        },
        {
          _id: 2,
          date: '2020-10-10',
          time: 7,
          content: '测试2'
        }
      ]
      commit(types.SET_PLAN_LIST, planList)
    }
    // async [types.ADD_PLAN]({ commit }, payload) {
    //   const plan = await api.addPlan(payload)
    //   commit(types.ADD_PLAN, plan)
    // },
    // async [types.DELETE_PLAN]({ commit }, payload) {
    //   const plan = await api.deletePlanList(payload)
    //   commit(types.DELETE_PLAN, plan)
    // },
    // async [types.SET_PLAN_LIST]({ commit }) {
    //   const planList = await api.getPlanList()
    //   commit(types.SET_PLAN_LIST, planList)
    // }
  },
  modules: {}
})
