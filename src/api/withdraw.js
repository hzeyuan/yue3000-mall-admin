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

export function transferFail(form) {
  return request({
    url: '/mall-admin/withdraw/transferFail',
    method: 'post',
    data: form,
  })
}

export function transferSuccess(form) {
  return request({
    url: '/mall-admin/withdraw/transferSuccess',
    method: 'post',
    data: form,
  })
}
