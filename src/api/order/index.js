import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/mall-admin/orders',
    method: 'get',
    params: params,
  })
}

export function confirmOrder(id) {
  return request({
    url: `/mall-admin/order/confirm/${id}`,
    method: 'PUT',
  })
}

export function closeOrder(id, data) {
  return request({
    url: `/mall-admin/orders/close/${id}`,
    method: 'PUT',
  })
}

export function deleteOrder(data) {
  return request({
    url: '/mall-admin/order/delete',
    method: 'PUT',
    data,
  })
}

// 发货api
export function deliveryOrder(data) {
  return request({
    url: `/mall-admin/orders/delivery`,
    method: 'put',
    data,
  })
}

export function getOrderDetail(id) {
  return request({
    url: '/mall-admin/order/' + id,
    method: 'get',
  })
}

export function getOrderTraces(id) {
  return request({
    url: '/mall-admin/order/traces/' + id,
    method: 'get',
  })
}

export function updateReceiverInfo(data) {
  return request({
    url: '/order/update/receiverInfo',
    method: 'PUT',
    data: data,
  })
}

export function updateMoneyInfo(data) {
  return request({
    url: '/order/update/moneyInfo',
    method: 'post',
    data: data,
  })
}

export function updateOrderNote(params) {
  return request({
    url: '/order/update/note',
    method: 'post',
    params: params,
  })
}

//售后列表
export function getAfterSaleList(params) {
  // return request({
  //   url: '/after_sale/list',
  //   method: 'post',
  //   params: params,
  // })

  console.log('售后订单搜索对象', params)
  return {
    list: [
      {
        created_at: '2021-04-07 15:32:03',
        order: {
          id: 855,
          order_amount: '11.00',
          order_sn: '202104071523031094',
          pay_way: '余额支付', //支付方式
          // order_status: '已完成',
          order_status: 3, //订单状态
          goods_price: '', //商品价格
          integral_price: '0.00', //积分抵扣价格
          coupon: {
            price: '', //抵扣价格
            id: '', //优惠券id,
            name: '', // 名称
          },
          order_price: 11.0, //订单价格
          actual_price: 11.0, //实际支付价格
          // 优惠券信息
        },
        after_sale: {
          id: 47, //
          sn: '202104071532033033',
          refund_price: '11.00',
          refund_status: 3, // 退款状态  //售后状态;0-申请退款;1-商家拒绝;2-商品待退货;3-商家待收货;4-商家拒收货;5-等待退款;6-退款成功
          refund_reason: '', // 退款原因
          refund_remark: '', // 退款备注
          refund_type: '仅退款', // 退款类型 ，退货退款，仅退款
        },
        order_goods: [
          {
            pic_url:
              'http://b2cdemo.likeshop.cn/uploads/images/202103091152406fc596654.jpeg',
            goods_name:
              '网红芦荟棉被单双人被芯被套一体学生被芯北欧简约可爱清新',
            product_name: '',
            goods_price: '11.00',
            goods_num: 1,
          },
        ],
        user: {
          avatar:
            'http://b2cdemo.likeshop.cn/uploads/user/avatar/715cc0f2f337c2a59099fc68903ad5e0.jpeg',
          id: 1912,
          phone: '18771421011',
          username: '小黄同学',
        },
      },
    ],
    pagination: {
      rowCount: 10,
    },
  }
}

// 售后详情
export function afterSaleDetail(orderId) {
  return {
    create_time: '2021-04-07 15:32:03',
    order: {
      id: 855,
      order_amount: '11.00',
      order_sn: '202104071523031094',
      pay_way: '余额支付', //支付方式
      // order_status: '已完成',
      order_status: 3, //订单状态
      goods_price: '', //商品价格
      integral_price: '0.00', //积分抵扣价格
      coupon: {
        price: '', //抵扣价格
        id: '', //优惠券id,
        name: '', // 名称
      },
      order_price: '11.00', //订单价格
      actual_price: '', //实际支付价格
      // 优惠券信息
    },
    after_sale: {
      id: 47, //
      sn: '202104071532033033',
      refund_price: '11.00',
      refund_status: 3, // 退款状态  //售后状态;0-申请退款;1-商家拒绝;2-商品待退货;3-商家待收货;4-商家拒收货;5-等待退款;6-退款成功
      refund_reason: '', // 退款原因
      refund_remark: '', // 退款备注
      refund_type: '仅退款', // 退款类型 ，退货退款，仅退款
    },
    order_goods: [
      {
        pic_url:
          'http://b2cdemo.likeshop.cn/uploads/images/202103091152406fc596654.jpeg',
        goods_name: '网红芦荟棉被单双人被芯被套一体学生被芯北欧简约可爱清新',
        goods_price: '11.00',
        created_at: 1617780183,
        goods_id: 32,
        goods_num: 1,
        product_id: 254, //产品sku id
      },
    ],
    user: {
      avatar:
        'http://b2cdemo.likeshop.cn/uploads/user/avatar/715cc0f2f337c2a59099fc68903ad5e0.jpeg',
      id: 1912,
      phone: '18771421011',
      username: '小黄同学',
    },
    log: [],
  }
}

// 同意退款
export function agreeRefund(orderId) {
  return request({
    url: `/after_sale/agree/${orderId}`,
    method: 'PUT',
  })
}

// 拒绝退款
export function rejectRefund(orderId) {
  return request({
    url: `/after_sale/reject/${orderId}`,
    method: 'PUT',
  })
}

//确认收货
export function confirmReceived(orderId) {
  return request({
    url: `/after_sale/confirm_received/${orderId}`,
    method: 'PUT',
  })
}

//确认退款
export function confirmRefund(orderId) {
  return request({
    url: `/after_sale/confirm_refund/${orderId}`,
    method: 'PUT',
  })
}
