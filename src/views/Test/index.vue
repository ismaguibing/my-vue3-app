<template>
  <div class="box"></div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  name: '',
  setup () {
    onMounted(() => {
      const modal = document.querySelector('.box')
      console.log(modal, '!@#')
      document.addEventListener('click', function (e) {
        console.log(e, '?????')
        if (e.target === modal) {
          console.log('点击了')
        } else {
          modal.style.display = 'none'
        }
      })
    })
  }

}

</script>
<style scoped lang='less'>
.box {
  width: 400px;
  height: 400px;
  background: pink;
  margin: 200px auto 0;
}
</style>
