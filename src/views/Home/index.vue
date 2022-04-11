<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
      </div>
    </div>
  </div>
</template>

<script>

import HomeCategory from './components/home-category.vue'

export default {

  name: 'Home',

  components: {
    HomeCategory
  },

  setup () {
  }
}

</script>
<style scoped lang='less'>
</style>
