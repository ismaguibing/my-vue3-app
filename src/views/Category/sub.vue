<template>
  <div class="container">
    <SubBread></SubBread>

    <SubFilter @changeFilter='changeFilter'></SubFilter>

    <div class="goods-list">
      <SubSort @sort-change="changeSort" />

      <!-- 商品列表 -->
      <ul>
        <li v-for="i in goodsList" :key="i.id">
          <GoodsItem :good="i" />
        </li>
      </ul>

      <xtx-infinite-loading v-model:loading="loading" :finished='finished' @load='onLoad'></xtx-infinite-loading>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { findSubCategoryGoods } from '@/api/category'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',

  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },

  setup () {
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    const route = useRoute()
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20,
      categoryId: route.params.id
    }

    const onLoad = () => {
      loading.value = true
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          finished.value = true
        }
        // 请求结束后，需要修改loading
        loading.value = false
      })
    }

    const changeSort = (sortParams) => {
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
      onLoad()
    }

    const changeFilter = (params) => {
      reqParams = { ...reqParams, ...params }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
      onLoad()
    }

    // 监听二级分类id的变化
    watch(
      () => route.params.id,
      newVal => {
        if (!route.path.includes('/sub')) return
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 20,
          categoryId: newVal
        }
        finished.value = false
      }
    )

    return {
      loading,
      finished,
      goodsList,
      onLoad,
      changeSort,
      changeFilter
    }
  }

}

</script>
<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
