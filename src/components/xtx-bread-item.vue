<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to">
      <slot />
    </RouterLink>
    <span v-else>
      <slot />
    </span>
  </div>
</template>
<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object]
    }
  }
}
</script>

<style scoped lang="less">
.xtx-bread-item {
  a {
    color: #666;
    transition: all 0.4s;
    &:hover {
      color: @xtxColor;
    }
  }
}
</style>
