<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="play">
    <ul class="carousel-body">
      <li class="carousel-item" :class="{fade:active===i}" v-for="(v,i) in bannerList" :key="v.id">
        <RouterLink :to="v.hrefUrl">
          <img v-lazy="v.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="prev"><i class="iconfont icon-angle-left"></i></a>
    <a href="javascript:;" class="carousel-btn next" @click="next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span :class="{active:active===i}" v-for="(v,i) in bannerList" :key="v.id" @mouseenter="active = i"></span>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
export default {
  name: 'XtxCarousel',

  props: {
    bannerList: {
      type: Array,
      required: true,
      default: () => []
    },

    autoplay: {
      type: Boolean,
      required: true,
      default: true
    },

    duration: {
      type: Number,
      required: true,
      default: 5000
    }
  },

  setup (props) {
    const active = ref(0)
    let timer = null

    // 开启自动播放
    const play = () => {
      if (!props.autoplay) return
      clearInterval(timer) // 保证每次只有一个定时器
      timer = setInterval(() => {
        next()
      }, props.duration)
    }

    // 离开清除定时器
    const stop = () => {
      clearInterval(timer)
    }
    onMounted(() => {
      play()
    })

    onUnmounted(() => {
      stop()
    })

    // 上一张图片
    const prev = () => {
      if (active.value === 0) {
        active.value = props.bannerList.length
      } else {
        active.value--
      }
    }

    // 下一张图片
    const next = () => {
      if (active.value === props.bannerList.length - 1) {
        active.value = 0
      } else {
        active.value++
      }
    }

    return {
      active,
      prev,
      next,
      play,
      stop
    }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
