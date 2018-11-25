const Cookie = {
  get(key) {
    let arr = document.cookie.split('; ')
    for (let i = 0; i < arr.length; i++) {
      let arr2 = arr[i].trim().split('=')
      if (arr2[0] === key) {
        return arr2[1]
      }
    }
    return ''
  },
  set(key, val, t = 1800000) {
    let date = new Date()
    date.setDate(date.getTime() + t)
    document.cookie = key + '=' + val + ';expires=' + date.toGMTString()
  },
  remove(key) {
    this.set(key, '', -1)
  }
}
export {
  Cookie
}
