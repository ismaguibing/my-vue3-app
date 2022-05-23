<template>
  <div class="container">
    <MemberAside />
    <div class="article">
      <!-- 三级路由的出口 -->
      <RouterView />
    </div>
  </div>
</template>
<script>
import MemberAside from './components/member-aside.vue'
export default {
  name: 'Member',
  components: {
    MemberAside
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
  }
}
</style>
