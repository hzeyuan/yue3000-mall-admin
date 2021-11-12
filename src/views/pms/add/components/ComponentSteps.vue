<template>
  <div class="steps-box">
    <el-steps direction="vertical" :active="instep" >
      <el-step class="step" :title="item.title" :key="index"
               v-for="(item, index) in steps" @click.native="onStep(item, index)">
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: "Steps",
  data() {
    return {
      instep: 1,
      steps: [
        {
          id: 1,
          title: '商品分类'
        },
        {
          id: 2,
          title: '基本信息'
        },
        {
          id: 3,
          title: '商品属性'
        },
        {
          id: 4,
          title: '销售资讯'
        }
      ]
    }
  },
  methods: {
    onStep (item, index) {
      this.instep  = index
    },
  }
}
</script>

<style scoped>
.steps-box{
  height: 300px;
  position: fixed;
  right: 80px;
  top: 160px;
}
.step{
  cursor: pointer;
}
</style>
