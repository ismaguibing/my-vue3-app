import _axios from '@/utils/request.js'

/**
 * 获取结算信息
 */
export const findCheckoutInfo = () => {
  return _axios({
    method: 'get',
    url: '/member/order/pre'
  })
}

/**
 * 添加收货地址信息
 * @param {Object} address - 地址对象
 */
export const addAddress = address => {
  return _axios({
    url: '/member/address',
    method: 'post',
    data: address
  })
}

/**
 * 编辑收货地址信息
 * @param {Object} address - 地址对象
 */
export const editAddress = address => {
  return _axios({
    method: 'put',
    url: `/member/address/${address.id}`,
    data: address
  })
}

/**
 * 提交订单
 * @param {Object} order - 订单信息对象
 */
export const createOrder = order => {
  return _axios({
    method: 'post',
    url: '/member/order',
    data: order
  })
}

/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
export const findOrder = id => {
  return _axios({
    method: 'get',
    url: '/member/order/' + id
  })
}
