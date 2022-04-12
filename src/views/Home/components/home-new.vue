<template>
  <!-- 新鲜好物 -->
  <div class="home-new">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱" ref="target">
      <template #right>
        <XtxMore></XtxMore>
      </template>
      <transition name="fade">
        <ul class="goods-list" v-if="list.length>0">
          <li v-for="i in list" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" alt="" />
              <p class="name ellipsis">{{i.name}}</p>
              <p class="price">&yen;{{i.price}}</p>
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
import { useLazyData } from '@/hooks'
import { getNewList } from '@/api/home'
export default {
  name: 'HomeNew',

  components: {
    HomePanel,
    HomeSkeleton
  },

  setup () {
    const { list, target } = useLazyData(getNewList)
    return {
      list,
      target
    }
  }

}

</script>
<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
