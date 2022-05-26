<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
    <XtxSteps :active='order.orderState===6?1:order.orderState'>
      <XtxStep title="提交订单" :desc="order.createTime" />
      <XtxStep title="付款成功" :desc="order.payTime" />
      <XtxStep title="商品发货" :desc="order.consignTime" />
      <XtxStep title="确认收货" :desc="order.evaluationTime" />
      <XtxStep title="订单完成" :desc="order.endTime" />
    </XtxSteps>
    <!-- 物流栏 -->

    <!-- 订单商品信息 -->
  </div>
</template>
<script>
import DetailAction from './components/detail-action'
import { ref } from 'vue'
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'
export default {
  name: 'OrderDetailPage',

  components: {
    DetailAction
  },

  setup () {
    const order = ref(null)
    const route = useRoute()
    findOrder(route.params.id).then(data => {
      order.value = data.result
    })
    return { order }
  }
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
}
</style>
