import axios, {
  AxiosError,
  type RawAxiosRequestHeaders,
  type Method
} from 'axios'
import { ElMessage } from 'element-plus'
export const baseURL = '/adminapi'
const instance = axios.create({
  // 1. 基础地址，超时时间
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: 10000
})

instance.interceptors.response.use(
  function (response) {
    const { authorization } = response.headers
    authorization && localStorage.setItem('token', authorization)
    if (![401, 200].includes(response.data.code)) {
      ElMessage.error(response.data?.message || '服务错误')
      return Promise.reject(response.data)
    }
    return response.data
  },
  function (error: AxiosError) {
    const status = error.response?.status
    if (status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
type Data<T> = {
  code: number
  message: string
  data: T
}
export const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object | Array<any>,
  headers?: RawAxiosRequestHeaders
) => {
  return instance.request<any, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData,
    headers
  })
}
