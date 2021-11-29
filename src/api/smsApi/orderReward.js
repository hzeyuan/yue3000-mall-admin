import request from "@/utils/request";


/**
 * 请求实例： http://192.168.1.114:1337/mall-admin/config/MarketingConfig?name=orderAwardConfig
 * 配置项参数  多个参数并发请求
 * 会员下单奖励积分数：type：MarketingConfig;  name = orderAwardConfig
 * 注册奖励积分数：type：MarketingConfig;  name = register_award_integral
 * 注册奖励优惠卷：type：MarketingConfig;  name = register_award_coupon
 * 邀请会员积分奖励：type：MarketingConfig;  name = register_award_coupon
 **/

// 获取基础参数
export async function getConfigData (type,name) {
  return await request({
    url: `/mall-admin/config/${type}?name=${name}`,
    method: 'get',
  })
}

// 修改基础参数
export function updateConfigData (type, name, value) {
  return request({
    url: `/mall-admin/config/${type}?name=${name}`,
    method: 'post',
    data: {
      value
    }
  })
}
