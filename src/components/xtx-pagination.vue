<template>
  <div class="xtx-pagination">
    <a href="javascript:;" @click="currentPage--" v-if="currentPage!==1">上一页</a>
    <a href="javascript:;" class="disabled" v-else>上一页</a>
    <span v-if="params.start>1">...</span>
    <a href="javascript:;" :class="{active:currentPage === v}" v-for="v in params.array" :key="v" @click="currentPage=v">{{v}}</a>
    <span v-if="params.end<params.totalPage">...</span>
    <a href="javascript:;" @click="currentPage++" v-if="currentPage!==params.totalPage">下一页</a>
    <a href="javascript:;" class="disabled" v-else>下一页</a>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
export default {
  name: 'XtxPagination',

  props: {
    current: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },

    pageNum: {
      type: Number,
      default: 5
    }
  },

  setup (props, { emit }) {
    const currentPage = ref(0)
    watch(() => props.current, (c) => {
      currentPage.value = c
    }, { immediate: true })

    watch(currentPage, (v) => {
      emit('current-change', v)
    })

    const params = computed(() => {
      const totalPage = Math.ceil(props.total / props.size)
      // 计算起始页码和结束页码
      // 1. 理想情况根据当前页码，和按钮个数可得到
      let start = currentPage.value - Math.floor(props.pageNum / 2)
      let end = start + props.pageNum - 1
      //   start 是负数
      if (start < 1) {
        start = 1
        end = (start + props.pageNum - 1) > totalPage ? totalPage : (start + props.pageNum - 1)
      }
      // end 超过totalPage
      if (end > totalPage) {
        end = totalPage
        start = (end - props.pageNum + 1) < 1 ? 1 : (end - props.pageNum + 1)
      }

      const array = []
      for (let i = start; i <= end; i++) {
        array.push(i)
      }
      return { start, end, array, totalPage }
    })

    return {
      params,
      currentPage
    }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
