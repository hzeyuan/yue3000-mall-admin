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
