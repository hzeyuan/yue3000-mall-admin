<template>
  <el-card>
    <div style="width: 600px; margin: auto">
      <el-form
        ref="productCateFrom"
        :model="productCate"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="分类名称：" prop="name">
          <el-input v-model="productCate.name"></el-input>
        </el-form-item>
        <el-form-item label="分类级别：" prop="pid">
          <el-select v-model="productCate.level" placeholder="请选择分类">
            <el-option
              v-for="item in levelList"
              :key="item.id"
              :label="item.label"
              :value="item.level"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级分类：" prop="pid">
          <el-select
            filterable
            v-model="productCate.pid"
            :disabled="!productCate.level"
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in selectProductCateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="productCate.sort_order"></el-input>
        </el-form-item>
        <el-form-item label="分类图标：">
          <icon-upload
            ref="icon_url"
            v-if="uploadShow"
            :icon="productCate.icon_url"
          ></icon-upload>
        </el-form-item>
        <el-form-item label="分类图片：">
          <icon-upload
            ref="pic_url"
            v-if="uploadShow"
            :icon="productCate.pic_url"
          ></icon-upload>
        </el-form-item>
        <el-form-item label="关键词：">
          <el-input v-model="productCate.keywords"></el-input>
        </el-form-item>
        <el-form-item label="分类描述：">
          <el-input
            v-model="productCate.desc"
            type="textarea"
            :autosize="true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="!isEdit"
            type="primary"
            @click="addSubmit('productCateFrom')"
          >
            提交
          </el-button>
          <el-button
            v-if="isEdit"
            type="primary"
            @click="onSubmit('productCateFrom')"
          >
            修改
          </el-button>
          <el-button v-if="!isEdit" @click="resetForm('productCateFrom')">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import {fetchList, addProductCate, updateProductCate} from '@/api/category'
import IconUpload from '@/components/Upload/IconUpload'

const defaultProductCate = {
  // 分类名称
  name: '',
  // 父id 0表示一级分类 否则表示一级分类的id
  pid: '',
  // 排序
  sort_order: 0,
  // 分类级别
  level: '',
  // 图标
  icon_url: '',
  // 图片
  pic_url: '',
  // 关键字
  keywords: '',
  // 分类描述
  desc: '',
}
export default {
  name: 'ProductCateDetail',
  components: {IconUpload},
  props: {
    // 判断进入的是什么窗口 false为增加分类
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 表单数据
      productCate: Object.assign({}, defaultProductCate),
      // 上级分类选择器列表
      selectProductCateList: [],
      // 表单验证规则
      rules: {
        name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'},
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur',
          },
        ],
        pid: [{required: true, message: '请选择分类类型', trigger: 'blur'}],
      },
      levelList: [
        {id: 1, level: 'L1', label: '一级菜单'},
        {id: 2, level: 'L2', label: '二级菜单'},
        {id: 3, level: 'L3', label: '三级菜单'},
      ],
      filterAttrs: [],
      uploadShow: true,
    }
  },
  watch: {
    'productCate.level': {
      deep: true,
      handler: function () {
        this.productCate.pid = ''
        if (!this.productCate.level) return
        this.getSelectProductCateList()
      },
    },
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.query.id
      this.getCategoriesById(id)
    }
  },
  methods: {
    // 获取上一级菜单列表
    async getSelectProductCateList() {
      if (this.productCate.level === 'L1') {
        this.productCate.pid = 0
        this.selectProductCateList = [{id: 0, name: '无上级分类'}]
      } else {
        const res = await fetchList(`?level=${this.productCate.level === 'L2' ? 'L1' : 'L2'}`)
        this.selectProductCateList = res
      }
    },
    // 根据ID获取分类详细
    async getCategoriesById(id) {
      this.uploadShow = false
      const res = await fetchList('?id=' + id)
      this.productCate = res[0]
      this.uploadShow = true
    },
    // 修改分类信息
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否修改该条数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            let {icon_url, pic_url, ...query} = this.productCate
            let data = {
              ...query,
              icon_url: this.$refs.icon_url.gallery,
              pic_url: this.$refs.pic_url.gallery,
            }
            updateProductCate(this.$route.query.id, data).then(
              (res) => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000,
                })
                this.$router.back()
              }
            )
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000,
          })
          return false
        }
      })
    },
    // 添加分类信息
    addSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否添加该条数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            let {icon_url, pic_url, ...query} = this.productCate
            let data = {
              ...query,
              icon_url: this.$refs.icon_url.gallery,
              pic_url: this.$refs.pic_url.gallery,
            }
            addProductCate(data).then((res) => {
              console.log(res)
              this.$message({
                message: '添加成功',
                type: 'success',
                duration: 1000,
              })
              this.$router.back()
            })
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000,
          })
          return false
        }
      })
    },
    // 重置表单属性
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.productCate = Object.assign({}, defaultProductCate)
    },
  },
}
</script>

<style scoped></style>
