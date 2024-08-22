import { request } from './interceptor'
import type { UserInfo, EditUserForm } from '@/types/user'
/**
 * 登录
 */
export const loginApi = (username: string, password: string) =>
  request<UserInfo>('/user/login', 'POST', { username, password })
/**
 * 更新用户信息,带头像
 */
export const userUpload = (formData: FormData) =>
  request<UserInfo>('/user/upload', 'POST', formData, {
    'Content-Type': 'multipart/form-data'
  })
/**
 * 更新用户信息，不带头像
 */
export const userUpdate = (form: EditUserForm) =>
  request(`/user/list/${form._id}`, 'PUT', form)
/**
 * 添加用户
 */
export const userAdd = (formData: FormData) =>
  request('/user/add', 'POST', formData, {
    'Content-Type': 'multipart/form-data'
  })
/**
 * 用户列表
 */
export const userList = (id?: string) => {
  return request<Array<UserInfo>>(id ? `/user/list/${id}` : '/user/list', 'GET')
}
/**
 * 删除用户
 */
export const userDelete = (id: string) => request(`/user/list/${id}`, 'DELETE')
/**
 * 获取当前用户信息
 */
export const getCurrentUser = () => request<UserInfo>(`/user/info`, 'GET')
