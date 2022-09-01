/**
 * 检测用户是否登录
 */

import Cookies from 'js-cookie'

export const isLogined = () => {
  const token: string | undefined = Cookies.get('MUSIC_A');
  return token !== undefined
}