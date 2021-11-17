<template>
<!--  商品属性-->
  <el-card class="card" shadow="never">
    <div class="text">
      <div class="title">
        商品属性
      </div>
      <div class="describe">
        设置你商品的属性
      </div>
    </div>
    <el-divider></el-divider>
    <el-form :model="formValue" :rules="formRules" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="商品关键字：" :prop="formRules.subTitle">
        <el-input v-model="formValue.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="商品单位：" :prop="formRules.subTitle">
        <el-input v-model="formValue.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="商品价格：" :prop="formRules.subTitle">
        <el-input v-model="formValue.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="优惠价格：" :prop="formRules.subTitle">
        <el-input v-model="formValue.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="商品详情：" :prop="formRules.subTitle">
        <el-input v-model="formValue.subTitle"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "CardAttributes",
  props: {
    value: Object
  },
  data() {
    return {
      // 表单值
      formValue: {
        subTitle: ''
      },
      // 表单验证规则
      formRules: {
        productCategoryId: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
      },
    };
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
