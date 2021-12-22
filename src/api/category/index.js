import request from '@/utils/request'

// 根据ID获取分类详情
export async function fetchList(id) {
  return await request({
    url: `/mall-admin/categories/${id}`,
    method: 'get',
  })
}

// 获取分类树形列表
export async function fetchTreeList() {
  return await request({
    url: `/mall-admin/categories/structure`,
    method: 'get',
  })
}

//删除分类列表
export function deleteProductCate(id) {
  return request({
    url: `/mall-admin/categories/${id}`,
    method: 'delete',
  })
}

// 增加分类
export function addProductCate(data) {
  return request({
    url: '/mall-admin/categories',
    method: 'post',
    data,
  })
}

// 修改分类
export function updateProductCate(id, data) {
  return request({
    url: `/mall-admin/categories/${id}`,
    method: 'put',
    data,
  })
}
