<template>
  <div class="sub-filter" v-if="list">
    <!-- 筛选区 -->
    <div class="item">
      <!-- 品牌独立渲染 -->
      <div class="head">品牌：</div>
      <div class="body">
        <a href="javascript:;" v-for="item in list.brands" :key="item.id" :class="{ active: item.id === list.brands.selected }" @click="list.brands.selected = item.id">
          {{ item.name }}
        </a>
      </div>
    </div>
    <div class="item" :key="index" v-for="(item, index) in list.saleProperties">
      <!-- 品牌独立渲染 -->
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a href="javascript:;" v-for="sub in item.properties" :key="sub.id" :class="{ active: sub.id === item.properties.selected }" @click="item.properties.selected = sub.id">
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

  setup () {
    const list = ref(null)
    const route = useRoute()

    watch(() => route.params.id, value => {
      if (!route.path.includes('/sub')) return
      findSubCategoryFilter(value).then(({ result }) => {
        result.brands.unshift({ id: null, name: '全部' })
        result.brands.selected = null
        result.saleProperties.forEach(item => {
          item.properties.unshift({ id: null, name: '全部' })
          item.properties.selected = null
        })
        list.value = result
      })
    }, { immediate: true })

    return {
      list
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
