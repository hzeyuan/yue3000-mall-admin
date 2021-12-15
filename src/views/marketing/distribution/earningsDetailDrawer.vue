<template>
  <el-drawer
    title="收入明细"
    :visible.sync="visible"
    direction="rtl"
  ></el-drawer>
</template>

<script>
  import { earningsDetail } from '@/api/user'
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
        await earningsDetail(id)
      },
    },
  }
</script>

<style></style>
