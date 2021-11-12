<template>
<!--  商品销售信息-->
  <el-card class="card" shadow="never">
    <div class="text">
      <div class="title">
        销售资讯
      </div>
      <div class="describe">
        设置商品的销售优惠
      </div>
    </div>
    <el-divider></el-divider>
    <el-form label-position="right" label-width="80px"
             style="overflow: hidden; width: 600px; margin: auto"
             :model="formLabelAlign">
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "CardSales",
  data() {
    return {
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  }
}
</script>

<style scoped>
.text .title{
  font-size: 24px;
  line-height: 36px;
}

.text .describe{
  font-size: 14px;
  line-height: 32px;
  color: #DCDFE6;
}
</style>
