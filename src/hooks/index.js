import { onBeforeUnmount, onMounted, ref } from 'vue'

// 获取x,y滚动的距离
export const userScroll = () => {
  const x = ref(0)
  const y = ref(0)

  const scroll = () => {
    x.value = document.documentElement.scrollLeft
    y.value = document.documentElement.scrollTop
  }

  // 页面渲染完成 获取滚动距离
  onMounted(() => {
    window.addEventListener('scroll', scroll)
  })

  // 组件销毁清除事件监听
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', scroll)
  })

  return {
    x,
    y
  }
}
