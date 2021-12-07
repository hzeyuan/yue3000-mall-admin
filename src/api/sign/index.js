/**
 * 请求实例： http://192.168.1.114:1337/mall-admin/config/MarketingConfig?name=orderAwardConfig
 * 配置项参数  多个参数并发请求
 * 会员下单奖励积分数：type：MarketingConfig;  name = orderAwardConfig
 * 注册奖励积分数：type：MarketingConfig;  name = register_award_integral
 * 注册奖励优惠卷：type：MarketingConfig;  name = register_award_coupon
 * 邀请会员积分奖励：type：MarketingConfig;  name = invited_award_integral
 **/

// 获取基础参数
export async function getConfigData(type, name) {
  return await request({
    url: `/mall-admin/config/${type}?name=${name}`,
    method: 'get',
  })
}

// 修改基础参数
export function updateConfigData(type, name, value) {
  return request({
    url: `/mall-admin/config/${type}?name=${name}`,
    method: 'post',
    data: {
      value,
    },
  })
}

// 获取连续签到配置参数 表格
export async function getSignsData() {
  return await request({
    url: '/mall-admin/sign_daily',
    method: 'get',
  })
}

// 添加连续签到规则
export function addSignsData(data) {
  return request({
    url: '/mall-admin/sign_daily',
    method: 'post',
    data,
  })
}

// 修改连续签到规则
export function updateSignsData(id, data) {
  return request({
    url: `/mall-admin/sign_daily/${id}`,
    method: 'post',
    data,
  })
}

// 删除连续签到规则
export function deleteSignsData(id) {
  return request({
    url: `/mall-admin/sign_daily/${id}`,
    method: 'delete',
  })
}

// 获取签到配置参数
export async function getSignData() {
  return await request({
    url: 'mall-admin/sign_daily/signrule',
    method: 'get',
  })
}

// 修改签到配置参数
export function updateSignData(data) {
  return request({
    url: 'mall-admin/sign_daily/signrule',
    method: 'post',
    data,
  })
}

// 获取用户签到数据
export async function getSignRecordData(type, value, page) {
  return await request({
    url: `mall-admin/sign_daily/record?type=${type}&keyword=${value}&page=${page}`,
    method: 'get',
  })
}
