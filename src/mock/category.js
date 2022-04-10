import { topCategory } from '@/api/constants'

import Mock from 'mockjs'

const images = [
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(1).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(2).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(3).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(5).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(6).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(7).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(8).png'
]

export const getCategoryList = () => {
  const res = topCategory.map(v => {
    const children = []

    images.forEach(v => {
      children.push(Mock.mock({
        picture: v,
        id: '@id',
        name: '@ctitle(2,4)'
      }))
    })

    return Mock.mock({
      name: v,
      id: '@id',
      children
    })
  })

  return {
    msg: '操作成功',
    result: res
  }
}
