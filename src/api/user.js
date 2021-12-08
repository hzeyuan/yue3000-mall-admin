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
      password: data.password,
    },
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

// 登出
export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

// 注册
export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}

// 获取用户等级列表
export function userLevelList() {
  return request({
    url: '/mall-admin/user_levels',
    method: 'get',
  })
}
// 添加用户等级
export function addUserLevel(data) {
  return request({
    url: '/mall-admin/user_level',
    method: 'post',
    data,
  })
}
//获取用户等级详情
export function getUserLevel(id) {
  return request({
    url: `/mall-admin/user_level/${id}`,
    method: 'get',
  })
}
// 更新用户等级详情
export function updateUserLevel(id, data) {
  return request({
    url: `/mall-admin/user_level/${id}`,
    method: 'PUT',
    data,
  })
}
// 删除用户等级
export function deleteUserLevel(id) {
  return request({
    url: `/mall-admin/user_level/${id}`,
    method: 'DELETE',
  })
}
