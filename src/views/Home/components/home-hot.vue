<template>
  <div class="home-hot">
    <!-- 人气推荐 -->
    <HomePanel title="人气推荐" subTitle="人气推荐 不容错过">
      <transition name="fade">
        <ul ref="pannel" class="goods-list" v-if="hotList.length>0">
          <li v-for="i in hotList" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" alt="">
              <p class="name">{{i.title}}</p>
              <p class="desc">{{i.alt}}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else></HomeSkeleton>
      </transition>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { ref } from 'vue'

import { getHotList } from '@/api/home'
export default {
  name: 'HomeHot',

  components: {
    HomePanel,
    HomeSkeleton
  },

  setup () {
    const hotList = ref([])

    getHotList().then(res => {
      hotList.value = res.data.result
    })

    return {
      hotList
    }
  }

}

</script>
<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
