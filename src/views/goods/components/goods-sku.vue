<template>
  <div class="goods-sku">
    <dl v-for="item in goods?.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img @click="changeSelected (item, val)" v-if="val.picture" :src="val.picture" :title="val.name" alt="" :class="{ selected: val.selected,disabled:val.disabled }" />
          <span @click="changeSelected (item, val)" :class="{ selected: val.selected,disabled:val.disabled }" v-else>{{ val.name }}</span>
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
    goods: Object,
    skuId: String
  },

  setup (props, { emit }) {
    // const pathMap = reactive({})
    // spec: 规格
    //  val: 规格的值
    const changeSelected = (spec, val) => {
      // 如果按钮被禁用了，不执行逻辑
      if (val.disabled) return
      // 增加一个selected
      if (val.selected) {
        val.selected = false
      } else {
        // 让所有的都不选中
        spec.values.forEach(item => {
          item.selected = false
        })
        // 让自己选中
        val.selected = true
      }
      // 改变按钮的禁用状态
      updateDisableedStatus(props.goods.specs, pathMap)
      // 子传父的方式 把选择的sku的信息传递给父组件
      const array = getSelectedSpec(props.goods.specs).filter(v => v)

      if (array.length === props.goods.specs.length) {
        //   选择了完成的规格

        const skuId = pathMap[array.join('★')]

        const sku = props.goods.skus.find(v => v.id === skuId[0])

        emit('changeSku', sku)
      } else {
        emit('changeSku', {})
      }
    }
    const pathMap = getPathMap(props.goods.skus)

    // 父组件传递了skuId,需要设置规格的默认选中
    if (props.skuId) {
      const sku = props.goods.skus.find(item => item.id === props.skuId)
      console.log(sku, 'sku')
      // console.log(sku)
      props.goods.specs.forEach((item, index) => {
        const name = sku.specs[index].valueName
        // 先让所有的选中都变成不选中
        item.values.forEach(val => {
          val.selected = false
        })
        item.values.find(val => val.name === name).selected = true
      })
    }

    // 禁用按钮
    updateDisableedStatus(props.goods.specs, pathMap)

    return {
      changeSelected
    }
  }
}

/**
 * 获取路径字典
 */
function getPathMap (skus) {
  const pathMap = {}
  skus = skus.filter(item => item.inventory > 0)
  // console.log(skus)
  skus.forEach(item => {
    const arr = item.specs.map(val => val.valueName)
    // console.log(arr)
    const result = getPowerSet(arr)
    result.forEach(v => {
      const key = v.join('★')
      if (!pathMap[key]) {
        // 增加属性
        pathMap[key] = [item.id]
      } else {
        pathMap[key].push(item.id)
      }
    })
  })
  return pathMap
}

/**
 * 控制按钮的禁用状态
 * 核心思路：遍历所有的规格，判断规格在pathMap中是否是存在的，如果存在，说明这个按钮能够，否则这个按钮应该禁用
 */
function updateDisableedStatus (specs, pathMap) {
  // console.log('更新按钮的禁用状态')
  specs.forEach((spec, index) => {
    // 获取选中的属性
    const slectedValues = getSelectedSpec(specs)
    spec.values.forEach(item => {
      slectedValues[index] = item.name
      const key = slectedValues.filter(v => v).join('★')
      item.disabled = !pathMap[key]
      // if (pathMap[item.name]) {
      //   // 这个规格属性是存在的
      //   item.disabled = false
      // } else {
      //   item.disabled = true
      // }
    })
  })
}

/**
 * 获取选中的规格的值
 * 原则：得到的结果 [undefined, undefined, undefined]
 */
function getSelectedSpec (specs) {
  // console.log(specs)
  const arr = []
  specs.forEach((spec, index) => {
    // console.log(spec)
    // 根据spec的values中查找是否有slectd为true的，把selected为true的那个name存起来
    const val = spec.values.find(item => item.selected)
    if (val) {
      arr[index] = val.name
    } else {
      arr[index] = undefined
    }
  })
  return arr
}
</script>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  margin-bottom: 5px;
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
