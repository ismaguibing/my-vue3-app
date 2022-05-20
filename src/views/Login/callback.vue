<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <nav class="tab">
      <a href="javascript:;" :class="{ active: hasAccount }" @click="hasAccount = true">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a href="javascript:;" :class="{ active: !hasAccount }" @click="hasAccount = false">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <callbackBind :unionId='unionId'></callbackBind>
    </div>
    <div class="tab-content" v-else>
      <callbakPatch :unionId='unionId'></callbakPatch>
    </div>
  </section>
  <LoginFooter></LoginFooter>
</template>

<script>
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import callbackBind from './components/callback-bind.vue'
import callbakPatch from './components/callback-patch.vue'
import { Message } from '@/components/index'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { userQQLogin } from '@/api/user'

export default {
  name: 'LoginCallback',
  components: {
    LoginHeader,
    LoginFooter,
    callbackBind,
    callbakPatch
  },

  setup () {
    const hasAccount = ref(true)
    const router = useRouter()
    const store = useStore()

    const unionId = ref(null)

    // 获取QQ登录的信息 window.QC.Login.check()  判断是否QQ登录完成 为true 登录成功
    if (window.QC.Login.check()) {
      // 获取到了  openId
      window.QC.Login.getMe(async openId => {
        try {
          unionId.value = openId
          const res = await userQQLogin(openId)
          console.log(res)
          Message({ text: '登录成功' })
          store.commit('user/setProFile', res.result)
          store.dispatch('cart/mergeLocalCart').then(() => {
            Message({ text: '登录成功' })
            router.push('/')
          })
          //   router.push('/')
        } catch (e) {
          console.log(e)
          Message({ type: 'error', text: 'qq未绑定' })
        }
      })
    }

    return {
      hasAccount,
      unionId
    }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
