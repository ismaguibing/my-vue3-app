<template>
  <div class="order-item">
    <div class="head">
      <span>下单时间：{{order.createTime}}</span>
      <span>订单编号：{{order.id}}</span>
      <!-- 未付款，倒计时时间还有 -->
      <span class="down-time" v-if="order.orderState===1">
        <i class="iconfont icon-down-time"></i>
        <b v-if="order.countdown>0">付款截止：{{showTime}}</b>
        <b v-else>该订单以超时</b>
      </span>
      <!-- 已完成 已取消 -->
      <a v-if="[5,6].includes(order.orederState)" href="javascript:;" class="del">删除</a>
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="goods in order.skus" :key="goods.id">
            <a class="image" href="javascript:;">
              <img :src="goods.image" alt="" />
            </a>
            <div class="info">
              <p class="name ellipsis-2">{{goods.name}}</p>
              <p class="attr ellipsis">{{goods.attrsText}}</p>
            </div>
            <div class="price">¥{{goods.realPay}}</div>
            <div class="count">x{{goods.quantity}}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{orderStatus[order.orderState].label}}</p>
        <!-- 待收货：查看物流 -->
        <!-- 待评价：评价商品 -->
        <!-- 已完成：查看评价 -->
        <p v-if="order.orderState===3"><a href="javascript:;" class="green" @click=" $emit('onLogistics', order)">查看物流</a></p>
        <p v-if=" order.orderState===4"><a href="javascript:;" class="green">评价商品</a></p>
        <p v-if="order.orderState===5"><a href="javascript:;" class="green">查看评价</a></p>
      </div>
      <div class="column amount">
        <p class="red">¥{{order.payMoney}}</p>
        <p>（含运费：¥{{order.postFee}}）</p>
        <p>在线支付</p>
      </div>
      <div class="column action">
        <!-- 待支付：立即付款，查看详情，取消订单 -->
        <!-- 待发货：查看详情，再次购买 -->
        <!-- 待收货：确认收货，查看详情，再次购买 -->
        <!-- 待评价：查看详情，再次购买，申请售后 -->
        <!-- 已完成：查看详情，再次购买，申请售后 -->
        <!-- 已取消：查看详情 -->
        <XtxButton v-if="order.orderState===1" type="primary" size="small" @click="$router.push(`/member/pay?id=${order.id}`)">立即付款</XtxButton>
        <XtxButton v-if="order.orderState===3" type="primary" size="small" @click="$emit('confirmOrder', order)">确认收货</XtxButton>
        <p>
          <RouterLink :to="`/member/order/${order.id}`">
            查看详情
          </RouterLink>
        </p>
        <p v-if="order.orderState===1"><a href="javascript:;" @click="cancelOrder(order.id)">取消订单</a></p>
        <p v-if="[5, 6].includes(order.orderState)">
          <a @click="$emit('deleteOrder', order)" href="javascript:;" class="del">删除</a>
        </p>
        <p v-if="[2,3,4,5].includes(order.orderState)"><a href="javascript:;">再次购买</a></p>
        <p v-if="[4,5].includes(order.orderState)"><a href="javascript:;">申请售后</a></p>
      </div>
    </div>
  </div>
</template>
<script>
import { orderStatus } from '@/api/constants'
import { formatPayTime } from '@/hooks/index.js'
export default {
  name: 'OrderItem',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props, { emit }) {
    // 1. order.payLatestTime 最后支付时间
    // 2. 需要求出倒计时的秒数
    // 3. 使用 useIntervalFn 进行倒计时
    // 4. 使用 dayjs.unix().format() 进行格式转换
    // 5. 申明一个响应式数据接收文字
    // const countdownText = ref('')
    // let countdown = Math.floor((new Date(props.order.payLatestTime) - Date.now()) / 1000)
    // const { pause, resume } = useIntervalFn(() => {
    //   countdown--
    //   countdownText.value = dayjs.unix(countdown).format('mm分ss秒')
    //   if (countdown <= 0) {
    //     pause()
    //   }
    // }, 1000, false)
    // if (countdown > 0) {
    //   countdownText.value = dayjs.unix(countdown).format('mm分ss秒')
    //   resume()
    // }
    // return { orderStatus, countdownText }
    const { showTime, start } = formatPayTime()
    start(props.order.countdown)

    // 取消订单cancelOrder 父组件做 （子传父）
    const cancelOrder = (id) => {
      emit('cancelOrder', id)
    }

    const delOrder = (v) => {
      emit('deleteOrder', v)
    }

    return {
      showTime,
      orderStatus,
      cancelOrder,
      delOrder
    }
  }
}
</script>
<style scoped lang="less">
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
