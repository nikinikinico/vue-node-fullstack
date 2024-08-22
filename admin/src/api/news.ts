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
