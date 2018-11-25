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
    USER_LIST(state, data) {
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
    userLogin({
      state,
      commit
    }, info) {
      let {
        userName,
        pwd
      } = info
      return new Promise((resolve, reject) => {
        axios.post('user/login', {
          username: userName,
          pwd: md5(pwd)
        }).then(res => {
          commit('SET_TOKEN', getToken())
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserInfo({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        axios.get('user/info', {
          token: state.token
        }).then(res => {
          commit('SET_USERINFO', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    userDelete({commit}, params) {
      return new Promise((resolve, reject) => {
        axios.post('user/delete', params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserList({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        axios.get('user/list', params).then((res) => {
          commit('USER_LIST', res.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    userEdit({commit}, params) {
      params.pwd = md5(params.pwd)
      params.oldPwd = md5(params.oldPwd)
      return new Promise((resolve, reject) => {
        axios.post('user/edit', params).then((res) => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addUser({commit}, params) {
      params.pass = md5(params.pass)
      return new Promise((resolve, reject) => {
        axios.post('/user/add', params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user
