<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <XtxCheckbox :modelValue='isCheckAll' @change="changeAll">全选</XtxCheckbox>
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-for="i in $store.getters['cart/validList']" :key="i.skuId">
              <td>
                <XtxCheckbox :modelValue='i.selected' @change="changeChecked(i.skuId, $event)" />
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${i.id}`"><img :src="i.picture" alt=""></RouterLink>
                  <div>
                    <p class="name ellipsis">{{i.name}}</p>
                    <!-- 选择规格组件 -->
                    <!-- <p class="attr">{{i.attrsText}}</p> -->
                    <cartSku :attrsText='i.attrsText' :skuId='i.skuId' @change="updateCartSku(i.skuId, $event)"></cartSku>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{i.nowPrice}}</p>
                <p v-if="i.price-i.nowPrice>0">比加入时降价 <span class="red">&yen;{{i.price-i.nowPrice}}</span></p>
              </td>
              <td class="tc">
                <XtxNumbox :modelValue='i.count' @change='changeCount(i.skuId,$event)' />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{i.price*i.count}}</p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a class="green" href="javascript:;" @click="del(i.skuId)">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
            <tr v-if="$store.getters['cart/validList'].length===0">
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody>
            <tr v-if="$store.getters['cart/invalidList'].length>0">
              <td colspan="6">
                <h3 class="tit">失效商品</h3>
              </td>
            </tr>
            <tr v-for="i in $store.getters['cart/invalidList']" :key="i">
              <td>
                <XtxCheckbox style="color:#eee;" />
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${i.id}`"><img :src="i.picture" alt=""></RouterLink>
                  <div>
                    <p class="name ellipsis">{{i.name}}</p>
                    <p class="attr">{{i.attrsText}}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{i.nowPrice}}</p>
              </td>
              <td class="tc">{{i.count}}</td>
              <td class="tc">
                <p>&yen;{{i.nowPrice*i.count}}</p>
              </td>
              <td class="tc">
                <p><a class="green" href="javascript:;" @click="del(i.skuId)">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <XtxCheckbox :modelValue="isCheckAll" @change="changeAll">全选</XtxCheckbox>
          <a href="javascript:;" @click="batchDelete(false)">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="batchDelete(true)">清空失效商品</a>
        </div>
        <div class="total">
          共 {{validTotal}}件商品，已选择 {{selectedTotal}} 件，商品合计：
          <span class="red">¥{{selectedAmount}}</span>
          <XtxButton type="primary" @click="goCheckout">下单结算</XtxButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodRelevant />
    </div>
  </div>
</template>
<script>
import GoodRelevant from '@/views/goods/components/goods-relevant'
import cartSku from './components/cart-sku.vue'
import CartNone from '@/views/cart/components/cart-none.vue'
import { Message, confirm } from '@/components'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'XtxCartPage',

  components: {
    GoodRelevant,
    CartNone,
    cartSku
  },

  setup () {
    const store = useStore()
    const router = useRouter()
    const invalidList = computed(() => store.getters['cart/invalidList'])
    const validTotal = computed(() => store.getters['cart/validTotal'])
    const selectedList = computed(() => store.getters['cart/selectedList'])
    const selectedTotal = computed(() => store.getters['cart/selectedTotal'])
    const selectedAmount = computed(() => store.getters['cart/selectedAmount'])
    const isCheckAll = computed(() => store.getters['cart/isCheckAll'])

    const changeChecked = (v, event) => {
      store.dispatch('cart/updateChange', {
        skuId: v,
        selected: event
      })
    }

    const changeCount = (v, event) => {
      store.dispatch('cart/updateChange', {
        skuId: v,
        count: event
      })
      console.log(v, event)
    }

    const changeAll = (event) => {
      store.dispatch('cart/changeAll', { selected: event })
    }

    const del = async skuId => {
      try {
        await confirm({ title: '温馨提示', text: '您确定从购物车删除该商品吗?' })
        store.dispatch('cart/deleteCart', skuId)
      } catch {
        console.log('点击了取消')
      }
    }

    // 批量删除商品 或者删除无效商品   isClear 是否清空无效商品
    const batchDelete = async (isClear) => {
      try {
        await confirm({ text: `您确定从购物车删除${isClear ? '失效' : '选中'}的商品吗？` })
      } catch {
        console.log('点击了取消')
      }
      store.dispatch('cart/batchDelete', isClear)
    }

    const updateCartSku = (oldSkuId, newSku) => {
      store.dispatch('cart/updateCartSku', { oldSkuId, newSku })
    }

    // 去结算
    const goCheckout = () => {
      if (store.getters['cart/selectedList'].length === 0) return Message({ type: 'warning', text: '请至少选择一件商品' })

      if (!store.state.user.proFile.token) {
        return confirm({ text: '结算功能需要登录，您是否要跳转到登录?' })
          .then(() => {
            // 点了确定
            router.push('/member/checkout')
          })
          .catch((e) => {
          })
      }
      router.push('/member/checkout')
    }

    return {
      invalidList,
      selectedList,
      selectedTotal,
      selectedAmount,
      validTotal,
      isCheckAll,
      changeChecked,
      changeCount,
      changeAll,
      del,
      batchDelete,
      updateCartSku,
      goCheckout
    }
  }
}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
