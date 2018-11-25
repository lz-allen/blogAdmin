const formatTime = (time) => {
  if (!time) {
    return '无'
  }
  let date = new Date(time)
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds())
}

const addZero = (num) => {
  return num < 10 ? '0' + num : '' + num
}

export default formatTime
