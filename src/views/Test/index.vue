<template>
  <section class="layout">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
  </section>
</template>

<script>
import { onMounted } from 'vue'
export default {
  name: '',
  setup () {
    onMounted(() => {
      const obj = [
        {
          data: [
            1,
            2.5,
            2.5,
            1012.5,
            0,
            0,
            0,
            0
          ]
        },
        {
          data: [
            355,
            92,
            898.5,
            4.5,
            273,
            0,
            0,
            0
          ]
        },
        {
          data: [
            4.5,
            700.5,
            138,
            7,
            0,
            0,
            0,
            0
          ]
        },
        {
          data: [
            1001,
            655.5,
            10.5,
            669.5,
            0,
            0,
            0,
            0
          ]
        }
      ]

      //   {name:"总和", data:[]}
      const goal = []
      obj.forEach(v => goal.push(v.data))
      const result = []
      for (let i = 0; i < goal.length; i++) {
        goal[i].forEach((value, index) => {
          if (result[index] == null || result[index] === '') {
            result[index] = 0
          }
          result[index] += value
        })
      }
      console.log({ name: '总和', data: result })
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

.layout {
  width: 100%;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
</style>
