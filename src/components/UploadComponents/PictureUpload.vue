<template>
    <div class="PictureUpload">
      <el-upload
        action="''"
        multiple
        list-type="picture-card"
        :file-list="fileList"
        :http-request="reqUpload"
        :limit="limit"
        :before-remove="beforeRemove"
        :on-exceed="handleExceed"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
</template>

<script>
import {policy} from '@/api/oss'

export default {
  name: "PictureUpload",
  data () {
    return {
      // 有默认数据时，该数组会对组件数据做第一次处理
      fileList: [],
      // 数据列表 可以防抖
      gallery: [],
      // 最多上传的图片数量
      limit: 8,
      textarea: '',
      disabled: false,
      // 对话框大图相关的图片
      dialogImageUrl: '',
      // 对话框的显示
      dialogVisible: false
    }
  },
  methods: {
    // 上传到服务端 获取服务端url 单个上传 如果上传多个 会逐一请求
    // 数据请求后el组件中会自行添加 fileList数据不会变动 galler数据手动添加
    async reqUpload (e) {
      const form_data = new FormData();
      form_data.append("files", e.file);
      const res = await policy(form_data)
      console.log('res', res)
      this.gallery.push(res[0])
    },
    // 删除图片 并对galler数据进行处理
    handleRemove (file) {
      this.gallery.splice(this.gallery.findIndex(item => item.id === file.id), 1)
      console.log(this.gallery)
    },
    // 删除图片前的对话框
    beforeRemove(file, fileList){
      return this.$confirm('确定删除该图片？');
    },
    // 超过最大上传个数时的提示
    handleExceed (files, fileList) {
      this.$message({
        message: '最多只能上传'+this.limit+'张图片',
        type: 'warning',
        duration:1000
      })
    },
    // 打开图片大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>

</style>
