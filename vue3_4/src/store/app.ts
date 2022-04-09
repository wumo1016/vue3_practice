import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  persist: true,
  state: () => ({
    name: 'wyb'
  }),
  getters: {},
  actions: {}
})
