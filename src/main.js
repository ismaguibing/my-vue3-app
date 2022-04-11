import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import '@/assets/styles/common.less'

// import '@/mock/index' // mock模拟数据
import XtxUI from '@/components' // 统一组件引入

createApp(App).use(store).use(router).use(XtxUI).mount('#app')
