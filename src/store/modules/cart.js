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
  }
}
