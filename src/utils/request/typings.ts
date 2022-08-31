// 请求队列类型接口
export interface PendingType {
  url: string | undefined
  method: string | undefined
  params: object
  data: object
  cancel: Function
}

// 发送请求参数类型
export interface AxiosRequest {
  url: string
  data?: any
}