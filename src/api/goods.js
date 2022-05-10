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

/**
 * 获取商品的评论的分页信息
 * @param {String} id - 商品ID
 */
export const findCommentListByGoods = (id, reqParams) => {
  return _axios({
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    method: 'get',
    params: reqParams
  })
}
