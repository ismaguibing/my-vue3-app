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

/**
 * 查询订单列表
 * @param {Number} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @param {Number} page - 页码
 * @param {Number} pageSize - 每页条数
 * @returns
 */
export const findOrderList = ({ orderState = 0, page = 1, pageSize = 10 }) => {
  return _axios({ url: '/member/order', method: 'get', params: { orderState, page, pageSize } })
}

/**
 * 取消订单
 * @param {String} orderId - 订单ID
 * @param {String} cancelReason - 取消原因
 * @returns Promise
 */
export const cancelOrder = (orderId, cancelReason) => {
  return _axios({
    method: 'put',
    url: `/member/order/${orderId}/cancel`,
    data: { cancelReason }
  })
}

/**
 * 删除订单
 * @param {Array<string>} ids - 删除订单，id集合
 * @returns
 */
export const delteOrder = ids => {
  return _axios({
    method: 'delete',
    url: '/member/order',
    data: {
      ids
    }
  })
}

/**
 * 确认收货
 */
export const confirmOrder = orderId => {
  return _axios({
    method: 'put',
    url: `/member/order/${orderId}/receipt`
  })
}
