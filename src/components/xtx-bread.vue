<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  props: {
    icon: {
      type: String,
      default: 'icon-angle-right'
    }
  },
  render () {
    const slots = this.$slots.default()
    const arr = []
    slots.forEach((item, index) => {
      arr.push(item)
      if (index < slots.length - 1) {
        // 说明还不是最后一个
        // <i class="iconfont icon-angle-right"></i>
        const vNode = h('i', { className: `iconfont ${this.icon}` })
        arr.push(vNode)
      }
    })
    return h('div', { className: 'xtx-bread' }, arr)
  }
}
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
