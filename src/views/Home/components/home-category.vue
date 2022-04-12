<template>
  <div class='home-category' @mouseleave="categoryId=null">
    <ul class="menu">
      <li v-for="i in menuList" :key="i.id" @mouseenter="categoryId = i.id" :class="{active:i.id===categoryId}">
        <RouterLink :to="`/category/${i.id}`">{{i.name}}</RouterLink>
        <template v-if="i.children">
          <RouterLink :to="`/category/sub/${j.id}`" v-for="j in i.children" :key="j.id">{{j.name}}</RouterLink>
        </template>
        <template v-else>
          <XtxSkeleton class="xtx-skeleton" width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)"></XtxSkeleton>
          <XtxSkeleton class="xtx-skeleton" width="50px" height="18px" bg="rgba(255,255,255,0.2)"></XtxSkeleton>
        </template>
      </li>
    </ul>

    <!-- 弹层 -->
    <div class="layer">
      <h4>{{ goodsList?.id==='brand'?"品牌推荐":"分类推荐"}} <small>根据您的购买或浏览记录推荐</small></h4>
      <ul>
        <li v-for="i in goodsList?.goods" :key="i.id">
          <RouterLink to="/">
            <img v-lazy="i.picture" />
            <div class="info">
              <p class="name ellipsis-2">{{i.name}}</p>
              <p class="desc ellipsis">{{i.desc}}</p>
              <p class="price"><i>¥</i>{{i.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌 -->
      <ul v-if="goodsList?.brands">
        <li class="brand" v-for="i in goodsList.brands" :key="i.id">
          <RouterLink to="/">
            <img v-lazy="i.picture" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{i.place}}</p>
              <p class="name ellipsis">{{i.name}}</p>
              <p class="desc ellipsis-2">{{i.desc}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'

import { brandList } from '@/api/category'

export default {
  name: 'HomeCategory',

  setup () {
    const categoryId = ref('')

    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-chilren', name: '品牌推荐' }],
      brands: []
    })

    brandList().then(res => {
      brand.brands = res.result
    })
    const store = useStore()
    const menuList = computed(() => {
      const list = store.state.category.list.map(v => {
        return {
          id: v.id,
          name: v.name,
          goods: v.goods,
          children: v.children && v.children.slice(0, 2)
        }
      })
      list.push(brand) // 会有单独的品牌
      return list
    })

    const goodsList = computed(() => {
      return menuList.value.find(v => v.id === categoryId.value)
    })

    return {
      menuList,
      categoryId,
      goodsList
    }
  }
}

</script>
<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}

.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
