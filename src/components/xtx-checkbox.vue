<template>
  <div class="xtx-checkbox" @click="change">
    <i class="iconfont icon-checked" v-if="checked"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxCheckbox',

  props: {
    modelValue: {
      default: false,
      type: Boolean
    }
  },
  setup (props, { emit }) {
    const checked = ref(false)

    watch(() => props.modelValue, value => {
      checked.value = value
    })

    const change = () => {
      //   checked.value = !checked.value
      emit('update:modelValue', !checked.value)
    }

    return {
      checked,
      change
    }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
