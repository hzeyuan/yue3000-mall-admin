import request from '@/utils/request'


//  获取抽奖记录列表
export function getLotteryRecordList() {
  return request({
    url: '',
    method: 'get',
  })
}

//  获取抽奖活动列表
export function getLotteryActivityList() {
  return request({
    url: '/mall-admin/luckdraw/activityList',
    method: 'get',
  })
}

// 修改抽奖活动列表
export function updateLotteryActivityList(id, data) {
  return request({
    url: 'mall-admin/luckdraw/activity/' + id ,
    method: 'put',
    data
  })
}

// 增加抽奖活动列表
export function addLotteryActivityList(data) {
  return request({
    url: 'mall-admin/luckdraw/activity',
    method: 'post',
    data
  })
}

// 删除抽奖活动
export function deleteLotteryActivityList(id) {
  return request({
    url: 'mall-admin/luckdraw/activity/' + id ,
    method: 'delete',
  })
}

// 修改抽奖活动状态
export function updateLotteryActivityStatus(id, data){
  return request({
    url: 'mall-admin/luckdraw/status/' + id +'?type=activity',
    method: 'put',
    data: {
      status: data
    }
  })
}
