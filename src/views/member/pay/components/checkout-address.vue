<template>
  <div class="address">
    <div class="text">
      <div class="none" v-if="!showAddress">您需要先添加收货地址才可提交订单。</div>
      <ul v-else>
        <li><span>收<i />货<i />人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
      </ul>
      <a href="javascript:;" @click="openAddressEdit(showAddress)" v-if="showAddress">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn" @click="visible = true">切换地址</XtxButton>
      <XtxButton class="btn" @click="openAddressEdit()">添加地址</XtxButton>
    </div>
    <XtxDialog title="切换收货地址" v-model:visible="visible">
      <div class="text item" :class="{active:selectedAddress?.id===item.id}" @click="selectedAddress=item" v-for="item in userAddresses" :key="item.id">
        <ul>
          <li><span>收<i />货<i />人：</span>{{item.receiver}}</li>
          <li><span>联系方式：</span>{{item.contact}}</li>
          <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')+item.address}}</li>
        </ul>
      </div>
      <template #footer>
        <XtxButton @click="visible = false" type="gray" style="margin-right:20px">取消</XtxButton>
        <XtxButton @click="changeAddress" type="primary">确认</XtxButton>
      </template>
    </XtxDialog>
    <AddressEdit ref="addressEdit"></AddressEdit>
  </div>

</template>
<script>
import { provide, ref, watch } from 'vue'
import AddressEdit from './address-edit.vue'
export default {
  name: 'CheckoutAddress',
  emits: ['changeAddress'],
  props: {
    userAddresses: {
      type: Array,
      default: () => []
    }
  },

  components: {
    AddressEdit
  },

  setup (props, { emit }) {
    // 显示的地址
    const showAddress = ref(null)
    const visible = ref(false)
    const selectedAddress = ref(null)

    watch(() => props.userAddresses, () => {
      if (props.userAddresses.length) {
        const defaultAddress = props.userAddresses.find(item => item.isDefault === 0)
        if (defaultAddress) {
          showAddress.value = defaultAddress
        } else {
          showAddress.value = { ...props.userAddresses[0] }
        }
        selectedAddress.value = showAddress.value
        emit('changeAddress', showAddress.value.id)
      }
    }, { immediate: true, deep: true })

    const changeAddress = () => {
      visible.value = false
      showAddress.value = selectedAddress.value
      emit('changeAddress', selectedAddress.value.id)
    }

    const updateAddress = (address) => {
      showAddress.value = address
      selectedAddress.value = address
    }

    provide('updateAddress', updateAddress)

    const addressEdit = ref(null)
    const openAddressEdit = (showAddress) => {
      addressEdit.value.open(showAddress)
    }

    return { showAddress, visible, selectedAddress, changeAddress, addressEdit, openAddressEdit }
  }
}
</script>

<style lang="less" scoped>
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
      }
    }
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
