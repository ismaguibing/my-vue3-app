<template>
  <div class="container">
    <SubBread></SubBread>

    <SubFilter></SubFilter>

    <div class="goods-list">
      <SubSort />
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
export default {
  name: 'SubCategory',

  components: {
    SubBread,
    SubFilter,
    SubSort
  }

}

</script>
<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
