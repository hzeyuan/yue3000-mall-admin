<template>
  <div class="appMy">
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
import {getAppMyById, updateAppMy, addAppMy} from "@/api/decorate";
import IconUpload from "@/components/UploadComponents/IconUpload";

const defaultMyData = {
  name: '',
  image: '',
  sort: 0,
  link_address: ''
};
export default {
  name: "appMy",
  components: {
    IconUpload
  },
  props: {
    isEdge: {
      type: Boolean,
      Default: false
    }
  },
  watch: {
  },
  data () {
    return {
      myData: Object.assign({}, defaultMyData),
      myRules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        link_address: [
          {required: true, message: '请输入路由', trigger: 'blur'},
        ]
      },
      icon: '11111',
      iconShow: true,
    }
  },
  methods: {
    // 根据ID获取AppMy数据
    async reqGetAppMyData (id) {
      const res = await getAppMyById(id)
      this.myData = res
      this.$forceUpdate()
    },
    // 添加数据到服务器
    onAddAppMy(myForm) {
      this.$refs[myForm].validate((valid) => {
        if (valid) {
          // 表单验证成功
          this.$confirm('是否添加该条数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            // 对上传数据进行修改
            this.myData.image = this.$refs.uploadIcon.gallery
            addAppMy(this.myData).then (res =>{
              console.log(res)
              this.$message({
                message: '添加成功',
                type: 'success',
                duration: 1000
              });
              this.$router.back();
            })
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          });
          return false;
        }
      });
    },
    // 对服务器数据进行修改
    onUpdateAppMy(myForm) {
      this.$refs[myForm].validate((valid) => {
        if (valid) {
          // 表单验证成功
          this.$confirm('是否修改该条数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            // 对上传数据进行修改
            this.myData.image = this.$refs.uploadIcon.gallery
            updateAppMy(this.$route.params.id,this.myData).then (res =>{
              console.log(res)
              this.$message({
                message: '修改成功',
                type: 'success',
                duration: 1000
              });
              this.$router.back();
            })
          })
        } else {
          // 表单验证失败
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          });
          return false;
        }
      });
    },
    // 重置表单属性
    onresetForm(myForm) {
      this.$refs[myForm].resetFields();
    }
  },
  created() {
    if (this.isEdge) {
      this.reqGetAppMyData(this.$route.params.id)
    }
  }
}
</script>

<style scoped>

</style>
