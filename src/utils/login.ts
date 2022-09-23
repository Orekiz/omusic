/**
 * 检测用户是否登录
 */

import Cookies from 'js-cookie'

export const isLogined = (): boolean => {
  const token: string | undefined = Cookies.get('MUSIC_U');
  return token !== undefined
}

// 删除游客登陆的cookie token
export const clearMusicA = () => {
  Cookies.remove('MUSIC_A')
}