<template>
  <div class="xtx-form">
    <Form ref="target" :validation-schema="rules" v-slot="{ errors }" autocomplete="off">
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-user"></i>
          <Field class="input" type="text" v-model="form.account" name='account' placeholder="请输入用户名" />
        </div>
        <div class="error" v-if="errors.account">{{errors.account}}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <Field class="input" type="text" v-model="form.mobile" name='mobile' placeholder="请输入手机号" />
        </div>
        <div class="error" v-if="errors.mobile">{{errors.mobile}}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-code"></i>
          <Field class="input" type="text" v-model="form.code" name='code' placeholder="请输入验证码" />
          <span class="code" @click="send">发送验证码</span>
        </div>
        <div class="error" v-if="errors.code">{{errors.code}}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-lock"></i>
          <Field class="input" type="password" v-model="form.password" name='password' placeholder="请输入密码" />
        </div>
        <div class="error" v-if="errors.password">{{errors.password}}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-lock"></i>
          <Field class="input" type="password" v-model="form.rePassword" name='rePassword' placeholder="请确认密码" />
        </div>
        <div class="error" v-if="errors.rePassword">{{errors.rePassword}}</div>
      </div>
      <a href="javascript:;" class="submit" @click="bind">立即提交</a>
    </Form>
  </div>
</template>

<script>
import { Form, Field } from 'vee-validate'
import { reactive, ref } from 'vue'
import { account, password, code, mobile, rePassword } from '@/utils/validate'
import { userQQPatchCode, userQQPatchLogin } from '@/api/user'
import { useCounter } from '@/hooks'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Message from '@/components/index.js'
export default {
  name: 'CallbackPatch',

  components: {
    Form,
    Field
  },

  props: {
    unionId: {
      type: String,
      require: true
    }
  },

  setup (props) {
    const target = ref(null)

    const form = reactive({
      account: '', password: '', code: '', mobile: '', rePassword: ''
    })

    const rules = {
      account, password, code, mobile, rePassword
    }

    const send = async () => {
      // 校验手机号
      const msg = rules.mobile(form.mobile)
      if (msg !== true) {
        target.value.setFieldError('mobile', msg)
        return
      }
      // 校验通过
      if (time.value === 0) {
        await userQQPatchCode(form.mobile)
        // 倒计时
        start()
      }
    }

    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const { time, start } = useCounter()

    // 绑定 完善信息
    const bind = async () => {
      const valid = target.value.validate()
      if (valid) {
        const res = await userQQPatchLogin({ unionId: props.unionId, ...form })
        store.commit('user/setProFile', res.result)
        store.dispatch('cart/mergeLocalCart').then(() => {
          Message({ text: '登录成功' })
          const redirectUrl = localStorage.getItem('redirectUrl') || '/'
          localStorage.removeItem('redirectUrl')
          router.push(redirectUrl)
        })
        // router.push('/')
        Message({ type: 'success', text: 'QQ完善信息成功' })
      }
    }

    return {
      target,
      rules,
      form,
      bind,
      send
    }
  }
}
</script>

<style scoped lang='less'>
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
