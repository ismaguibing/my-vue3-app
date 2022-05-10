<template>
  <div class="goods-comment">
    <!-- 头部 -->
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a v-for="(item, index) in commentInfo.tags" :key="item.title" href="javascript:;" :class="{ active: currentIndex === index }" @click="changeTag(index)">
            {{item.title}}({{item.tagCount}}) </a>
        </div>
      </div>
    </div>
    <!-- 排序 -->
    <div class="sort">
      <span>排序：</span>
      <a @click="changeSort(null)" href="javascript:;" :class="{active:reqParams.sortField===null}">默认</a>
      <a @click="changeSort('praiseCount')" href="javascript:;" :class="{active:reqParams.sortField==='praiseCount'}">最热</a>
      <a @click="changeSort('createTime')" href="javascript:;" :class="{active:reqParams.sortField==='createTime'}">最新</a>
    </div>

    <!-- 列表 -->
    <div class="list">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{formatNickName(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i+'1'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5-item.score" :key="i+'2'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{item.orderInfo.specs.reduce((p,v,i)=>`${p}${v.name}: ${v.nameValue}  `,"")}}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <GoodsCommentImage v-if="item.pictures.length" :pictures='item.pictures'></GoodsCommentImage>
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i> {{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { findCommentInfoByGoods, findCommentListByGoods } from '@/api/goods'
import { ref, watch, reactive } from 'vue'
import { useRoute } from 'vue-router'
import GoodsCommentImage from './goods-comment-image.vue'
export default {
  name: 'GoodsComment',

  components: {
    GoodsCommentImage
  },

  setup () {
    const commentInfo = ref([])
    const commentList = ref([])
    const currentIndex = ref(0)
    const route = useRoute()

    watch(() => route.params.id, async () => {
      const res = await findCommentInfoByGoods(route.params.id)
      res.result.tags.unshift({ title: '有图', tagCount: res.result.hasPictureCount })
      res.result.tags.unshift({ title: '全部', tagCount: res.result.evaluateCount })
      commentInfo.value = res.result
    }, { immediate: true })

    // 筛选条件准备
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: false,
      tag: null,
      sortField: null,
      sortMethod: 'desc'
    })

    const changeTag = (index) => {
      currentIndex.value = index
      // 修改reqParams的值
      if (index === 0) {
        // 点击了全部评价
        reqParams.hasPicture = false
        reqParams.tag = null
      } else if (index === 1) {
        // 点击有图
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        // 点击其他tag
        reqParams.hasPicture = false
        reqParams.tag = commentInfo.value.tags[index].title
      }
    }

    const changeSort = (type) => {
      reqParams.sortField = type
    }

    // 格式化用户名
    const formatNickName = (name) => {
      return name.slice(0, 1) + '*****' + name.slice(-1)
    }

    watch([reqParams, () => route.params.id], async () => {
      const res = await findCommentListByGoods(route.params.id, reqParams)
      commentList.value = res.result.items
    }, { immediate: true })

    return {
      commentInfo,
      currentIndex,
      reqParams,
      changeSort,
      changeTag,
      commentList,
      formatNickName
    }
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
}

.list {
  padding: 0 20px;
  .item {
    display: flex;
    padding: 25px 10px;
    border-bottom: 1px solid #f5f5f5;
    .user {
      width: 160px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      span {
        padding-left: 10px;
        color: #666;
      }
    }
    .body {
      flex: 1;
      .score {
        line-height: 40px;
        .iconfont {
          color: #ff9240;
          padding-right: 3px;
        }
        .attr {
          padding-left: 10px;
          color: #666;
        }
      }
    }
    .text {
      color: #666;
      line-height: 24px;
    }
    .time {
      color: #999;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }
  }
}
</style>
