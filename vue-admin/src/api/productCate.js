import request from '@/utils/request'

// 获取分类列表
// export function fetchList(parentId,params) {
//   return request({
//     url:'/productCategory/list/'+parentId,
//     method:'get',
//     params:params
//   })
// }
// export function fetchList () {
//   let data = {
//     pageNum: 1,
//     pageSize: 5,
//     total: 5,
//     totalPage: 1
//   }
//   data.lest = [
//     {
//       description: null,
//       icon: null,
//       id: 1,
//       keywords: "服装",
//       level: 0,
//       name: "服装",
//       navStatus: 1,
//       parentId: 0,
//       productCount: 100,
//       productUnit: "件",
//       showStatus: 1,
//       sort: 1
//     },
//     {
//       description: null,
//       icon: null,
//       id: 2,
//       keywords: "手机数码",
//       level: 0,
//       name: "手机数码",
//       navStatus: 1,
//       parentId: 0,
//       productCount: 100,
//       productUnit: "件",
//       showStatus: 1,
//       sort: 1
//     },
//     {
//       description: null,
//       icon: null,
//       id: 3,
//       keywords: "家用电器",
//       level: 0,
//       name: "家用电器",
//       navStatus: 1,
//       parentId: 0,
//       productCount: 100,
//       productUnit: "件",
//       showStatus: 1,
//       sort: 1
//     },
//     {
//       description: null,
//       icon: null,
//       id: 4,
//       keywords: "家具家装",
//       level: 0,
//       name: "家具家装",
//       navStatus: 1,
//       parentId: 0,
//       productCount: 100,
//       productUnit: "件",
//       showStatus: 1,
//       sort: 1
//     },
//     {
//       description: null,
//       icon: null,
//       id: 5,
//       keywords: "汽车用品",
//       level: 0,
//       name: "汽车用品",
//       navStatus: 1,
//       parentId: 0,
//       productCount: 100,
//       productUnit: "件",
//       showStatus: 1,
//       sort: 1
//     },
//   ]
//   return data
// }

// 获取分类列表
export async function fetchList (e) {
  return await request({
    url: `/categories${e}`,
    method: 'get'
  })
}
// 获取分类树形列表
export async function fetchTreeList () {
  return await request({
    url: `/categories/structure`,
    method: 'get'
  })
}

//删除分类列表
export function deleteProductCate(id) {
  return request({
    url:`/categories/${id}`,
    method:'delete'
  })
}
// 增加分类
export function addProductCate(data) {
  return request({
    url: '/categories',
    method: 'post',
    data
  })
}
// 修改分类
export function updateProductCate(id ,data) {
  return request({
    url: `/categories/${id}`,
    method: 'put',
    data
  })
}

export function createProductCate(data) {
  return request({
    url:'/productCategory/create',
    method:'post',
    data:data
  })
}

// export function updateProductCate(id,data) {
//   return request({
//     url:'/productCategory/update/'+id,
//     method:'post',
//     data:data
//   })
// }

export function getProductCate(id) {
  return request({
    url:'/productCategory/'+id,
    method:'get',
  })
}

export function updateShowStatus(data) {
  return request({
    url:'/productCategory/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateNavStatus(data) {
  return request({
    url:'/productCategory/update/navStatus',
    method:'post',
    data:data
  })
}

export function fetchListWithChildren() {
  return request({
    url:'/productCategory/list/withChildren',
    method:'get'
  })
}
