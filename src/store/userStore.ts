import { defineStore } from "pinia"
import { UserState, UserProfile } from "./typings"

export default defineStore('user', {
  state: (): UserState => ({
    isLogined: false,
    userId: 0,
    _nickname: '',
    signature: '',
    avatarUrl: ''
  }),
  getters: {
    nickname (state): string {
      return state.isLogined ? state._nickname : '游客'
    }
  },
  actions: {
    setLogined (): void {
      this.isLogined = true
    },
    setUserProfile (userProfile: UserProfile): void {
      let { userId, nickname, signature, avatarUrl } = userProfile
      this.userId = userId ?? 0
      this._nickname = nickname ?? ''
      this.signature = signature ?? ''
      this.avatarUrl = avatarUrl ?? ''
    }
  }
})