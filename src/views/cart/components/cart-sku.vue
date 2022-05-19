<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{attrsText}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="show" ref="target">
      <!-- GoodsSku -->
      <goodsSku @changeSku='changeSku' :goods='goods' :skuId="skuId"></goodsSku>
      <XtxButton type="primary" size="mini" style="margin-left:60px" @click="submit">
        确认
      </XtxButton>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import goodsSku from '@/views/goods/components/goods-sku.vue'
import { getSpecsAndSkus } from '@/api/cart.js'
import { Message } from '@/components'
export default {
  name: 'CartSku',

  components: {
    goodsSku
  },

  props: {
    attrsText: {
      type: String
    },
    skuId: {
      type: String
    }
  },

  setup (props, { emit }) {
    const show = ref(false)
    const goods = ref({})

    const toggle = () => {
      show.value = !show.value
    }

    const target = ref(null)
    onClickOutside(target, () => {
      show.value = false
    })

    //  获取商品信息
    getSpecsAndSkus(props.skuId).then(res => {
      goods.value = res.result
    })

    const currnetSku = ref({})
    const changeSku = (sku) => {
      currnetSku.value = sku
    }

    const submit = () => {
      // 给购物车组件数据的前提：有sku信息，sku信息完整，sku中的skuId不能现有props.skuId一样
      if (currnetSku.value.id && currnetSku.value.id !== props.skuId) {
        emit('change', currnetSku.value)
        show.value = false
      } else {
        Message({ type: 'warning', text: '请修改规格' })
      }
    }

    return {
      show,
      toggle,
      target,
      goods,
      currnetSku,
      changeSku,
      submit
    }
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
  }
}
</style>
