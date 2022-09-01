import { defineStore } from "pinia"
import { UserState } from "./typings"

export default defineStore('user', {
  state: (): UserState => ({
    isLogined: false,
    _nickname: ''
  }),
  getters: {
    nickname (state): string {
      return state.isLogined ? state._nickname : '游客'
    }
  },
  actions: {

  }
})