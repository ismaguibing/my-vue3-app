// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'

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
      console.log(ctx(v).default) // 当前的这个组件 （获取到的所有组件）

      const component = ctx(v).default
      app.component(component.name, component)
    })
  }
}
