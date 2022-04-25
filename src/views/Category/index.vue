<template>
  <div class="container top-category">
    <!-- 这里可以传icon -->
    <!-- <XtxBread :icon='图标类名'> -->
    <XtxBread>
      <XtxBreadItem to='/'>首页</XtxBreadItem>
      <XtxBreadItem>{{category?.name}}</XtxBreadItem>
    </XtxBread>

    <!-- 轮播图 -->
    <XtxCarousel :bannerList="slides" style="height:500px" :duration='1000' :autoplay='true' />

    <!-- 所有二级分类 -->
    <div class="sub-list">
      <h3>全部分类</h3>
      <ul>
        <li v-for="item in category?.children" :key="item.id">
          <a href="javascript:;">
            <img :src="item.picture" />
            <p>{{ item.name }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { getBannerList } from '@/api/home'

export default {
  name: 'TopCategory',

  setup () {
    const store = useStore()
    const route = useRoute()
    const slides = ref([])

    const category = computed(() => {
      return store.state.category.list.find(v => v.id === route.params.id)
    })

    // 获取轮播图数据
    getBannerList().then(res => {
      slides.value = res.result
    })

    return {
      category,
      slides

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
</style>
