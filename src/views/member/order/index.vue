<template>
  <XtxTabs v-model="activeName">
    <XtxTabsPanel v-for="v in orderStatus" :key="v.name" :label='v.label' :name='v.name'>1</XtxTabsPanel>
  </XtxTabs>
</template>

<script>
import { ref } from 'vue'
import { orderStatus } from '@/api/constants'
export default {
  setup () {
    const activeName = ref('all')

    return {
      activeName,
      orderStatus
    }
  }
}

</script>
<style scoped lang='less'>
</style>
