import request from "@/utils/request"
import { LoginDic } from '@/api/dic'
import { LoginPhoneDto } from "./typings"

export default function loginHooks () {
  // hooks
  function loginGuest () {
    return request.post({ url: LoginDic.guest })
  }

  function loginPhone (data: LoginPhoneDto) {
    return request.post({ url: LoginDic.phone, data })
  }

  function sentCaptcha (phone: string) {
    return request.get({ url: LoginDic.sendCaptcha, data: { phone } })
  }

  function logout () {
    return request.post({ url: LoginDic.logout })
  }

  function qrKey () {
    return request.get({ url: LoginDic.qrKey })
  }

  function qrCreate (key: string) {
    return request.get({ url: LoginDic.qrCreate, data: { key, qrimg: true } })
  }

  function qrCheck (key: string) {
    return request.get({ url: LoginDic.qrCheck, data: { key } })
  }

  return {
    loginGuest,
    loginPhone,
    sentCaptcha,
    logout,
    qrKey,
    qrCreate,
    qrCheck
  }
}