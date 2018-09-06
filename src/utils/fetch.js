import axios from 'axios'
import {Message} from 'element-ui'
import {getToken} from './auth'

axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  if (getToken()) {
    config.headers.Authorization = getToken()
  }
  return config
}, err => Promise.reject(err))

axios.interceptors.response.use(response => response, err => Promise.reject(err))

function checkStatus(res) {
  if (res.status === 200 || res.status === 304) {
    return res.data
  }
  return {
    code: 0,
    msg: res.data.msg || res.statusText,
    data: res.statusText
  }
}

function checkCode(res) {
  if (res.code === 0) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 2 * 1000
    })
  }
  return res
}

const prefix = '/admin_demo_api/'
export default {
  get(url, params) {
    return axios({
      method: 'get',
      url: prefix + url,
      params,
      timeout: 30000
    }).then(checkStatus).then(checkCode)
  },
  post(url, data) {
    return axios({
      method: 'post',
      url: prefix + url,
      data: data,
      timeout: 30000
    }).then(checkStatus).then(checkCode)
  },
  postFile(url, params) {
    return axios({
      method: 'post',
      url: prefix + url,
      params
    }).then(checkStatus).then(checkCode)
  }
}
