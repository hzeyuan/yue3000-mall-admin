import request from '@/utils/request'

// 获取App我的页面功能列表
export async function getAppMy() {
  const axiosResponse = await request({
    method: 'get',
    url: 'mall-admin/menu/list?link_type=1',
  })
  return axiosResponse
}

// 根据ID获取我的页面某项功能
export async function getAppMyById(id) {
  const axiosResponse = await request({
    method: 'get',
    url: `mall-admin/menu/${id}`,
  })
  return axiosResponse
}

// 添加App我的页面功能
export function addAppMy(data) {
  return request({
    method: 'post',
    url: 'mall-admin/menu',
    data,
  })
}

// 修改App我的页面功能
export function updateAppMy(id, data) {
  return request({
    method: 'put',
    url: `mall-admin/menu/${id}`,
    data,
  })
}

// 根据ID删除App我的页面功能
export function deleteAppMyById(id) {
  return request({
    method: 'delete',
    url: `mall-admin/menu/${id}`,
  })
}

// 修改菜单顺序
export function updateAppMySort(data) {
  return request({
    method: 'put',
    url: `mall-admin/menu/sort`,
    data,
  })
}
