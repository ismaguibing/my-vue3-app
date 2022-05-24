import { onBeforeUnmount, onMounted, ref } from 'vue'

import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'

import dayjs from 'dayjs'
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

// 数据懒加载
export const useLazyData = (apiFn) => {
  const list = ref([])
  const target = ref(null)

  //   isIntersecting   布尔值 返回是否在当前可视区
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      // stop 以停止监听
      stop()
      // 掉请求获取数据
      apiFn().then(res => {
        list.value = res.result
      })
    }
  }, { threshold: 0 }
  )
  return {
    list,
    target
  }
}

/**
 * 封装倒计时定时器
 */
export const useCounter = (num = 60) => {
  const time = ref(0)

  const { pause, resume } = useIntervalFn(() => {
    time.value--
    if (time.value <= 0) {
      pause()
    }
  }, 1000, { immediate: false })

  const start = () => {
    time.value = num
    resume()
  }

  onBeforeUnmount(() => {
    pause()
  })

  return { time, start }
}

export const formatPayTime = () => {
  const time = ref(0)
  const showTime = ref('')
  const { resume, pause } = useIntervalFn(() => {
    time.value--
    showTime.value = dayjs.unix(time.value).format('mm分ss秒')
    if (time.value < 0) {
      pause()
    }
  }, 1000, { immediate: true })

  onBeforeUnmount(() => {
    pause()
  })

  const start = (num = 0) => {
    time.value = num
    showTime.value = dayjs.unix(time.value).format('mm分ss秒')
    resume()
  }

  return {
    start,
    time,
    showTime
  }
}
