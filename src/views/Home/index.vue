<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <HomeBanner />
      </div>
    </div>
  </div>
</template>

<script>

import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
export default {

  name: 'Home',

  components: {
    HomeCategory,
    HomeBanner
  }

}

</script>
<style scoped lang='less'>
</style>
