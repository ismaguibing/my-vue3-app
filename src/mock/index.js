// 提供数据
import Mock from 'mockjs'
import { getCategoryList } from './category'
Mock.setup({
  // 时间延迟
  timeout: '500-1000'
})

/**
 * #参数1 请求地址
 * #参数2 请求方式
 * #参数3 回调函数
 */
Mock.mock(/\/home\/category\/head/, 'get', getCategoryList)
