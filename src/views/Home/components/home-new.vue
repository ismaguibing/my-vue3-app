<template>
  <!-- 新鲜好物 -->
  <div class="home-new">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore></XtxMore>
      </template>
      <ul class="goods-list">
        <li v-for="i in newList" :key="i.id">
          <RouterLink to="/">
            <img :src="i.picture" alt="" />
            <p class="name ellipsis">{{i.name}}</p>
            <p class="price">&yen;{{i.price}}</p>
          </RouterLink>
        </li>
      </ul>
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
</style>
