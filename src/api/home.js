import request from '@/utils/request'


//每日订单金额数据 用于生成表格
export async function getDashboard(){
  return await request({
    url:'/dashboard/logistic',
    method: 'get'
  })
}
