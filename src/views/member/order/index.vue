<template>
  <XtxTabs v-model="activeName" @tab-click='tabclickFn'>
    <XtxTabsPanel v-for="v in orderStatus" :key="v.name" :label='v.label' :name='v.name'></XtxTabsPanel>
  </XtxTabs>

  <div class="order-list">
    <div v-if="loading" class="loading"></div>
    <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
    <OrderItem v-for="v in orderList" :key="v" :order='v' @cancelOrder='cancelOrder' @deleteOrder='deleteOrder' @confirmOrder='confirmOrderA' @onLogistics='onLogistics'></OrderItem>
  </div>

  <!-- 分页 -->
  <XtxPagination :current='reqParams.page' :size='reqParams.pageSize' :total='total' @current-change="currentchange"></XtxPagination>

  <!-- 取消dialog -->
  <OrderCancel ref="target"></OrderCancel>

  <!-- 查看物流 -->
  <OrderLogistics ref="logisticsOrderCom"></OrderLogistics>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import { delteOrder, findOrderList, confirmOrder } from '@/api/order.js'
import { Message } from '@/components'
import OrderItem from './components/order-item.vue'
import OrderCancel from './components/order-cancel.vue'
import OrderLogistics from './components/order-logistics.vue'
export default {
  components: {
    OrderItem,
    OrderCancel,
    OrderLogistics
  },

  setup () {
    const activeName = ref('all')
    const loading = ref(false)
    const total = ref(0)
    const reqParams = reactive({
      orderState: 0,
      page: 1,
      pageSize: 5
    })

    const orderList = ref(null)

    const getOrderList = () => {
      loading.value = true
      findOrderList(reqParams).then(res => {
        orderList.value = res.result.items
        total.value = res.result.counts
        loading.value = false
      })
    }

    watch(reqParams, () => {
      getOrderList()
    }, { immediate: true })

    const tabclickFn = ({ v, i }) => {
      reqParams.orderState = i
      reqParams.page = 1
    }

    const currentchange = (v) => {
      reqParams.page = v
    }

    const target = ref(null)
    const logisticsOrderCom = ref(null)

    // 取消订单
    const cancelOrder = (v) => {
      target.value.open({ id: v })
    }

    // 删除订单
    const deleteOrder = async (v) => {
      await delteOrder([v.id])
      getOrderList()
      Message({ text: '删除成功', type: 'success' })
    }

    // 查看物流onLogistics

    const onLogistics = (v) => {
      logisticsOrderCom.value.open(v)
    }

    return {
      activeName,
      orderStatus,
      orderList,
      reqParams,
      total,
      loading,
      tabclickFn,
      currentchange,
      cancelOrder,
      deleteOrder,
      target,
      logisticsOrderCom,
      ...userFn(),
      onLogistics
    }
  }
}

export const userFn = () => {
  // 确认收货
  const confirmOrderA = async (v) => {
    await confirmOrder(v.id)
    //   getOrderList()
    v.orderState = 4
    Message({ text: '确认收货成功', type: 'success' })
  }

  return { confirmOrderA }
}

</script>
<style scoped lang='less'>
.order-list {
  padding: 20px;
  background: #fff;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
