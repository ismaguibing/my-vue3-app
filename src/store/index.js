import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import category from './modules/category'
import user from './modules/user'
import cart from './modules/cart'

export default createStore({
  // 严格模式
  strict: process.env.NODE_ENV === 'development',

  plugins: [createPersistedState({
    key: 'rabbit-vue-hm-83',
    paths: ['user', 'cart']
    // 可以指定存储在哪里
    // storage: sessionstorage / localstorage
  })],

  modules: {
    category,
    user,
    cart
  }

})
