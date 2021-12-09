<!--单张图片的上传 上传后隐藏上传框-->
<template>
  <div class="PictureUpload">
    <el-upload
      :class="{disabled:upShow}"
      action="''"
      list-type="picture-card"
      :file-list="fileList"
      :http-request="reqUpload"
      :before-remove="beforeRemove"
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
  name: "iconUpload",
  props: {
    icon: String,
  },
  computed: {
    // 计算图片数量 若为1 则隐藏上传窗口
    upShow () {
      if (this.gallery === '') {
        return false
      }
      return true
    },
  },
  data () {
    return {
      // 图片上传的数据列表
      fileList: [],
      // 单张图片的地址
      gallery: '',
      // 对话框大图相关的图片
      dialogImageUrl: '',
      // 对话框的显示
      dialogVisible: false
    }
  },
  methods: {
    // 上传图片
    async reqUpload (e) {
      const form_data = new FormData();
      form_data.append("files", e.file);
      const res = await policy(form_data)
      this.gallery = res[0].url
    },
    // 打开图片大图
    handlePictureCardPreview(file) {
      console.log('file', file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 删除图片 并对gallery数据进行处理
    handleRemove () {
      this.gallery = ''
    },
    // 删除图片前的对话框
    beforeRemove(file, fileList){
      return this.$confirm('确定删除该图片？');
    },
  },
  mounted() {
    if (this.icon !== null && this.icon !== '' && this.icon !== undefined) {
      this.fileList = [{
        url: this.icon,
        id: 1
      }]
      this.gallery = this.icon
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
