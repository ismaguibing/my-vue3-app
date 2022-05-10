<template>
  <div class='xtx-goods-page'>
    <div class="container">
      <!-- 面包屑 -->
      <div style="height:72px;">
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
          <XtxBreadItem :to="`/category/${goods?.categories[1].id}`">
            {{ goods?.categories[1].name }}
          </XtxBreadItem>
          <XtxBreadItem :to="`/category/sub/${goods?.categories[0].id}`">
            {{ goods?.categories[0].name }}
          </XtxBreadItem>
          <transition name="fade-right" mode="out-in">
            <XtxBreadItem :key="Math.random()">{{ goods?.name }}</XtxBreadItem>
          </transition>
        </XtxBread>
      </div>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods?.mainPictures"></GoodsImage>
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <!-- 商品规格 -->
          <GoodsSku :goods="goods" v-if="goods?.id" @changeSku='changeSku'></GoodsSku>
          <!-- 商品数量 -->
          <XtxNumbox v-model="num" label='数量'></XtxNumbox>
          <!-- 加入购物车 -->
          <XtxButton type="primary" style="margin-top:20px;">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs></GoodsTabs>
          <!-- 注意事项 -->
          <GoodsWarn></GoodsWarn>
        </div>
        <!-- 24热榜+专题推荐 -->
        <!-- <div class="goods-aside"></div> -->
        <div class="goods-aside">
          <GoodsHot v-for="item in hotArr" :type="item.id" :title="item.title" :Key="item.id"></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsWarn from './components/goods-warn.vue'
import GoodsHot from './components/goods-hot.vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'
import { provide, ref, watch } from 'vue'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTabs,
    GoodsWarn,
    GoodsHot
  },
  setup () {
    const goods = useGood()
    const num = ref(1)

    const hotArr = ref([
      {
        id: 1,
        title: '24小时热销榜'
      },
      {
        id: 2,
        title: '周热销榜'
      },
      {
        id: 3,
        title: '总热销榜'
      }
    ])

    const changeSku = (sku) => {
      if (sku.id) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }

    // 提供商品数据
    provide('goods', goods)

    return {
      goods,
      changeSku,
      num,
      hotArr
    }
  }
}

const useGood = () => {
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, v => {
    if (!route.path.includes('/product')) return
    findGoods(route.params.id).then(res => {
      goods.value = res.result
    })
  }, {
    immediate: true
  })

  return goods
}

</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
