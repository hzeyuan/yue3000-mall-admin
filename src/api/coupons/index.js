import request from '@/utils/request'

// 优惠卷相关 coupons

// 获取抽奖活动优惠卷列表
export function getLotteryCoupons() {
  const data = {}
  data.list = [
    {
      id: 1,
      name: '满减优惠',
    },
    {
      id: 2,
      name: '测试优惠卷',
    },
    {
      id: 3,
      name: '优惠卷',
    },
  ]
  return data
  // return rquest({
  //   url: '',
  //   method: 'get',
  // })
}
