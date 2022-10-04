/**
 * api字典
 */

export enum LoginDic {
  phone = '/login/cellphone',
  guest = '/register/anonimous',
  sendCaptcha = '/captcha/sent',
  qrKey = '/login/qr/key',
  qrCreate = '/login/qr/create',
  qrCheck = '/login/qr/check',
  logout = '/logout'
}

export enum UserDic {
  userAccount = '/user/account'
}

export enum MusicListDic {
  dailyRecRes = '/recommend/resource'
}
