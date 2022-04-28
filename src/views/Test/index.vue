<template>
  <div class="container">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
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
@media (min-width: 768px) {
  .container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.container {
  display: grid;
  .item {
    width: 100px;
    height: 100px;
    background: red;
  }
}

.conainer {
  gap: 1rem;
}
</style>
