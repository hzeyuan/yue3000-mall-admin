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

export function getAfterSaleList(params) {
  return request({
    url: 'mall-admin/after-sales/lists',
    method: 'get',
    params: params,
  })
  console.log('售后订单搜索对象', params)
  return {
    list: [
      {
        create_time: '2021-04-07 15:32:03',
        order: {
          id: 855,
          order_amount: '11.00',
          order_sn: '202104071523031094',
          order_status: '已完成',
          pay_way: '余额支付',
          total_amount: '11.00',
        },
        order_goods: [
          {
            base_image:
              'http://b2cdemo.likeshop.cn/uploads/images/202103091152406fc596654.jpeg',
            create_time: 1617780183,
            discount_price: '0.00',
            goods_id: 32,
            goods_info:
              '{"item_id":254,"goods_id":32,"goods_name":"网红芦荟棉被单双人被芯被套一体学生被芯北欧简约可爱清新","status":1,"del":0,"image":"uploads\\/images\\/202103091152406fc596654.jpeg","stock":1,"free_shipping_type":1,"free_shipping":"0.00","free_shipping_template_id":0,"spec_image":"","spec_value_str":"1111","spec_value_ids":"205","goods_price":"11.00","volume":"4.000","weight":"4.000","third_category_id":63,"goods_num":1,"image_str":"https:\\/\\/likeshop.likemarket.net\\/uploads\\/images\\/202103091152406fc596654.jpeg","is_seckill":0,"discount_price":0,"integral_price":0,"sub_price":11}',
            goods_name:
              '网红芦荟棉被单双人被芯被套一体学生被芯北欧简约可爱清新',
            goods_num: 1,
            goods_price: '11.00',
            id: 855,
            image:
              'http://b2cdemo.likeshop.cn/uploads/images/202103091152406fc596654.jpeg',
            integral_price: '0.00',
            is_comment: 1,
            is_member: 0,
            is_seckill: 0,
            item_id: 254,
            member_discount: '0.00',
            member_price: '0.00',
            order_id: 855,
            original_price: '0.00',
            refund_status: 3,
            spec_value: '1111',
            spec_value_ids: '205',
            total_pay_price: '11.00',
            total_price: '11.00',
          },
          {
            base_image:
              'http://b2cdemo.likeshop.cn/uploads/images/202103091152406fc596654.jpeg',
            create_time: 1617780183,
            discount_price: '0.00',
            goods_id: 32,
            goods_info:
              '{"item_id":254,"goods_id":32,"goods_name":"网红芦荟棉被单双人被芯被套一体学生被芯北欧简约可爱清新","status":1,"del":0,"image":"uploads\\/images\\/202103091152406fc596654.jpeg","stock":1,"free_shipping_type":1,"free_shipping":"0.00","free_shipping_template_id":0,"spec_image":"","spec_value_str":"1111","spec_value_ids":"205","goods_price":"11.00","volume":"4.000","weight":"4.000","third_category_id":63,"goods_num":1,"image_str":"https:\\/\\/likeshop.likemarket.net\\/uploads\\/images\\/202103091152406fc596654.jpeg","is_seckill":0,"discount_price":0,"integral_price":0,"sub_price":11}',
            goods_name:
              '网红芦荟棉被单双人被芯被套一体学生被芯北欧简约可爱清新',
            goods_num: 1,
            goods_price: '11.00',
            id: 855,
            image:
              'http://b2cdemo.likeshop.cn/uploads/images/202103091152406fc596654.jpeg',
            integral_price: '0.00',
            is_comment: 1,
            is_member: 0,
            is_seckill: 0,
            item_id: 254,
            member_discount: '0.00',
            member_price: '0.00',
            order_id: 855,
            original_price: '0.00',
            refund_status: 3,
            spec_value: '1111',
            spec_value_ids: '205',
            total_pay_price: '11.00',
            total_price: '11.00',
          },
          {
            base_image:
              'http://b2cdemo.likeshop.cn/uploads/images/202103091152406fc596654.jpeg',
            create_time: 1617780183,
            discount_price: '0.00',
            goods_id: 32,
            goods_info:
              '{"item_id":254,"goods_id":32,"goods_name":"网红芦荟棉被单双人被芯被套一体学生被芯北欧简约可爱清新","status":1,"del":0,"image":"uploads\\/images\\/202103091152406fc596654.jpeg","stock":1,"free_shipping_type":1,"free_shipping":"0.00","free_shipping_template_id":0,"spec_image":"","spec_value_str":"1111","spec_value_ids":"205","goods_price":"11.00","volume":"4.000","weight":"4.000","third_category_id":63,"goods_num":1,"image_str":"https:\\/\\/likeshop.likemarket.net\\/uploads\\/images\\/202103091152406fc596654.jpeg","is_seckill":0,"discount_price":0,"integral_price":0,"sub_price":11}',
            goods_name:
              '网红芦荟棉被单双人被芯被套一体学生被芯北欧简约可爱清新',
            goods_num: 1,
            goods_price: '11.00',
            id: 855,
            image:
              'http://b2cdemo.likeshop.cn/uploads/images/202103091152406fc596654.jpeg',
            integral_price: '0.00',
            is_comment: 1,
            is_member: 0,
            is_seckill: 0,
            item_id: 254,
            member_discount: '0.00',
            member_price: '0.00',
            order_id: 855,
            original_price: '0.00',
            refund_status: 3,
            spec_value: '1111',
            spec_value_ids: '205',
            total_pay_price: '11.00',
            total_price: '11.00',
          },
        ],
        id: 47,
        order_goods_id: 855,
        order_id: 855,
        order_status: 3,
        pay_way: 3,
        refund_price: '11.00',
        refund_type: '仅退款',
        afterSaleSn: '202104071532033033',
        status: '退款成功',
        user_id: 1912,
        user: {
          avatar:
            'http://b2cdemo.likeshop.cn/uploads/user/avatar/715cc0f2f337c2a59099fc68903ad5e0.jpeg',
          base_avatar:
            'uploads/user/avatar/715cc0f2f337c2a59099fc68903ad5e0.jpeg',
          create_time: '2021-03-22 14:24:00',
          id: 1912,
          phone: '18771421011',
          username: '小黄同学',
          sex: '未知',
          user_sn: '73177848',
        },
      },
      {
        create_time: '2021-04-07 15:32:03',
        order: {
          id: 855,
          order_amount: '11.00',
          order_sn: '202104071523031094',
          order_status: '已完成',
          pay_way: '余额支付',
          total_amount: '11.00',
        },
        order_goods: [
          {
            base_image:
              'http://b2cdemo.likeshop.cn/uploads/images/202103091152406fc596654.jpeg',
            create_time: 1617780183,
            discount_price: '0.00',
            goods_id: 32,
            goods_info:
              '{"item_id":254,"goods_id":32,"goods_name":"网红芦荟棉被单双人被芯被套一体学生被芯北欧简约可爱清新","status":1,"del":0,"image":"uploads\\/images\\/202103091152406fc596654.jpeg","stock":1,"free_shipping_type":1,"free_shipping":"0.00","free_shipping_template_id":0,"spec_image":"","spec_value_str":"1111","spec_value_ids":"205","goods_price":"11.00","volume":"4.000","weight":"4.000","third_category_id":63,"goods_num":1,"image_str":"https:\\/\\/likeshop.likemarket.net\\/uploads\\/images\\/202103091152406fc596654.jpeg","is_seckill":0,"discount_price":0,"integral_price":0,"sub_price":11}',
            goods_name:
              '网红芦荟棉被单双人被芯被套一体学生被芯北欧简约可爱清新',
            goods_num: 1,
            goods_price: '11.00',
            id: 855,
            image:
              'http://b2cdemo.likeshop.cn/uploads/images/202103091152406fc596654.jpeg',
            integral_price: '0.00',
            is_comment: 1,
            is_member: 0,
            is_seckill: 0,
            item_id: 254,
            member_discount: '0.00',
            member_price: '0.00',
            order_id: 855,
            original_price: '0.00',
            refund_status: 3,
            spec_value: '1111',
            spec_value_ids: '205',
            total_pay_price: '11.00',
            total_price: '11.00',
          },
        ],
        id: 48,
        order_goods_id: 855,
        order_id: 855,
        order_status: 3,
        pay_way: 3,
        refund_price: '11.00',
        refund_type: '仅退款',
        afterSaleSn: '202104071532033033',
        status: '退款成功',
        user_id: 1912,
        user: {
          avatar:
            'http://b2cdemo.likeshop.cn/uploads/user/avatar/715cc0f2f337c2a59099fc68903ad5e0.jpeg',
          base_avatar:
            'uploads/user/avatar/715cc0f2f337c2a59099fc68903ad5e0.jpeg',
          create_time: '2021-03-22 14:24:00',
          id: 1912,
          phone: '19971237872',
          username: '大玲',
          sex: '未知',
          user_sn: '73177848',
        },
      },
    ],
    pagination: {
      rowCount: 10,
    },
  }
}

export function getAfterSaleListDetail(params) {
  return request({
    url: 'mall-admin/after-sales/detail',
    method: 'get',
    params: params,
  })
}

export function afterSalesAgree(id) {
  return request({
    url: `mall-admin/after-sales/agree/${id}`,
    method: 'put',
    // params: params,
  })
}

export function afterSalesRefuse(id) {
  return request({
    url: `mall-admin/after-sales/refuse/${id}`,
    method: 'put',
    // params: params,
  })
}

export function afterSalesTakeGoods(id) {
  return request({
    url: `mall-admin/after-sales/takeGoods/${id}`,
    method: 'put',
  })
}
export function afterSalesRefuseGoods(id) {
  return request({
    url: `mall-admin/after-sales/refuseGoods/${id}`,
    method: 'put',
  })
}

export function afterSalesConfirm(id) {
  return request({
    url: `mall-admin/after-sales/confirm/${id}`,
    method: 'put',
  })
}
