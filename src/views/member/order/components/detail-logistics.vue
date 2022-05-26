<template>
  <div class="detail-logistics">
    <p>
      <span>{{logistics.list[0].time}}</span>
      <span>{{logistics.list[0].text}}</span>
    </p>
    <a href="javascript:;" @click="onLogisticsOrder(order)">查看物流</a>

  </div>

  <teleport to='body'>
    <OrderLogistics ref="logisticsOrderCom"></OrderLogistics>
  </teleport>

</template>
<script>
import { ref } from 'vue'
import { logisticsOrder } from '@/api/order'
import OrderLogistics from './order-logistics.vue'

export default {
  name: 'DetailLogistics',
  props: {
    order: {
      type: Object,
      default: () => { }
    }
  },

  components: {
    OrderLogistics
  },

  async setup (props) {
    const logistics = ref(null)
    const logisticsOrderCom = ref(null)

    // 模拟加载时间
    const data = await logisticsOrder(props.order.id)
    logistics.value = data.result

    const onLogisticsOrder = (order) => {
      logisticsOrderCom.value.open(order)
    }

    return { logistics, logisticsOrderCom, onLogisticsOrder }
  }
}
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
