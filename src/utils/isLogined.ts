/**
 * 检测用户是否登录
 */

import Cookies from 'js-cookie'

export const isLogined = () => {
  const token: string | undefined = Cookies.get('MUSIC_U');
  return token !== undefined
}