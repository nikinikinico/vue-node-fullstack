import type { News } from '@/types/news'
import { request } from './interceptor'
/**
 * 添加新闻
 */
export const newsAdd = (news: News) =>
  request('/news/add', 'POST', news, {
    'Content-Type': 'multipart/form-data'
  })
/**
 * 新闻列表
 */
export const newsList = () => request<Array<News>>('/news/list', 'GET')
/**
 * 发布新闻
 */
export const newsPublish = (news: News) =>
  request<News>('/news/publish', 'PUT', news)
/**
 * 上传新闻图片
 */
export const uploadNewsImage = (formData: FormData) =>
  request<string>('/news/image-upload', 'POST', formData, {
    'Content-Type': 'multipart/form-data'
  })

/**
 * 删除新闻图片
 */
export const deleteNewsImage = (image: Array<string>) =>
  request('/news/image-delete', 'DELETE', image)
/**
 * 删除新闻
 */
export const deleteNews = (id: string) => request(`/news/list/${id}`, 'DELETE')
