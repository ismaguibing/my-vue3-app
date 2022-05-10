<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <GoodsItem v-for="item in goodsList" :key="item" :good="item" />
  </div>
</template>
<script>
import GoodsItem from '@/views/Category/components/goods-item.vue'
import { findHotGoods } from '@/api/product'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'GoodsHot',
  components: {
    GoodsItem
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: '24小时热榜'
    }
  },

  setup (props) {
    const goodsList = ref([])
    const route = useRoute()
    watch(() => route.params.id, async () => {
      const res = await findHotGoods({ id: route.params.id, type: props.type })
      goodsList.value = res.result
    }, { immediate: true })
    return {
      goodsList
    }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
}
</style>
