function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatDate (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const t1 = [year, month, day].map(formatNumber).join('-')

  return `${t1}`
}

export function formatLocalTime(now, mode='all') {
  // 获取当前系统时间,精确到分
  var date = formatDate(now)
  var hours = now.getHours()
  var minutes = now.getMinutes()

  minutes = minutes < 10 ? `0${minutes}` : minutes
  hours = hours < 10 ? `0${hours}` : hours

  if (mode === 'time') {
    return `${hours}:${minutes}`
  } else if (mode === 'date') {
    return date
  } else {
    return `${date} ${hours}:${minutes}`
  }
}

export function getRegularMeeting(groupId, sunday) {
  switch (true) {
    case groupId === 'Ms Tech':
      const msg = {
        location: '9-506',
        topic: `${groupId}例会`,
        start_date: new Date(sunday).getDate()
      }
      return msg
    case groupId === 'DB组':
  }
}

export default {
  formatNumber,
  formatDate,
  formatLocalTime,
  getRegularMeeting
}
