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
    })

    onMounted(() => {
    })

    return {
      ...toRefs(data)
    }
  }
}

</script>
<style scoped lang='less'>
</style>
