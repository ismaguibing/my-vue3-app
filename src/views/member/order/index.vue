<template>
  <XtxTabs v-model="activeName">
    <XtxTabsPanel v-for="v in orderStatus" :key="v.name" :label='v.label' :name='v.name'></XtxTabsPanel>
  </XtxTabs>

  <div class="order-list">
    <OrderItem v-for="v in orderList" :key="v" :order='v'></OrderItem>
  </div>

  <!-- 分页 -->
  <XtxPagination></XtxPagination>
</template>

<script>
import { reactive, ref } from 'vue'
import { orderStatus } from '@/api/constants'
import { findOrderList } from '@/api/order.js'
import OrderItem from './components/order-item.vue'
export default {
  components: {
    OrderItem
  },

  setup () {
    const activeName = ref('all')
    const reqParams = reactive({
      orderState: 0,
      page: 1,
      pageSize: 10
    })

    const orderList = ref(null)
    findOrderList(reqParams).then(res => {
      orderList.value = res.result.items
    })

    return {
      activeName,
      orderStatus,
      orderList
    }
  }
}

</script>
<style scoped lang='less'>
.order-list {
  background: #fff;
  padding: 20px;
}
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
