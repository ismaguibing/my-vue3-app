<template>
  <div class="xtx-dialog" v-show="visible" :class="{fade}">
    <div class="wrapper" :class="{fade}" ref="target">
      <div class="header">
        <h3>{{title}}</h3>
        <a href="JavaScript:;" class="iconfont icon-close-new" @click="close"></a>
      </div>
      <div class="body">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
export default {
  name: 'XtxDialog',

  props: {
    title: {
      type: String,
      default: '温馨提示'
    },

    visible: {
      type: Boolean,
      default: false
    }
  },

  setup (props, { emit }) {
    const fade = ref(false)
    watch(() => props.visible, (v) => {
      setTimeout(() => {
        fade.value = v
      }, 500)
    }, { immediate: true })

    const close = () => {
      emit('update:visible', false)
    }

    const target = ref(null)
    onClickOutside(target, () => {
      emit('update:visible', false)
    })

    return { fade, close, target }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0, 0, 0, 0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
  .wrapper {
    width: 600px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
    }
    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
