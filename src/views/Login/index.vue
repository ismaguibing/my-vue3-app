<template>
  <div class="login">
    登录页
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'

export default {

  name: 'Login',

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
<style scoped lang="less"></style>
