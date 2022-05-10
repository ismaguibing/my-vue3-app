<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">同类商品推荐</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :bannerList="list" style="height:380px" :duration='1000' :autoplay='true'></XtxCarousel>
  </div>
</template>

<script>
import { findRelGoods } from '@/api/product.js'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',

  setup () {
    const route = useRoute()
    const list = ref([])
    watch(() => route.params.id, async (v) => {
      list.value = []
      const res = await findRelGoods(v)
      const num = 4
      // 整个数组的长度
      const length = Math.ceil(res.result.length / num)
      for (let i = 0; i < length; i++) {
        list.value.push(res.result.slice(num * i, num * (i + 1)))
      }
    }, { immediate: true })

    return {
      list
    }
  }
}
</script>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}

:deep(.xtx-carousel) {
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
