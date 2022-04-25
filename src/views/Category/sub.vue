<template>
  <div class="container">
    <SubBread></SubBread>

    <SubFilter></SubFilter>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
export default {
  name: 'SubCategory',

  components: {
    SubBread,
    SubFilter
  }

}

</script>
<style scoped lang='less'>
</style>
