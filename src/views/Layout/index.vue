<template>
  <TopNav></TopNav>
  <AppHeader></AppHeader>
  <StickyHeader></StickyHeader>
  <main class="app-body">
    <RouterView></RouterView>
  </main>
  <AppFooter></AppFooter>

</template>

<script>

// vuex 使用
import { useStore } from 'vuex'

// 组件
import TopNav from './components/app-topnav.vue'
import AppHeader from './components/app-header.vue'
import AppFooter from './components/app-footer.vue'
import StickyHeader from './components/app-header-sticky.vue'

export default {

  name: 'Index',

  components: {
    TopNav,
    AppHeader,
    AppFooter,
    StickyHeader
  },

  setup () {
    const store = useStore()
    store.dispatch('category/getList')

    return {
    }
  }
}

</script>
<style scoped lang='less'>
.app-body {
  min-height: 600px;
}
</style>
