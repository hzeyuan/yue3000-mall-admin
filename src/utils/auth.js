import Cookies from 'js-cookie'

const TokenKey = 'loginToken'

// 获取
export function getToken() {
  return Cookies.get(TokenKey)
}

// 写入
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除
export function removeToken() {
  return Cookies.remove(TokenKey)
}
