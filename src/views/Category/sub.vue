<template>
  <div class="category">二级分类组件</div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: 'SubCategory',
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
