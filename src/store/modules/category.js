import { getCategoryList } from '@/api/category'
// 顶级分类
import { topCategory } from '@/api/constants'

export default {
  namespaced: true,

  state: {
    list: topCategory.map(v => ({ name: v })) // 解决进入首页头部导航空白问题 ， 请求未完成
  },

  mutations: {
    // 获取商品分类列表
    setList (state, list) {
      state.list = list
    },

    // 显示
    show (state, { id }) {
      const target = state.list.find(v => v.id === id)
      target.open = true
    },

    // 隐藏
    hide (state, { id }) {
      const target = state.list.find(v => v.id === id)
      target.open = false
    }
  },

  actions: {
    async  getList ({ commit }) {
      const res = await getCategoryList()
      res.result.forEach(v => {
        v.open = false
      })
      commit('setList', res.result)
    }
  }
}
