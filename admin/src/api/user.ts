import { request } from './interceptor'
import type { UserInfo } from '@/types/user'
/**
 * 登录
 */
export const loginApi = (username: string, password: string) =>
  request<UserInfo>('/user/login', 'POST', { username, password })
/**
 * 更新用户信息
 */
export const userUpload = (formData: FormData) =>
  request<UserInfo>('/user/upload', 'POST', formData, {
    'Content-Type': 'multipart/form-data'
  })
