<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>{{title}}<small>{{subTitle}}</small></h3>
        <!-- <XtxMore to="/"></XtxMore> -->
        <slot name="right"></slot>
      </div>
      <!-- 面板的内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePanel',

  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },

    // 子标题
    subTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="less">
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
