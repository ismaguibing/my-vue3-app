import _axios from '@/utils/request.js'

/**
 * 获取分类（头部分类）
 * @returns
 */
export const getCategoryList = function () {
  return _axios({
    url: '/home/category/head',
    method: 'get'
  })
}

/**
 * 获取category底部品牌列表
 * @param {*} limit
 * @returns
 */
export const brandList = function (limit = 6) {
  return _axios({
    url: `/home/brand?limit=${limit}`
  })
}
