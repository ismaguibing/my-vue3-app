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

/**
 * 获取商品同类推荐
 * @param {String} id - 商品ID
 * @param {Number} limit - 获取条数
 */
export const findRelGoods = (id, limit = 16) => {
  return _axios({
    method: 'get',
    url: '/goods/relevant',
    params: {
      id,
      limit
    }
  })
}
