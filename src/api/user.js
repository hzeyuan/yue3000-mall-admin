import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'


// 登陆接口 已对接
export async function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      email: data.username,
      password: data.password
    }
  })


  // return  {
  //   data: { token: 'admin' }
  // }
}

// 获取用户信息
export function getUserInfo(accessToken) {
  return request({
    url: '/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
