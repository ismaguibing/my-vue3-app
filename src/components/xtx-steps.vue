
<script>
export default {
  name: 'XtxSteps',

  props: {
    active: {
      type: Number,
      default: 1
    }
  },

  render () {
    const slots = this.$slots.default()
    console.log(slots)
    const steps = []
    slots.forEach(v => {
      if (v.type.name === 'XtxStep') {
        steps.push(v)
      } else {
        v.children.forEach(j => {
          steps.push(j)
        })
      }
    })

    const content = slots.map((v, i) => {
      return (
        <div class='xtx-steps-item ' class={{ active: i < this.active }}>
          <div class='step'>
            <span>{i + 1}</span>
          </div>
          <div class='title'>{v.props?.title}</div>
          <div class='desc'>{v.props?.desc}</div>
        </div>
      )
    })

    return <div class='xtx-steps'>{[content]}</div>
  }
}
</script>
<style lang="less">
.xtx-steps {
  display: flex;
  text-align: center;
  &-item {
    flex: 1;
    &:first-child {
      .step {
        &::before {
          display: none;
        }
      }
    }
    &:last-child {
      .step {
        &::after {
          display: none;
        }
      }
    }
    &.active {
      .step {
        > span {
          border-color: @xtxColor;
          background: @xtxColor;
          color: #fff;
        }
        &::before,
        &::after {
          background: @xtxColor;
        }
      }
      .title {
        color: @xtxColor;
      }
    }
    .step {
      position: relative;
      > span {
        width: 48px;
        height: 48px;
        font-size: 28px;
        border: 2px solid #e4e4e4;
        background: #fff;
        border-radius: 50%;
        line-height: 44px;
        color: #ccc;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
      &::after,
      &::before {
        content: "";
        position: absolute;
        top: 23px;
        width: 50%;
        height: 2px;
        background: #e4e4e4;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
    .title {
      color: #999;
      padding-top: 12px;
    }
    .desc {
      font-size: 12px;
      color: #999;
      padding-top: 6px;
    }
  }
}
</style>
