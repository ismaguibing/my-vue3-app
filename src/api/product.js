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

/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
 * @param {Number} limit - 获取个数
 */
export const findHotGoods = (id, type, limit = 3) => {
  return _axios({
    method: 'get',
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  })
}
