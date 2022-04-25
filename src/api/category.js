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

/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = (id) => {
  return _axios({
    method: 'get',
    url: '/category',
    params: {
      id
    }
  })
}

/**
 *  获取二级分类筛选条件数据
 * @param {String} id -  二级分类ID
 */
export const findSubCategoryFilter = (id) => {
  return _axios({
    method: 'get',
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}
