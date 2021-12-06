import request from '@/utils/request'


//  获取抽奖记录列表
export function getLotteryRecordList(page) {
  return request({
    url: '',
    method: 'get',
  })
}

//  获取抽奖活动列表
export function getLotteryActivityList() {
  // return request({
  //   url: '/activityList',
  //   method: 'get',
  // })
  //
  const data =  [
  {
    id: 1,
    name: '积分活动',
    status: '1',  //活动状态 1表示进行中 0表示关闭
    message: '抽奖获得积分', //活动描述
    rule: '1、每个用户每天可免费获得十次抽奖机会，每日0点更新。\n' +
      '2、抽奖后，用户需要联系客服才能获得奖品，不联系视为主动放弃。\n' +
      '3、如发现有恶意刷的行为，我们有权不发放或撤回发放的奖品。\n' +
      '4、此活动解释权归我方所有。\n' +
      '5、本次活动与苹果公司无关',    //活动规则
    prize: [  //奖品列表
      {
        id: 1,
        name: '积分',
        prize_type: 1,   //奖品类型
        number: 13,     //奖品数量
        probability: 0.4, //抽奖概率
        sort: 100,        //排序
        value: 20,        //奖品值
        image: 'http://yanxuan.nosdn.127.net/4eb09e08ac9de543d2291d27a6be0b54.jpg'         //奖品图片
      },
      {
        id: 2,
        name: '谢谢惠顾',
        prize_type: 3,   //奖品类型
        number: 0,     //奖品数量
        probability: 0.5, //抽奖概率
        sort: 101,        //排序
        value: '',        //奖品值
        image: 'http://yanxuan.nosdn.127.net/4eb09e08ac9de543d2291d27a6be0b54.jpg'         //奖品图片
      }
    ]
  }
]
  return data
}
