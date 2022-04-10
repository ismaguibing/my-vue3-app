import { createStore } from 'vuex'

import category from './modules/category'

export default createStore({
  // 严格模式
  strict: process.env.NODE_ENV === 'development',

  modules: {
    category
  }

})
