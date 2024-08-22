import dayjs from 'dayjs'
export const formatTime = (time: Date) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
