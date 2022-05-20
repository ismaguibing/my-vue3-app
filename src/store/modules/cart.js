import { getNewCartGoods, mergeLocalCart, findCartList, insertCart, deleteCart, updateCart, checkAllCart } from '@/api/cart.js'
// 购物车状态
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
    },

    // 设置购物车列表
    setCartList (state, list) {
      state.list = list
    }
  },

  actions: {
    cartInsert (context, payload) {
    //   判断用户是否登录 如果是没有登录 则提交cartAdd
    //   context.commit('cartAdd', payload, { root: true }) 调用另一个模块的的方法
      return new Promise((resolve, reject) => {
        if (context.rootState.user.proFile.token) {
          // todo  成功调 resolve  失败调 reject
          insertCart(payload).then(res => {
            context.dispatch('updateCart')
            resolve()
          })
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
          findCartList().then(res => {
            context.commit('setCartList', res.result)
          })
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
          updateCart(payload).then(() => {
            context.dispatch('updateCart')
          })
          resolve()
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
          deleteCart([skuId]).then(() => {
            ctx.dispatch('updateCart')
            resolve()
          })
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
          const ids = context.getters[isClear ? 'invalidList' : 'selectedList'].map(
            item => item.skuId
          )
          deleteCart(ids).then(() => {
            context.dispatch('updateCart')
            resolve()
          })
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
      return new Promise((resolve, reject) => {
        if (context.rootState.user.proFile.token) {
          const ids = context.getters.validList.map(item => item.skuId)
          checkAllCart({ selected: payload.selected, ids }).then(() => {
            context.dispatch('updateCart')
          })
        } else {
          context.commit('changAll', payload.selected)
          resolve()
        }
      })
    },

    // 更新sku
    updateCartSku (context, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.proFile.token) {
          // 删除旧的sku
          const oldGoods = context.state.list.find(item => item.skuId === oldSkuId)
          deleteCart([oldSkuId]).then(() => {
            return insertCart({ skuId: newSku.id, count: oldGoods.count })
          }).then(() => {
            context.dispatch('updateCart')
          })
        } else {
          // context.commit('changAll', payload.selected)
          const oldGoods = context.state.list.find(item => item.skuId === oldSkuId)
          // 2. 删除旧的商品
          context.commit('deleteCart', oldSkuId)
          // 3. 合并一条新的商品信息
          const newGoods = {
            ...oldGoods,
            skuId: newSku.id,
            nowPrice: newSku.price,
            stock: newSku.inventory,
            attrsText: newSku.specs.reduce(
              (p, v) => `${p} ${v.name}: ${v.valueName}`,
              ''
            )
          }
          // 4. 去插入即可
          context.commit('cartAdd', newGoods)
          resolve()
        }
      })
    },

    // 合并本地购物车
    async mergeLocalCart (ctx) {
    // 存储token后调用合并API接口函数进行购物合并
      const cartList = ctx.getters.validList.map(({ skuId, selected, count }) => {
        return { skuId, selected, count }
      })
      await mergeLocalCart(cartList)
      // 合并成功将本地购物车删除
      ctx.commit('setCartList', [])
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
