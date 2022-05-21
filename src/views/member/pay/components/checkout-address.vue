<template>
  <div class="address">
    <div class="text">
      <div class="none" v-if="!showAddress">您需要先添加收货地址才可提交订单。</div>
      <ul v-else>
        <li><span>收<i />货<i />人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
      </ul>
      <a href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn">切换地址</XtxButton>
      <XtxButton class="btn">添加地址</XtxButton>
    </div>
  </div>

  <XtxDialog title="切换收货地址">
    对话框内容
    <template #footer>
      <XtxButton type="gray" style="margin-right:20px">取消</XtxButton>
      <XtxButton type="primary">确认</XtxButton>
    </template>
  </XtxDialog>

</template>
<script>
import { ref, watch } from 'vue'
export default {
  name: 'CheckoutAddress',

  props: {
    userAddresses: {
      type: Array,
      default: () => []
    }
  },

  setup (props) {
    // 显示的地址
    const showAddress = ref(null)

    watch(() => props.userAddresses, () => {
      if (props.userAddresses.length) {
        debugger
        const defaultAddress = props.userAddresses.find(item => item.isDefault === 0)
        if (defaultAddress) {
          showAddress.value = defaultAddress
        } else {
          showAddress.value = { ...props.userAddresses[0] }
        }
      }
    }, { immediate: true, deep: true })

    return { showAddress }
  }
}
</script>
<style scoped lang="less">
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
