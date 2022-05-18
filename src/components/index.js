// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'

import { h, render } from 'vue'
import XtxMessage from './xtx-message'
import XtxConfirm from './xtx-confirm.vue'

// 统一注册组件
export default {
  install (app) {
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    const ctx = require.context('./', false, /\.vue$/)
    // console.dir(ctx.keys()) // 得到的结果
    // { 0: './xtx-carousel.vue' },
    // { 1: './xtx-more.vue' },
    // { 2: './xtx-skeleton.vue' }

    ctx.keys().forEach(v => {
    //   console.log(ctx(v).default) // 当前的这个组件 （获取到的所有组件）

      const component = ctx(v).default
      app.component(component.name, component)
    })

    // 定义指令
    // <img :src="item.src" alt="" />
    // <img v-lazy="item.src" alt="" />
    app.directive('lazy', {
      mounted (el, { value }) {
      // 图片的懒加载逻辑
      // 参数1：回调函数
      // 参数2：可选的配置
        const observer = new IntersectionObserver(
          ([{ isIntersecting }], observer) => {
            if (isIntersecting) {
            // 停止监听
              observer.unobserve(el)
              // 给el元素设置src属性
              el.src = value
              // 如果图片加载失败，显示默认的图片
              el.onerror = function () {
                el.src = require('@/assets/images/200.png')
              }
            }
          },
          {
            threshold: 0
          }
        )
        observer.observe(el)
      }
    })

    // 增加全局方法  app.config.globalProperties  全局挂载
    app.config.globalProperties.$message = Message
  }
}
// 动态的给body创建一个盒子
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)
let timer = null

export function Message ({ type, text, duration = 2000 }) {
  // 渲染XtxMessage组件
  // <XtxMessage :type="type" :text="text"></XtxMessage>
  const vNode = h(XtxMessage, { type, text })
  render(vNode, div)
  // 开启延时器
  clearTimeout(timer)
  timer = setTimeout(() => {
    // 删除虚拟DOM
    render(null, div)
  }, duration)
}

const confirmDiv = document.createElement('div')
confirmDiv.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(confirmDiv)
export function confirm ({ title, text }) {
  return new Promise((resolve, reject) => {
    const confirmCallback = () => {
      resolve()
      render(null, confirmDiv)
    }

    const cancelCallback = () => {
      reject(new Error('点击了取消'))
      render(null, confirmDiv)
    }
    //   <XtxConfirm :title='title' :text='text'></XtxConfirm>
    const vNode = h(XtxConfirm, { title, text, confirmCallback, cancelCallback })
    render(vNode, confirmDiv)
  })
}
