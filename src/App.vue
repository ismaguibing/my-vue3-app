<template>
  <router-view/>
</template>

<script>
import axios from '@/utils/request.js'
export default {
  async setup () {
    const res = await axios({
      url: '/home/hot'
    })
    console.log(res)
  }
}
</script>
