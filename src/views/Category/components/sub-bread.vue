<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem :to="`/category/${category.top.id}`">{{category.top.name}}</XtxBreadItem>
    <transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="category.sub.id" :to="`/category/sub/${category.sub.id}`">{{category.sub.name}}</XtxBreadItem>
    </transition>
  </XtxBread>
</template>

<script>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SubBread',

  setup () {
    const store = useStore()
    const route = useRoute()

    const category = computed(() => {
      const goal = reactive({
        top: {},
        sub: {}
      })

      store.state.category.list.forEach(item => {
        item.children && item.children.forEach(sub => {
          if (sub.id === route.params.id) {
            goal.top = { id: item.id, name: item.name }
            goal.sub = { id: sub.id, name: sub.name }
          }
        })
      })

      return goal
    })

    return {
      category
    }
  }

}
</script>
