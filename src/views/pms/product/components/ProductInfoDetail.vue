<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="商品名称：">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类：">
        <el-cascader-panel :options="options" v-model="category_id"
                           :props="{value:'id',label:'name',children: 'child'}">
        </el-cascader-panel>
      </el-form-item>
      <el-form-item label="商品图片：">
        <picture-upload :isEdit="isEdit" :gallery="value.gallery"></picture-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchTreeList} from '@/api/productCate'
  import PictureUpload from '@/components/UploadComponents/PictureUpload'

  export default {
    name: "ProductInfoDetail",
    components:{
      PictureUpload
    },
    watch: {
      category_id:{
        deep: true,
        handler() {
          this.value.category_id = this.category_id.slice(-1)[0]
        }
      }
    },
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        options: [],
        category_id: ''
      };
    },
    created() {
      this.reqTreeClass()
    },
    methods: {
      async reqTreeClass() {
        const res = await fetchTreeList()
        console.log(res)
        this.options = res
      },
    }
  }
</script>

<style scoped>
</style>
