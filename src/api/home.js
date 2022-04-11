import _axios from '@/utils/request.js'

/**
 * 获取轮播图
 * @returns
 */
export const getBannerList = function () {
  return _axios({
    url: '/home/banner'
  })
}

/**
 * 新鲜好物
 * @returns Promise
 */
export const getNewList = () => {
  return _axios({
    url: 'home/new'
  })
}

/**
 * 人气推荐
 * @returns Promise
 */
export const getHotList = () => {
  return _axios({
    url: 'home/hot'
  })
}
