import _axios from '@/utils/request'

/**
 * 帐号登录
 * @param {String} account - 用户名
 * @param {String} password - 密码
 * @returns Promise
 */
export const userAccountLogin = (account, password) => {
  return _axios({
    url: '/login',
    method: 'post',
    data: { account, password }
  })
}

/**
 * 获取短信登录验证码
 * @param {String} mobile - 手机号
 * @returns Promise
 */
export const userMobileLoginMsg = mobile => {
  return _axios({
    method: 'get',
    url: '/login/code',
    params: {
      mobile
    }
  })
}

/**
 * 短信登录
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns Promise
 */
export const userMobileLogin = (mobile, code) => {
  return _axios({
    method: 'post',
    url: '/login/code',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 第三方登录
 * @param {String} unionId - 第三方登录唯一标识 qq openId
 * @param {Integer} source - 来源 1为pc，2为webapp，3为微信小程序, 4为Android, 5为ios, 6为qq, 7为微信
 * @returns Promise
 */
export const userQQLogin = (unionId, source = 1) => {
  return _axios({
    // url: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/login/social',
    url: '/login/social',
    method: 'post',
    data: { unionId, source }
  })
}

/**
 * 获取QQ绑定的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns promise
 */
export const userQQBindCode = mobile => {
  return _axios({
    method: 'get',
    url: '/login/social/code',
    params: {
      mobile
    }
  })
}

/**
 * QQ登录-绑定帐号
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns
 */
export const userQQBindLogin = ({ unionId, mobile, code }) => {
  return _axios({
    method: 'post',
    url: '/login/social/bind',
    data: {
      unionId,
      mobile,
      code
    }
  })
}

/**
 * 获取QQ完善信息的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns promise
 */
export const userQQPatchCode = mobile => {
  return _axios({
    url: '/register/code',
    method: 'get',
    params: {
      mobile
    }
  })
}

/**
   * QQ登录-完善信息
   * @param {String} unionId - QQ唯一标识，openId
   * @param {String} mobile - 手机号
   * @param {String} code - 验证码
   * @param {String} account - 帐号
   * @param {String} password - 密码
   * @returns
   */
export const userQQPatchLogin = (unionId, data) => {
  return _axios({
    url: `/login/social/${unionId}/complement`,
    method: 'post',
    data: data
  })
}
