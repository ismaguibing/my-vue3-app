import { getNewCartGoods } from '@/api/cart.js'
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
    },

    updateCart (state, goods) {
      const sku = state.list.find(item => item.skuId === goods.skuId)
      //   sku.isEffective = goods.isEffective
      //   sku.nowPrice = goods.nowPrice
      //   sku.stock = goods.stock
      for (const k in goods) {
        // 遍历goods对象
        if (goods[k] !== null && goods[k] !== undefined && goods[k] !== '') {
          sku[k] = goods[k]
        }
      }
    },

    // 删除购物车商品
    deleteCart (state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    },

    // changAll
    changAll (state, val) {
      state.list.forEach(v => {
        v.selected = val
      })
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
    },

    // 更新购物车中的所有购物信息
    updateCart (context, payload) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.proFile.token) {
          // todo  成功调 resolve  失败调 reject

        } else {
          const reqArr = context.state.list.map(v => {
            return getNewCartGoods(v.skuId)
          })

          Promise.all(reqArr).then(res => {
            res.forEach((v, i) => {
              context.commit('updateCart', {
                skuId: context.state.list[i].skuId,
                ...v.result
              })
            })
            resolve()
          })
        }
      })
    },

    //
    updateChange (context, payload) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.proFile.token) {
          // todo
        } else {
          context.commit('updateCart', payload)
          resolve()
        }
      })
    },

    // 删除购物车商品
    deleteCart (ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.proFile.token) {
          // 登录 TODO
        } else {
          // 本地
          ctx.commit('deleteCart', skuId)
          resolve()
        }
      })
    },

    // 批量删除
    batchDelete (context, isClear) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.proFile.token) {
          // 登录 TODO
        } else {
          // 本地
          context.getters[isClear ? 'invalidList' : 'selectedList'].forEach(v => {
            context.commit('deleteCart', v.skuId)
          })
          resolve()
        }
      })
    },

    // changeAll
    changeAll (context, payload) {
      if (context.rootState.user.proFile.token) {

      } else {
        context.commit('changAll', payload.selected)
      }
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
    },

    // 无效商品列表
    invalidList (state) {
      return state.list.filter(item => !(item.stock > 0 && item.isEffective))
    },
    // 选中商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + (c.nowPrice * 100 * c.count), 0) / 100
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
    }
  }
}
