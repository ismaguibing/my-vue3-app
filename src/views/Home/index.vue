<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
      </div>

      <HomeNew />
      <HomeHot />
    </div>
  </div>
</template>

<script>
// import HomePanel from './components/home-panel.vue'

import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
export default {

  name: 'Home',

  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot
    // HomePanel,
  }

}

</script>
