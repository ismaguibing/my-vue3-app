<template>
  <div class="container top-category">
    <!-- 这里可以传icon -->
    <!-- <XtxBread :icon='图标类名'> -->
    <XtxBread>
      <XtxBreadItem to='/'>首页</XtxBreadItem>
      <transition name="fade-right" mode="out-in">
        <XtxBreadItem :key="category?.id">{{category?.name}}</XtxBreadItem>
      </transition>
    </XtxBread>

    <!-- 轮播图 -->
    <XtxCarousel :bannerList="slides" style="height:500px" :duration='1000' :autoplay='true' />

    <!-- 所有二级分类 -->
    <div class="sub-list">
      <h3>全部分类</h3>
      <ul style="height:160px;">
        <li v-for="item in category?.children" :key="item.id">
          <a href="javascript:;">
            <img :src="item.picture" />
            <p>{{ item.name }}</p>
          </a>
        </li>
      </ul>
    </div>

    <!-- 分类关联商品 -->
    <div class="ref-goods" v-for="item in subList" :key="item.id">
      <div class="head">
        <h3>- {{ item.name }} -</h3>
        <p class="tag">{{ item.desc }}</p>
        <XtxMore />
      </div>
      <div class="body">
        <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
      </div>
    </div>

  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { getBannerList } from '@/api/home'
import { findTopCategory } from '@/api/category'
import GoodsItem from './components/goods-item.vue'
export default {
  name: 'TopCategory',

  components: {
    GoodsItem
  },

  setup () {
    const store = useStore()
    const route = useRoute()
    const slides = ref([])
    const subList = ref([])

    const category = computed(() => {
      return store.state.category.list.find(v => v.id === route.params.id)
    })

    // 获取轮播图数据
    getBannerList().then(res => {
      slides.value = res.result
    })

    // findTopCategory(route.params.id).then(data => {
    //   subList.value = data.result.children
    // })

    watch(() => route.params.id, value => {
      // 如果切换到了2级分类，那么久不应该发送请求了
      if (route.path.includes('/sub')) return
      findTopCategory(value).then(data => {
        subList.value = data.result.children
      })
    }, { immediate: true })

    return {
      category,
      slides,
      subList
    }
  }

}

</script>

<style scoped lang='less'>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
