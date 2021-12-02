import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/coupons',
    method:'get',
    params:params
  })
}

export function createCoupon(data) {
  return request({
    url:'/coupons',
    method:'post',
    data:data
  })
}

export function getCoupon(id) {
  return request({
    url:'/coupon/'+id,
    method:'get',
  })
}

export function updateCoupon(id,data) {
  return request({
    url:'/coupon/update/'+id,
    method:'post',
    data:data
  })
}

export function deleteCoupon(id) {
  return request({
    url:'/coupons/'+id,
    method:'delete',
  })
}
