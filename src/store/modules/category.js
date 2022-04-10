import { getCategoryList } from '@/api/category'
export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    // 获取商品分类列表
    setList (state, list) {
      state.list = list
    }
  },
  actions: {
    async  getList ({ commit }) {
      const res = await getCategoryList()
      commit('setList', res.data.result)
    }
  },
  modules: {
  }

}
