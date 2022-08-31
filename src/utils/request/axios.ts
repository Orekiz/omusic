/**
 * 封装axios实例
 */

import axios, { AxiosRequestConfig } from 'axios'
import { PendingType } from './typings'

// axios实例
const instance = axios.create({
  timeout: 10000,
  responseType: 'json',
  withCredentials: true
})

// 请求列表
const pending: Array<PendingType> = []

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]
    // 当前请求在数组中存在时执行函数体
    if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
      console.log(list)
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试')
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}

// 请求拦截器
instance.interceptors.request.use(
  request => {
    removePending(request)
    request.cancelToken = new axios.CancelToken(c => {
      pending.push({ url: request.url, method: request.method, params: request.params, data: request.data, cancel: c })
    })
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    removePending(response.config)
    return response
  },
  error => {
    const response = error.response
    switch (response?.code) {
      case 500:
        // 服务端错误
        break
      default:
        break
    }

    // 超时重新请求
    const config = error.config
    const [RETRY_COUNT, RETRY_DELAY] = [0, 1000]
    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 3
      // 检查是否已经把重试的次数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message })
      }
      // 增加重试次数
      config.__retryCount++
      // 创造新的Promise来处理指数后退
      const backoff = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, RETRY_DELAY || 1)
      })
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config)
      })
    }

    return Promise.reject(response || { message: error.message })
  }
)

export default instance
