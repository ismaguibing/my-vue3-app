<template>
  <ul class="navs">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li>
      <a href="#">美食</a>
      <div class="layer">
        <ul>
          <li v-for="i in 10" :key="i">
            <a href="#">
              <img src="https://yanxuan.nosdn.127.net/cc361cf40d4f81c7eccefed1ad18face.png?quality=95&imageView" alt="" />
              <p>果干</p>
            </a>
          </li>
        </ul>
      </div>
    </li>
    <li>
      <a href="#">餐厨</a>
    </li>
    <li>
      <a href="#">居家</a>
    </li>
    <li>
      <a href="#">艺术</a>
    </li>
    <li>
      <a href="#">电器</a>
    </li>
    <li>
      <a href="#">洗护</a>
    </li>
    <li>
      <a href="#">孕婴</a>
    </li>
    <li>
      <a href="#">服装</a>
    </li>
    <li>
      <a href="#">杂货</a>
    </li>
  </ul>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: 'AppHeaderNav',

  setup () {
    const data = reactive({})

    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount')
    })

    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })

    return {
      ...toRefs(data)
    }
  }
}

</script>
<style scoped lang='less'>
.navs {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    > &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      > .layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
}
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
