import request from "@/utils/request"
import { LoginDic } from '@/api/dic'

export default function loginHooks () {
  // hooks
  function guestLogin () {
    return request.post({ url: LoginDic.guest })
  }

  return {
    guestLogin
  }
}