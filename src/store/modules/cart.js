export default {
  namespaced: true,

  state: {
    list: []
  },

  mutations: {
    // 加入购物车
    cartAdd (state, payload) {
      const idx = state.list.findIndex(v => v.skuId === payload.skuId)
      if (idx > -1) {
        payload.count += state.list[idx].count
        state.list.splice(idx, 1)
      }
      state.list.unshift(payload)
    }
  },

  actions: {
    cartInsert (context, payload) {
    //   判断用户是否登录 如果是没有登录 则提交cartAdd
    //   context.commit('cartAdd', payload, { root: true }) 调用另一个模块的的方法
      return new Promise((resolve, reject) => {
        if (context.rootState.user.proFile.token) {
          // todo  成功调 resolve  失败调 reject

        } else {
          context.commit('cartAdd', payload)
          resolve()
        }
      })
    }
  },

  getters: {
    // 有效商品列表
    validList (state) {
      return state.list.filter(v => v.stock > 0 && v.isEffective)
    },
    // 有效商品总数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
    }
  }
}
