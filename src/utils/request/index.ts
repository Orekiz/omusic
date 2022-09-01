/**
 * request模块
 * 负责用于发送请求
 */

import instance from "./axios"
import { baseUrl } from "@/config"
import { AxiosRequest } from "./typings"
import { reject } from "lodash"

class Request {
  protected baseUrl: string

  constructor () {
    this.baseUrl = baseUrl
  }

  get ({ url, data }: AxiosRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      instance.get(url, { baseURL: this.baseUrl, data: data })
      .then(res => {
        // 200: 请求成功
        if (res.status === 200) {
          resolve(res.data)
        } else {
          resolve({ code: 201, message: res.data.message ?? '请求失败', data: null })
        }
      })
      .catch(err => {
        const myMessage = err?.data?.message ?? err?.message ?? '请求失败'
        reject(new Error(myMessage))
      })
    })
  }

  post ({ url, data }: AxiosRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      instance.post(url, { baseUrl: this.baseUrl, data })
      .then(res => {
        // 200: 请求成功
        if (res.status === 200) {
          resolve(res.data)
        } else {
          resolve({ code: 201, message: res.data.message ?? '请求失败', data: null })
        }
      })
      .catch(err => {
        const myMessage = err?.data?.message ?? err?.message ?? '请求失败'
        reject(new Error(myMessage))
      })
    })
  }
}

export default new Request()
