import request from "@/utils/request";
export function fetchList(params) {
  return request({
    url: "/goods",
    method: "get",
    params: params
  });
}

export function fetchSimpleList(params) {
  return request({
    url: "/product/simpleList",
    method: "get",
    params: params
  });
}

export function updateDeleteStatus(params) {
  return request({
    url: `/goods`,
    method: "delete",
    params
  });
}

// 批量更新为新品
export function updateNewStatus(data) {
  return request({
    url: "/goods/bulk/new",
    method: "put",
    data: data
  });
}

// 批量设置为推荐
export function updateRecommendStatus(data) {
  return request({
    url: "/goods/bulk/recommend",
    method: "put",
    data: data
  });
}
// 批量设置上/下架
export function updatePublishStatus(data) {
  return request({
    url: "/goods/bulk/is_on_sale",
    method: "put",
    data: data
  });
}

export function createProduct(data) {
  return request({
    url: "/product/create",
    method: "post",
    data: data
  });
}

export function updateProduct(id, data) {
  return request({
    url: "/product/update/" + id,
    method: "post",
    data: data
  });
}

export function getProduct(id) {
  return request({
    url: "/product/updateInfo/" + id,
    method: "get"
  });
}
// 获取商品参数
export function getGoods(id) {
  return request({
    url:`/goods/${id}`,
    method: 'get'
  })
}

// 修改商品参数
export function updateGoods(id,data) {
  return request({
    url:`/goods/${id}`,
    method: 'update',
    data
  })
}

// 添加商品
export function postGoods(data) {
  return request({
    url:'/goods',
    method: 'post',
    data
  })
}
