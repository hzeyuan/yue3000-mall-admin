import request from '@/utils/request'

// 登陆 判断账号密码是否正确
export async function  login(username, password) {
  try {
    return await request({
      url: 'http://192.168.1.110:1337/admin/login',
      method: 'post',
      data: {
        email: username,
        password
      }
    })
  } catch (e) {
  }
}
// export function login(username, password) {
//   return request({
//     url: '/admin/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }



// 根据Token获取用户的基本信息
export async function getInfo() {
  try {
    return request({
      url: '/admin/info',
      method: 'get',
    })
  } catch (e) {
  }
}

// 登出
export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data
  })
}
