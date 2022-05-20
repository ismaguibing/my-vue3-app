import _axios from '@/utils/request.js'

/**
 * 获取新的商品信息
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getNewCartGoods = skuId => {
  return _axios({
    method: 'get',
    url: `/goods/stock/${skuId}`
  })
}

/**
 * 获取商品的specs和skus
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getSpecsAndSkus = skuId => {
  return _axios({
    method: 'get',
    url: `/goods/sku/${skuId}`
  })
}

/**
 * 合并本地购物车
 * @param {Array<object>} cartList - 本地购物车数组
 * @param {String} item.skuId - 商品SKUID
 * @param {Boolean} item.selected - 是否选中
 * @param {Integer} item.count - 数量
 */
export const mergeLocalCart = cartList => {
  return _axios({
    method: 'post',
    url: '/member/cart/merge',
    data: cartList
  })
}

/**
 * 获取登录后的购物车列表
 * @returns Promise
 */
export const findCartList = () => {
  return _axios({
    method: 'get',
    url: '/member/cart'
  })
}
