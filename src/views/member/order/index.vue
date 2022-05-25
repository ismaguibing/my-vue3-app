<template>
  <XtxTabs v-model="activeName" @tab-click='tabclickFn'>
    <XtxTabsPanel v-for="v in orderStatus" :key="v.name" :label='v.label' :name='v.name'></XtxTabsPanel>
  </XtxTabs>

  <div class="order-list">
    <div v-if="loading" class="loading"></div>
    <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
    <OrderItem v-for="v in orderList" :key="v" :order='v'></OrderItem>
  </div>

  <!-- 分页 -->
  <XtxPagination :current='reqParams.page' :size='reqParams.pageSize' :total='total' @current-change="currentchange"></XtxPagination>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import { findOrderList } from '@/api/order.js'
import OrderItem from './components/order-item.vue'
export default {
  components: {
    OrderItem
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

    watch(reqParams, () => {
      loading.value = true
      findOrderList(reqParams).then(res => {
        orderList.value = res.result.items
        total.value = res.result.counts
        loading.value = false
      })
    }, { immediate: true })

    const tabclickFn = ({ v, i }) => {
      reqParams.orderState = i
      reqParams.page = 1
    }

    const currentchange = (v) => {
      reqParams.page = v
    }

    return {
      activeName,
      orderStatus,
      orderList,
      reqParams,
      total,
      loading,
      tabclickFn,
      currentchange
    }
  }
}

</script>
<style scoped lang='less'>
// .order-list {
//   background: #fff;
//   padding: 20px;
// }
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
