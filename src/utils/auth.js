import Cookies from 'js-cookie'


const TokenKey = 'loginToken'
// 获取
export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
}

// 写入
export function setToken(token) {
  return window.sessionStorage.setItem(TokenKey, token)
}

// 删除
export function removeToken() {
  return window.sessionStorage.removeItem(TokenKey)
}
