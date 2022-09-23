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

  return {
    loginGuest,
    loginPhone
  }
}