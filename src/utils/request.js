import axios from 'axios'
import store from '@/store'
const instance = axios.create({
  baseURL: 'https://apipc-xiaotuxian-front.itheima.net',
  timeout: 2000
  // headers: { 'X-Custom-Header': 'foobar' }
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  const { proFile } = store.state.user
  if (proFile.token) {
    // 3. 设置token
    config.headers.Authorization = `Bearer ${proFile.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default instance
