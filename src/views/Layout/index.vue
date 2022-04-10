<template>
  <topnav></topnav>
  <AppHeader></AppHeader>
  <main class="app-body">
    <RouterView></RouterView>
  </main>
  <AppFooter></AppFooter>

</template>

<script>

import { reactive, toRefs, onBeforeMount, onMounted, computed } from 'vue'

// vuex 使用
import { useStore } from 'vuex'

// 组件
import topnav from '@/components/app-topnav.vue'
import AppHeader from './components/app-header.vue'
import AppFooter from './components/app-footer.vue'

export default {

  name: 'Index',

  components: {
    topnav,
    AppHeader,
    AppFooter
  },

  setup () {
    // const data = reactive({})

    // onBeforeMount(() => {
    //   console.log('2.组件挂载页面之前执行----onBeforeMount')
    // })

    // onMounted(() => {
    //   console.log('3.-组件挂载到页面之后执行-------onMounted')
    // })

    return {
      //   ...toRefs(data)
    }
  }
}

</script>
<style scoped lang='less'>
.app-body {
  min-height: 600px;
}
</style>
