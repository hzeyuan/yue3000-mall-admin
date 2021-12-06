<template>
<div id="menuDetails">
  <el-card class="form-container" shadow="never">
    <el-form :model="myData" :rules="myRules" label-width="100px" ref="myForm">
      <el-form-item label="功能名称" prop="name">
        <el-input v-model="myData.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <icon-upload :icon="myData.image" :isEdge="isEdge" ref="uploadIcon"></icon-upload>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="myData.sort"></el-input>
      </el-form-item>
      <el-form-item label="路由" prop="link_address">
        <el-input v-model="myData.link_address"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button v-if="isEdge" type="primary" @click="onUpdateAppMy('myForm')">修改</el-button>
        <el-button v-else type="primary" @click="onAddAppMy('myForm')">添加</el-button>
        <el-button @click="onresetForm('myForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
export default {
  name: "menuDetails"
};
</script>

<style lang="scss" scoped>
#menuDetails{

}
</style>
