<template>
  <div id="LotteryDialog">
    <el-dialog title="抽奖活动详情" :visible.sync="dialogShow" width="40%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="onAddDate()" v-if="isEdge">添 加</el-button>
        <el-button type="primary" @click="onUpdateDate()" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "LotteryDialog",
  props: {
    isEdge: Boolean,
  },
  data () {
    return {
      dialogShow: true,
      ActivityData: {
      }
    }
  }
}
</script>

<style scoped>

</style>
