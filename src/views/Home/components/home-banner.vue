<template>
  <div class="home-banner">
    <!-- 轮播图
    bannerList 数据
    duration 间隔时间
    autoplay 自动播放
    -->
    <XtxCarousel :bannerList='bannerList' :duration='1000' autoplay></XtxCarousel>
  </div>
</template>

<script>
import { ref } from 'vue'

import { getBannerList } from '@/api/home'

export default {
  name: 'HomeBanner',

  setup () {
    const bannerList = ref([])

    // 获取轮播图
    getBannerList().then(res => {
      bannerList.value = res.data.result
    })

    return {
      bannerList
    }
  }
}

</script>
<style scoped lang='less'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  background-color: transparent;
  ::v-deep {
    .carousel-btn.prev {
      left: 270px;
    }
    .carousel-indicator {
      padding-left: 250px;
    }
  }
}
</style>
