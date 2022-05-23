<template>
  <XtxDialog :title="formData.id?'修改收货地址':'添加收货地址'" v-model:visible="dialogVisible">
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input v-model="formData.receiver" class="input" placeholder="请输入收货人" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input v-model="formData.contact" class="input" placeholder="请输入手机号" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <XtxCity placeholder="请选择所在地区" :fullLocation="formData.fullLocation" @changeCity="changeCity" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input v-model="formData.address" class="input" placeholder="请输入详细地址" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input v-model="formData.postalCode" class="input" placeholder="请输入邮政编码" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input v-model="formData.addressTags" class="input" placeholder="请输入地址标签，逗号分隔" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">是否默认：</div>
          <div class="field">
            <XtxSwitch v-model="formData.isDefault" :activeValue="0" :inactiveValue="1"></XtxSwitch>
          </div>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <XtxButton type="gray" style="margin-right:20px" @click="dialogVisible = false">取消</XtxButton>
      <XtxButton type="primary" @click="confirm">确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script>
import { ref, reactive, watch, inject } from 'vue'
import { addAddress, editAddress } from '@/api/order'
export default {
  name: 'AddressEdit',
  setup () {
    // 表单数据
    const formData = reactive({
      id: '',
      receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 0,
      fullLocation: ''
    })

    // 选择地区
    const changeCity = (data) => {
      console.log(data)
      formData.provinceCode = data.provinceCode
      formData.cityCode = data.cityCode
      formData.countyCode = data.countyCode
      formData.fullLocation = data.provinceName + '' + data.cityName + '' + data.countyName
    }

    const getAddressList = inject('getAddressList')
    const updateAddress = inject('updateAddress')
    const confirm = async () => {
      if (formData.id) {
        // 修改
        await editAddress(formData)
        updateAddress({ ...formData })
      } else {
        // 添加
        await addAddress(formData)
        getAddressList()
      }
      dialogVisible.value = false
    }

    const dialogVisible = ref(false)
    watch(dialogVisible, (v) => {
      if (!v) {
        for (const key in formData) {
          formData[key] = ''
        }
        formData.isDefault = 0
      }
    })

    // 打开函数
    const open = (showAddress) => {
      if (showAddress.id) {
        for (const key in showAddress) {
          formData[key] = showAddress[key]
        }
      } else {
        for (const key in formData) {
          if (key !== 'isDefault') {
            formData[key] = ''
          }
        }
      }
      dialogVisible.value = true
    }
    return {
      dialogVisible,
      formData,
      open,
      changeCity,
      confirm
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}

.xtx-switch {
  transform: translateY(15px);
}
</style>
