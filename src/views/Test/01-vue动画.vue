<template>
  <div>
    <button @click="show = !show">annuity</button>
    <transition>
      <div class="box" v-if="show"></div>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Test',

  setup () {
    const show = ref(true)

    return {
      show
    }
  }
}

</script>
<style scoped lang='less'>
.box {
  width: 100px;
  height: 100px;
  background: pink;
}
.v-enter-from {
  transform: translateX(-100%);
}
.v-enter-active {
  transition: all 0.5s;
}
.v-enter-to {
  transform: translateX(0%);
}
</style>
