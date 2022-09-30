import request from "@/utils/request";
import { UserDic } from '../dic'

export default function userHooks () {
    // hooks
    // 获取账号信息
    function userAccount () {
        return request.get({ url: UserDic.userAccount })
    }

    return {
        userAccount
    }
}