import request from "@/utils/request";
import { MusicListDic } from "../dic";

export default function musicListHooks () {
  function dailyRec () {
    return request.get({ url: MusicListDic.dailyRecRes })
  }

  return {
    dailyRec
  }
}