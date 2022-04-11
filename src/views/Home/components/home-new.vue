<template>
  <!-- 新鲜好物 -->
  <div class="home-new">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore></XtxMore>
      </template>
      <ul class="goods-list" v-if="newList.length>0">
        <li v-for="i in newList" :key="i.id">
          <RouterLink to="/">
            <img :src="i.picture" alt="" />
            <p class="name ellipsis">{{i.name}}</p>
            <p class="price">&yen;{{i.price}}</p>
          </RouterLink>
        </li>
      </ul>

      <div class="home-skeleton" v-else>
        <div class="item" v-for="i in 4" :key="i" :style="{ backgroundColor: '#f0f9f4' }">
          <XtxSkeleton bg="#e4e4e4" width="306px" height="306px" animated />
          <XtxSkeleton bg="#e4e4e4" width="160px" height="24px" animated />
          <XtxSkeleton bg="#e4e4e4" width="120px" height="24px" animated />
        </div>
      </div>
    </HomePanel>
  </div>

</template>

<script>
import HomePanel from './home-panel.vue'

import { getNewList } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeNew',

  components: {
    HomePanel
  },

  setup () {
    const newList = ref([])

    getNewList().then(res => {
      newList.value = res.data.result
    })

    return {
      newList
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
