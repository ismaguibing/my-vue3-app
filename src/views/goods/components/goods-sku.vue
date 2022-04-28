<template>
  <div class="goods-sku">
    <dl v-for="item in goods?.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img @click="changeSelected (item, val)" v-if="val.picture" :src="val.picture" :title="val.name" alt="" :class="{ selected: val.selected, }" />
          <span @click="changeSelected (item, val)" :class="{ selected: val.selected, }" v-else>{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>

import getPowerSet from '@/vendor/bwPowerSet'

export default {
  name: 'GoodsSku',

  props: {
    goods: Object
  },

  setup (props) {
    // const pathMap = reactive({})
    // spec: 规格
    //  val: 规格的值
    const changeSelected = (spec, val) => {
      // 增加一个selected
      if (val.selected) {
        val.selected = false
      } else {
        // 让所有的都不选中
        spec.values.forEach(item => { item.selected = false })
        // 让自己选中
        val.selected = true
      }
    }
    const pathMap = getPathMap(props.goods.skus)

    return {
      changeSelected,
      pathMap
    }
  }
}

function getPathMap (skus) {
  const pathMap = {}
  const star = '★'
  skus = skus.filter(v => v.inventory > 0)
  skus.forEach(v => {
    const arr = v.specs.map(v => v.valueName)
    const result = getPowerSet(arr)
    result.forEach(j => {
      const key = j.join(star)
      if (pathMap[key]) {
        pathMap[key].push(v.id)
      } else {
        pathMap[key] = [v.id]
      }
    })
  })
  console.log(pathMap)
  return pathMap
}

</script>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
