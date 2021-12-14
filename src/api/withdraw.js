import request from '@/utils/request'

export function refuse(form) {
  return request({
    url: '/mall-admin/withdraw/refuse',
    method: 'post',
    data: form,
  })
}

export function confirm(form) {
  return request({
    url: '/mall-admin/withdraw/confirm',
    method: 'post',
    data: form,
  })
}
