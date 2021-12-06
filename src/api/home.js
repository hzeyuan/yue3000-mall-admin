import request from '@/utils/request'

export async function getDashboard(){
  return await request({
    url:'mall-admin/dashboard/logistic',
    method: 'get'
  })
}
