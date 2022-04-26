<template>
  <div class="sub-filter" v-if="list">
    <!-- 筛选区 -->
    <div class="item">
      <!-- 品牌独立渲染 -->
      <div class="head">品牌：</div>
      <div class="body">
        <a href="javascript:;" v-for="item in list.brands" :key="item.id" :class="{ active: item.id === list.brands.selected }" @click="changeBrand(item.id)">
          {{ item.name }}
        </a>
      </div>
    </div>
    <div class="item" :key="index" v-for="(item, index) in list.saleProperties">
      <!-- 品牌独立渲染 -->
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a href="javascript:;" v-for="sub in item.properties" :key="sub.id" :class="{ active: sub.id === item.selected }" @click="changeAttr(item,sub.id)">
          {{ sub.name }}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { findSubCategoryFilter } from '@/api/category.js'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'SubFilter',

  setup (props, { emit }) {
    const list = ref(null)
    const route = useRoute()

    watch(
      () => route.params.id,
      async value => {
        if (!route.path.includes('/sub')) return
        // 发送请求获取数据
        const res = await findSubCategoryFilter(value)
        res.result.brands.unshift({ id: null, name: '全部' })
        // 默认选中的品牌的id
        res.result.brands.selected = null
        res.result.saleProperties.forEach(item => {
          item.properties.unshift({ id: null, name: '全部' })
          // 销售属性默认选中的id
          item.selected = null
        })
        list.value = res.result
      },
      {
        immediate: true
      }
    )

    const getFilterParams = () => {
      const filterParams = {}
      const attrs = []
      filterParams.brandId = list.value.brands.selected
      list.value.saleProperties.forEach(p => {
        const attr = p.properties.find(v => v.id === p.selected)
        if (attr && attr.id !== undefined) {
          attrs.push({ groupName: p.name, propertyName: attr.name })
        }
      })
      if (attrs.length) filterParams.attrs = attrs
      return filterParams
    }

    const changeBrand = id => {
      list.value.brands.selected = id
      // 需要把参数传给父组件
      emit('changeFilter', getFilterParams())
    }
    const changeAttr = (item, id) => {
      console.log(item, id)
      item.selected = id
      // 需要把参数传给父组件
      emit('changeFilter', getFilterParams())
    }

    return {
      list,
      changeBrand,
      changeAttr
    }
  }
}
</script>
<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
