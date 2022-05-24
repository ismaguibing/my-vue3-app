
<script>
import { useVModel } from '@vueuse/core'
import { provide } from 'vue-demi'
export default {
  name: 'XtxTabs',

  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  setup (props, { emit }) {
    const activeName = useVModel(props, 'modelValue', emit)
    provide('activeName', activeName)

    const clickFn = (v, i) => {
      activeName.value = v.props.name
      emit('tab-click', { v, i })
    }

    return {
      activeName,
      clickFn
    }
  },

  render () {
    const slots = this.$slots.default()
    const panels = []
    slots.forEach(v => {
      if (v.type.name === 'XtxTabsPanel') {
        panels.push(v)
      } else {
        v.children.forEach(j => { panels.push(j) })
      }
    })

    const nav = <nav>
      {panels.map((v, i) => {
        return <a class={{ active: this.activeName === v.props.name }} href='javascript:;' onClick={() => this.clickFn(v, i)}>{v.props.label}</a>
      })}
    </nav>

    return <div class="xtx-tabs">{[nav, panels]}</div>
  }
}
</script>

<style lang="less">
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
