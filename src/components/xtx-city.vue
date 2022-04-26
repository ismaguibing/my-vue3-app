<template>
  <div class="xtx-city" ref="target">
    <div class="select" :class="{active}" @click="toggle">
      <span class="placeholder" v-if="!fullLocation">请选择配送地址</span>
      <span class="value" v-else>{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <span class="ellipsis" v-for="i in cityList" :key="i.code" @click="selectCity(i)">{{i.name}}</span>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import _axios from '@/utils/request'
export default {
  name: 'XtxCity',

  props: {
    fullLocation: {
      type: String
    }
  },

  setup (props, { emit }) {
    const active = ref(false)
    const toggle = () => {
      active.value = !active.value
    }

    const target = ref(null)
    onClickOutside(target, () => {
      active.value = false
    })

    const cityList = ref([])
    const cacheList = ref([])
    _axios({ url: 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json' }).then(res => {
      cityList.value = res
      cacheList.value = res
    })

    // 监听关闭弹窗的处理，恢复数据
    watch(active, value => {
      if (!value) {
        cityList.value = cacheList.value
      }
    })

    // 选择城市
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: ''
    })

    const selectCity = city => {
      if (city.level === 0) {
        // 省
        changeResult.provinceName = city.name
        changeResult.provinceCode = city.code
        cityList.value = city.areaList
      }
      if (city.level === 1) {
        // 市
        changeResult.cityName = city.name
        changeResult.cityCode = city.code
        cityList.value = city.areaList
      }
      if (city.level === 2) {
        // 县（区）
        changeResult.countyName = city.name
        changeResult.countyCode = city.code
        // 关闭弹窗
        active.value = false
        emit('changeCity', changeResult)
      }
    }

    return {
      active,
      toggle,
      target,
      cityList,
      selectCity,
      changeResult
    }
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
