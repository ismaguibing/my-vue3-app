<template>
  <div class="goods-image">
    <div class="large" v-show="show" :style="[{backgroundImage:`url(${images[current]})`, backgroundPosition: `${imgPosition.x}px ${imgPosition.y}px`}]"></div>
    <div class="middle" ref="target">
      <img :src="images[current]" alt="" />
      <div class="layer" v-show="show" :style="{ left: layer.x + 'px', top: layer.y + 'px' }"></div>
    </div>
    <ul class="small">
      <li v-for="(item, index) in images" :key="index" :class="{ active: index === current }">
        <img :src="images[index]" @mouseenter="current = index" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, watch, reactive } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const current = ref(0)
    const show = ref(false)
    const target = ref(null)
    const { isOutside, elementX, elementY } = useMouseInElement(target)

    // 控制移动
    const layer = reactive({
      x: 0,
      y: 0
    })
    const imgPosition = reactive({
      x: 0,
      y: 0
    })
    watch([isOutside, elementX, elementY], () => {
      //   console.log(isOutside.value, elementX.value, elementY.value)
      show.value = !isOutside.value
      let x = elementX.value - 100
      let y = elementY.value - 100
      // 限制移动范围
      if (x < 0) x = 0
      if (y < 0) y = 0
      if (x > 200) x = 200
      if (y > 200) y = 200
      layer.x = x
      layer.y = y

      // 为什么 - 号  因为是 相反 的关系
      imgPosition.x = -2 * x
      imgPosition.y = -2 * y
    })
    return {
      current,
      show,
      target,
      layer,
      imgPosition
    }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
