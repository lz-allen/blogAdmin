import axios from '@/utils/fetch'
import {
  getToken
} from '@/utils/auth'
import md5 from 'js-md5'

const user = {
  state: {
    list: [],
    userTotal: 0,
    name: '',
    username: '',
    roles: null,
    token: getToken()
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USERINFO(state, info) {
      state.name = info.name
      state.username = info.username
      state.roles = info.roles
    },
    USERLIST(state, data) {
      state.list = data.list
      state.total = data.total
    },
    CLEARINFO(state) {
      state.name = ''
      state.username = ''
      state.roles = null
    }
  },
  actions: {
    clearInfo({
      commit
    }) {
      commit('CLEARINFO')
    },
    userLogin({state}, info) {
      let {userName, pwd} = info
      return new Promise((resolve, reject) => {
        axios.post('user/login', {
          username: userName,
          pwd: md5(pwd)
        }).then(res => {
          state.token = getToken()
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user
