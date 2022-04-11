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
