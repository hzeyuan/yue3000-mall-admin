import request from '@/utils/request'

export function updateCoupon(data) {
  return request({
    url: 'mall-admin/coupon',
    method: 'post',
    data,
  })
}
