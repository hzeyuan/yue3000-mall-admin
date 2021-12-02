import request from '@/utils/request'

export async function policy(data) {
  return await request({
    url:'/upload',
    method:'post',
    data
  })
}
