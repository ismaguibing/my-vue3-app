<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if='proFile.id'>
          <li>
            <a href="javascript:;"><i class="iconfont icon-user"></i>{{proFile.account}}</a>
          </li>
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <RouterLink to="/login">请先登录</RouterLink>
          </li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed } from 'vue-demi'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Message } from '@/components/index'
export default {
  name: 'AppTopnav',

  setup () {
    const store = useStore()
    const router = useRouter()

    // 退出登录
    const logout = () => {
      store.commit('user/logout')
      // 清空购物车
      store.commit('cart/setCartList', [])
      router.push('/login')
      Message({ tyep: 'success', text: '退出成功' })
    }

    const proFile = computed(() => {
      return store.state.user.proFile
    })

    return {
      proFile,
      logout
    }
  }
}
</script>

<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
