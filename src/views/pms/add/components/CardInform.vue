<template>
<!--  商品基本信息-->
  <el-card class="card" shadow="never">
    <div class="text">
      <div class="title">
        基本信息
      </div>
      <div class="describe">
        填写商品展示的基本信息
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <div>商品图片：</div>
      <picture-upload></picture-upload>
    </div>
    <div>
      <div>商品影片：</div>
      <div>
        <el-upload action="#" list-type="picture-card"
                   :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <!--          图片  -->
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <!--          遮罩层-->
            <span class="el-upload-list__item-actions">
    <!--            查看图片   -->
            <span class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
              <!--            删除图片图标-->
            <span class="el-upload-list__item-delete"
                  v-if="!disabled" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
    <div>
      <div>商品描述：</div>
      <div>
        <textarea autocomplete="off" rows="2" placeholder="请输入内容"
                  class="el-textarea__inner" style="min-height: 33px;
                  margin-top: 0px; margin-bottom: 0px; height: 130px;">
        </textarea>
      </div>
    </div>
  </el-card>
</template>

<script>
import PictureUpload from '@/components/UploadComponents/PictureUpload'
import {policy} from '@/api/oss'

export default {
  name: "CardInform",
  components: {
    PictureUpload
  },
  data() {
    return {
      fileList: [],
      textarea: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  methods: {
    // 对话框 查看图片详情
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 删除图片
    handleRemove(file) {
      console.log(file);
    },
    // 覆盖组件原生上传
    async reqUpload (e) {
      const form_data = new FormData();
      form_data.append("files", e.file);
      const res = await policy(form_data)
      console.log(res)
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
