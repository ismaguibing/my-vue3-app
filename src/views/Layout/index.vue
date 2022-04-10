<template>
  <topnav></topnav>
  <AppHeader></AppHeader>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'

import topnav from '@/components/app-topnav.vue'
import AppHeader from './components/app-header.vue'

export default {
  name: 'Index',

  components: {
    topnav,
    AppHeader

  },

  setup () {
    const data = reactive({})
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    return {
      ...toRefs(data)
    }
  }
}

</script>
<style scoped lang='less'>
</style>
