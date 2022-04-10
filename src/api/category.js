import _axios from '@/utils/request.js'

/**
 * 获取分类（头部分类）
 * @returns
 */
export const getCategoryList = function () {
  return _axios({
    url: '/home/category/head'
  })
}
