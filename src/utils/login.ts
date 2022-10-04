/**
 * 检测用户是否登录
 */

import Cookies from 'js-cookie'

// 检测登录状态
export const isLogined = (): boolean => {
  const token: string | undefined = Cookies.get('MUSIC_U')
  const tokenQr: string | undefined = Cookies.get('qrLogined')
  return token !== undefined ? true : tokenQr !== undefined
}

// 检测是否已经游客登陆
export const isGuestLogined = (): boolean => {
  const token: string | undefined = Cookies.get('MUSIC_A')
  return token !== undefined
}

// 设置二维码登录的cookie
export const setQrLogined = (): void => {
  Cookies.set('qrLogined', 'true', { expires: 180 })
}

// 删除游客登陆的cookie token
export const clearMusicA = (): void => {
  Cookies.remove('MUSIC_A')
}

// 删除二维码登录的cookie
export const removeQrLogined = (): void => {
  Cookies.remove('qrLogined')
}