import request from "@/utils/request";
export function fetchList(params) {
  return request({
    url: "/goods?type=is_hot",
    method: "get",
    params: params
  });
}

// 批量推荐
export function updateRecommendStatus(data) {
  return request({
    url: "/goods/bulk/recommend",
    method: "put",
    data: data
  });
}

// 批量删除热门
export function deleteHotProduct(data) {
  return request({
    url: "/goods/bulk/deleted",
    method: "put",
    data: data
  });
}

export function createHotProduct(data) {
  return request({
    url: "/home/recommendProduct/create",
    method: "post",
    data: data
  });
}

export function updateHotProductSort(params) {
  return request({
    url: "/home/recommendProduct/update/sort/" + params.id,
    method: "post",
    params: params
  });
}
