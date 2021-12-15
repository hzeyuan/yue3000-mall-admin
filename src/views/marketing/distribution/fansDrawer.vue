<template>
  <el-drawer title="粉丝列表" :visible.sync="visible" direction="rtl">
    123
  </el-drawer>
</template>

<script>
  import { fans } from '@/api/user'
  export default {
    name: 'earningsDetail',
    data() {
      return {
        visible: false,
      }
    },
    watch: {},
    methods: {
      async open(id) {
        this.visible = true
        await fans(id)
      },
    },
  }
</script>

<style></style>
