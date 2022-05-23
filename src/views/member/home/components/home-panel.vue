<template>
  <div class="home-panel">
    <div class="header">
      <h4>{{ title }}</h4>
      <XtxMore to="/" />
    </div>
    <!-- 商品列表 -->
    <div class="goods-list">
      <GoodsItem v-for="i in 4" :key="i" :good="goods" />
    </div>
  </div>
</template>
<script>
import GoodsItem from '@/views/Category/components/goods-item.vue'
export default {
  name: 'MemberHomeOrder',
  props: {
    title: {
      type: String,
      default: ''
    }
  },

  components: { GoodsItem },

  setup () {
    const goods = {
      id: 1,
      name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
      picture: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
      desc: '清汤鲜香 红汤劲爽',
      price: '159.00'
    }
    return { goods }
  }
}
</script>
<style scoped lang="less">
.home-panel {
  background-color: #fff;
  padding: 0 20px;
  margin-top: 20px;
  height: 400px;
  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    h4 {
      font-size: 22px;
      font-weight: normal;
    }
  }
}
.goods-list {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
}
</style>
