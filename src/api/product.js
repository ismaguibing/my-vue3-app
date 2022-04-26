import _axios from '@/utils/request.js'

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const findGoods = id => {
  return _axios({
    method: 'get',
    url: '/goods',
    params: {
      id
    }
  })
}
