export interface UserState {
  isLogined: boolean
  userId: number | string
  _nickname: string
  signature: string
  avatarUrl: string
}

export interface UserProfile {
  userId?: number | string
  nickname?: string
  signature?: string
  avatarUrl?: string
}