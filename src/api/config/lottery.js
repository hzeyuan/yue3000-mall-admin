import request from '@/utils/request'


//  获取抽奖记录列表
export function getLotteryRecordList(page) {
  return request({
    url: '/mall-admin/luckdraw/record?page=' + page,
    method: 'get',
  })
}

//  获取抽奖活动列表
export function getLotteryActivityList(page) {
  return request({
    url: '/mall-admin/luckdraw/activityList?page=' + page,
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





// 获取抽奖活动奖品列表
export function getLotteryActivityPrizeList(id){
  return request({
    url: 'mall-admin/luckdraw/prizeList?activity_id=' + id,
    method: 'get'
  })
}

// 新增抽奖活动奖品
export function addLotteryActivityPrize(data){
  return request({
    url: 'mall-admin/luckdraw/prize',
    method: 'post',
    data
  })
}

// 修改抽奖活动奖品
export  function updateLotteryActivityPrize(id, data){
  return request({
    url: 'mall-admin/luckdraw/prize/'+ id,
    method: 'put',
    data
  })
}

// 删除抽奖活动奖品
export function deleteLotteryActivityPrize(id){
  return request({
    url: 'mall-admin/luckdraw/prize/id',
    method: 'delete',
  })
}
