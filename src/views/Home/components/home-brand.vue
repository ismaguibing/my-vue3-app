<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a href="javascript:;" class="iconfont icon-angle-left prev" :class="{disabled:idx===0}" @click="idx =0"></a>
      <a href="javascript:;" class="iconfont icon-angle-right next" :class="{disabled:idx===1}" @click="idx = 1"></a>
    </template>
    <!-- 默认插槽的内容 -->
    <transition name="fade">
      <div class="box" ref="box">
        <ul class="list" v-if="list.length>0" :style="{ transform: `translateX(${-idx * 1240}px)`}">
          <li v-for="i in list" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" alt="">
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px" />
        </div>
      </div>
    </transition>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import { brandList } from '@/api/category'
import { useLazyData } from '@/hooks'
import { ref } from 'vue'
export default {
  name: 'HomeBrand',

  components: { HomePanel },

  setup () {
    const { list, target } = useLazyData(() => brandList(10))

    const idx = ref(0)

    return {
      list,
      target,
      idx
    }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
  .skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
