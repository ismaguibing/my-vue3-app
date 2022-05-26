<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>填写订单</XtxBreadItem>
      </XtxBread>
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <!-- <div class="address">
            <div class="text">
              <ul>
                <li><span>收<i />货<i />人：</span>朱超</li>
                <li><span>联系方式：</span>132****2222</li>
                <li><span>收货地址：</span>海南省三亚市解放路108号物质大厦1003室</li>
              </ul>
              <a href="javascript:;">修改地址</a>
            </div>
            <div class="action">
              <XtxButton class="btn">切换地址</XtxButton>
              <XtxButton class="btn">添加地址</XtxButton>
            </div>
          </div> -->
          <CheckoutAddress :userAddresses='info.userAddresses' v-if="info.userAddresses" @changeAddress='changeAddress'></CheckoutAddress>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in info.goods" :key="i.skuId">
                <td>
                  <router-link :to="`/product/${i.id}`" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{i.name}}</p>
                      <p>{{i.attrsText}}</p>
                    </div>
                  </router-link>
                </td>
                <td>&yen;{{i.price}}</td>
                <td>{{i.count}}</td>
                <td>&yen;{{i.totalPrice}}</td>
                <td>&yen;{{i.totalPayPrice}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{info.summary?.goodsCount}}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{info.summary?.totalPrice}}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{info.summary?.postFee}}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">¥{{info.summary?.totalPayPrice}}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <XtxButton type="primary" @click="submitOrder">提交订单</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { findCheckoutInfo, createOrder, findOrderRepurchase } from '@/api/order'
import { provide, reactive, ref } from 'vue'
import CheckoutAddress from './components/checkout-address.vue'
import { Message } from '@/components'
import { useRouter, useRoute } from 'vue-router'
export default {
  name: 'XtxPayCheckoutPage',

  components: {
    CheckoutAddress
  },

  setup () {
    const info = ref({})
    const router = useRouter()
    const route = useRoute()

    const getAddressList = () => {
      if (route.query.orderId) {
        // 再次购买结算
        findOrderRepurchase(route.query.orderId).then(data => {
          info.value = data.result
          // 设置订单商品数据
          reqParams.goods = data.result.goods.map(({ skuId, count }) => ({ skuId, count }))
        })
      } else {
        findCheckoutInfo().then(res => {
          info.value = res.result
          reqParams.goods = res.result.goods.map(v => {
            return {
              skuId: v.skuId,
              count: v.count
            }
          })
        })
      }
    }

    getAddressList()

    provide('getAddressList', getAddressList)

    // 接收地址Id
    const changeAddress = (v) => {
      console.log(v)
      reqParams.addressId = v
    }

    // reqParams
    const reqParams = reactive({
      addressId: null,
      deliveryTimeType: 1,
      payType: 1,
      buyerMessage: '',
      goods: []
    })

    // 提交订单
    const submitOrder = async () => {
      if (!reqParams.addressId) return Message({ type: 'warning', text: '请选择收货地址' })
      const res = await createOrder(reqParams)
      router.push({ path: '/member/pay', query: { id: res.result.id } })
    }

    return {
      info,
      changeAddress,
      submitOrder
    }
  }
}
</script>
<style scoped lang="less">
.xtx-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: @xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>
