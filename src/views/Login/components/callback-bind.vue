<template>
  <div class="xtx-form">

    <div class="user-info">
      <img :src="qqInfo.avatar" alt="" />
      <p>Hi，{{qqInfo.nickname}} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>

    <Form ref="target" :validation-schema="rules" v-slot="{ errors }" autocomplete="off">
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <Field class="input" type="text" name="mobile" autocomplete="off" v-model="form.mobile" placeholder="绑定的手机号" />
        </div>
        <div class="error" v-if="errors.mobile">{{errors.mobile}}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-code"></i>
          <Field name="code" class="input" type="text" placeholder="短信验证码" v-model="form.code" />
          <span class="code" @click="send">{{ time === 0 ? '发送验证码' : `${time}秒后发送` }}</span>
        </div>
        <div class="error" v-if="errors.code">{{ errors.code }}</div>
      </div>
      <a href="javascript:;" class="submit" @click="bind">立即绑定</a>
    </Form>

  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { mobile, code } from '@/utils/validate'
import { useCounter } from '@/hooks'
import { userQQBindCode, userQQBindLogin } from '@/api/user'
import { Message } from '@/components'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'CallbackBind',

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
    const qqInfo = reactive({
      nickname: '',
      avatar: ''
    })

    const form = reactive({
      mobile: '',
      code: ''
    })

    const rules = {
      mobile,
      code
    }

    const target = ref(null)
    const { time, start } = useCounter()

    // 获取qq的信息
    if (window.QC.Login.check()) {
      window.QC.api('get_user_info').success(res => {
        qqInfo.avatar = res.data.figureurl_qq_1
        qqInfo.nickname = res.data.nickname
      })
    }

    const send = async () => {
      if (time.value > 0) return
      const valid = rules.mobile(form.mobile)
      if (valid !== true) {
        return target.value.setFieldError('mobile', valid)
      }
      // 2. 发送请求，获取验证码
      await userQQBindCode(form.mobile)
      // 3. 开启定时器
      start()
    }

    const store = useStore()
    const router = useRouter()

    const bind = async () => {
      const valid = target.value.validate()
      if (!valid) return
      const res = await userQQBindLogin({
        unionId: props.unionId,
        mobile: form.mobile,
        code: form.code
      })
      store.commit('user/setProFile', res.result)
      store.dispatch('cart/mergeLocalCart').then(() => {
        Message({ text: '登录成功' })
        router.push('/')
      })
      //   router.push('/')
      Message({ type: 'success', text: '绑定成功' })
    }

    return {
      qqInfo,
      form,
      rules,
      target,
      send,
      time,
      bind
    }
  }
}
</script>

<style scoped lang='less'>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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
