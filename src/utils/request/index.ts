/**
 * request模块
 * 负责用于发送请求
 */

import instance from "./axios"
import { baseUrl } from "@/config"
import { AxiosRequest } from "./typings"
import { getTimestamp } from '@/utils'

class Request {
  protected baseUrl: string

  constructor () {
    this.baseUrl = baseUrl
  }

  get ({ url, data }: AxiosRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      instance.get(url, { baseURL: this.baseUrl, params: { ...data, realIP: '139.196.215.163', timestamp: getTimestamp() } })
      .then(res => {
        // 200: 请求成功
        if (res.status === 200) {
          if (res.data.code === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        } else {
          reject({ code: 201, message: res.data.message ?? '请求失败', data: null })
        }
      })
      .catch(err => {
        const myMessage = err?.data?.message ?? err?.message ?? err?.msg ?? '请求失败'
        reject(new Error(myMessage))
      })
    })
  }

  post ({ url, data }: AxiosRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      instance.post(`${this.baseUrl}${url}`, { ...data, realIP: '139.196.215.163', timestamp: getTimestamp() })
      .then(res => {
        console.log(res)
        // 200: 请求成功
        if (res.status === 200) {
          if (res.data.code === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        } else {
          reject({ code: 201, message: res.data.message ?? '请求失败', data: null })
        }
      })
      .catch(err => {
        const myMessage = err?.data?.message ?? err?.message ?? err?.msg ?? '请求失败'
        reject(new Error(myMessage))
      })
    })
  }
}

export default new Request()
