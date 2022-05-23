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
