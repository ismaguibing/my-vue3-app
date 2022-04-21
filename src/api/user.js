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
