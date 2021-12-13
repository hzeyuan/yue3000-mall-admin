import request from '@/utils/request'

export function refuse() {
  return request({
    url: '//withdraw/refuse',
    method: 'post',
  })
}

export function confirm() {
  return request({
    url: '/withdraw/confirm',
    method: 'post',
  })
}
