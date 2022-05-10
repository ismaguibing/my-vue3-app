import _axios from '@/utils/request.js'

/**
 * 获取商品的评价统计信息
 * @param {String} id - 商品ID
 */
export const findCommentInfoByGoods = id => {
  return _axios({
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    method: 'get'
  })
}
