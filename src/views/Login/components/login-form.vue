<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;" v-if="isMsgLogin" @click="isMsgLogin = false">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;" v-else @click="isMsgLogin = true">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form :validation-schema="rules" ref="target" class="form" v-slot="{ errors }">
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field v-model="form.account" type="text" placeholder="请输入用户名或手机号" name="account" autocomplete="off" :class="{ error: errors.account }" />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field v-model="form.password" type="password" name="password" autocomplete='off' placeholder="请输入密码" :class="{ error: errors.password }" />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field name="mobile" v-model="form.mobile" type="text" placeholder="请输入手机号" :class="{ error: errors.mobile }" autocomplete="off" />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field name="code" v-model="form.code" type="password" placeholder="请输入验证码" :class="{ error: errors.code }" autocomplete="off" />
            <span class="code" @click="send">{{ time === 0 ? '发送验证码' : `${time}秒后发送` }}</span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- <Field as='XtxCheckBox' name='isAgree' v-model="form.isAgree"></Field> -->
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />{{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </Form>
    <div class="action">
      <a href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      </a>
      <!-- <span id="qqLoginBtn"></span> -->
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from 'vue'
import { Field, Form, configure } from 'vee-validate'
import { account, code, mobile, isAgree, password } from '@/utils/validate'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Message } from '@/components/index.js'
import { userAccountLogin, userMobileLoginMsg, userMobileLogin } from '@/api/user'
import { useIntervalFn } from '@vueuse/core'
import { useCounter } from '@/hooks'
configure({
  validateOnBlur: false,
  validateOnInput: true
})

export default {
  name: 'LoginForm',

  components: {
    Field,
    Form
  },
  setup () {
    const target = ref(null)
    const isMsgLogin = ref(false)

    const form = reactive({
      account: '',
      password: '',
      isAgree: false
    })

    // const time = ref(0)

    //  切换tab form数据清空
    watch(isMsgLogin, () => {
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
    })

    // 表单校验规则
    const rules = reactive({ account, code, mobile, isAgree, password })

    const router = useRouter()
    const store = useStore()
    const route = useRoute()

    const { time, start } = useCounter()

    // 发送验证码
    const send = async () => {
      // 校验手机号是否符合规则
      const isMobile = rules.mobile(form.mobile)
      // setFieldError 设置错误的信息
      if (isMobile !== true) return target.value.setFieldError('mobile', isMobile)

      try {
        // 当倒计时大于0 直接return 不发送请求
        if (time.value > 0) return
        await userMobileLoginMsg(form.mobile)
        Message({ type: 'success', text: '发送成功' })
        start()
      } catch (e) {
        Message({ type: 'error', text: '不要频繁发送请求' })
      }
    }

    // onMounted(() => {
    //   window.QC.Login({
    //     btnId: 'qqLoginBtn' // 插入按钮的节点id
    //   })
    // })

    //  login
    //  登录的请求, 先搞一个message组件
    const login = async () => {
      const v = await target.value.validate()
      if (!v) return
      try {
        let res = null
        if (isMsgLogin.value) {
          res = await userMobileLogin(form.mobile, form.code)
        } else {
          res = await userAccountLogin(form.account, form.password)
        }
        store.commit('user/setProFile', res.result)
        store.dispatch('cart/mergeLocalCart').then(() => {
          Message({ text: '登录成功' })
          const redirectUrl = localStorage.getItem('redirectUrl') || '/'
          localStorage.removeItem('redirectUrl')
          router.push(redirectUrl)
        })
        // Message({ type: 'success', text: '登录成功' })
        // router.push('/')
      } catch (e) {
        Message({ type: 'error', text: e.response.data.message })
      }
    }

    return {
      isMsgLogin,
      form,
      target,
      rules,
      login,
      send,
      time
    }
  }
}
</script>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
            // border-color: red;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
