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
