import { Cookie } from './storage'
const TokenKey = 'Token_Auth'

const getToken = function() {
  return Cookie.get(TokenKey)
}
const setToken = function(token) {
  return Cookie.set(TokenKey, token)
}
const removeToken = function() {
  return Cookie.remove(TokenKey)
}

export {
  getToken,
  setToken,
  removeToken
}
