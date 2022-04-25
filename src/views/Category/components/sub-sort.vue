<template>
  <div class='sub-sort'>
    <div class="sort">
      <a :class="{ active: sortParams.sortField === null }" href="javascript:;" @click="changeSort(null)">
        默认排序
      </a>
      <a :class="{ active: sortParams.sortField === 'publishTime' }" href="javascript:;" @click="changeSort('publishTime')">
        最新商品
      </a>
      <a :class="{ active: sortParams.sortField === 'orderNum' }" href="javascript:;" @click="changeSort('orderNum')">
        最高人气
      </a>
      <a :class="{ active: sortParams.sortField === 'evaluateNum' }" href="javascript:;" @click="changeSort('evaluateNum')">
        评论最多
      </a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i class="arrow up" :class="{ active: sortParams.sortField === 'price' && sortParams.sortMethod == 'asc'  }" />
        <i class="arrow down" :class="{ active:  sortParams.sortField === 'price' && sortParams.sortMethod == 'desc'  }" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="sortParams.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'SubSort',

  setup () {
    const sortParams = reactive({
      // inventory 是否有库存
      inventory: false,
      // onlyDiscount 只显示特惠
      onlyDiscount: false,
      // sortField 排序字段 可选值：[publishTime,orderNum,price,evaluateNum]
      // publishTime:最新商品 orderNum: 最高人气 price:价格排序 evaluateNum：评论最多
      sortField: null,
      // sortMethod 排序规则  asc:升序  desc:降序
      sortMethod: null
    })

    const changeSort = sortField => {
      if (sortField === 'price') {
        // 如果点击的价格
        sortParams.sortField = sortField
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = 'asc'
        } else {
          sortParams.sortMethod =
            sortParams.sortMethod === 'asc' ? 'desc' : 'asc'
        }
      } else {
        // 如果点击的是其他三个
        if (sortParams.sortField === sortField) return
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
    }

    return {
      sortParams,
      changeSort
    }
  }
}
</script>
<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
