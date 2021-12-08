<template>
  <el-container style="height: 100%; overflow: scroll; border: 1px solid #eee">
    <el-main style="min-height: calc(100vh - 156px); argin-bottom: 60px">
      <el-row :gutter="20">
        <el-col style="width: 100%" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <!-- 等级信息 -->
            <el-card>
              <div slot="header" class="clearfix">
                <span>等级信息</span>
              </div>
              <el-form-item label="等级名称" prop="name">
                <el-input
                  class="w-48"
                  v-model="ruleForm.name"
                  placeholder="请输入等级名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="等级图标" prop="image">
                <picture-upload
                  :gallery="ruleForm.image"
                  :isEdge="true"
                  ref="userLevelImage"
                ></picture-upload>
              </el-form-item>
              <el-form-item label="等级背景图" prop="background_image">
                <picture-upload
                  :gallery="ruleForm.image"
                  :isEdge="true"
                  ref="userLevelbackgroundImage"
                ></picture-upload>
              </el-form-item>
              <el-form-item class="w-100" label="等级表述" prop="remark">
                <el-radio-group v-model="ruleForm.remark">
                  <el-input
                    v-model="ruleForm.remark"
                    type="textarea"
                  ></el-input>
                </el-radio-group>
              </el-form-item>
            </el-card>
            <!-- 等级权益 -->
            <el-card>
              <div slot="header" class="clearfix">
                <span>等级权益</span>
              </div>
              <div>
                <el-form-item label="等级折扣">
                  <el-radio-group v-model="ruleForm.discount">
                    <el-radio :label="0">无等级折扣</el-radio>
                    <div class="pt-1 flex items-center">
                      <el-radio :label="1">参与等级折扣</el-radio>
                      <el-input v-model="levelDiscount">
                        <template slot="append">折</template>
                      </el-input>
                    </div>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-card>
            <el-card>
              <div slot="header" class="clearfix">
                <span>等级条件</span>
              </div>
              <el-form-item label="升级所需成长值">
                <el-input class="w-60" v-model="ruleForm.growth_value" />
              </el-form-item>
            </el-card>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div class="flex justify-center items-center">
        <el-button type="primary" @click="submitForm('ruleForm')">
          保存
        </el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  import PictureUpload from '@/components/Upload/PictureUpload'
  import { addUserLevel, updateUserLevel, getUserLevel } from '@/api/user'
  export default {
    name: 'userLevelAdd',
    components: { PictureUpload },
    data() {
      return {
        ruleForm: {
          name: '',
          image: [],
          growth_value: 0,
          background_image: [],
          discount: 0,
          remark: '',
        },
        levelDiscount: 10, // 用户参与等级折扣，默认10折
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {
              min: 1,
              max: 30,
              message: '长度在 1 到 30 个字符',
              trigger: 'blur',
            },
          ],
        },
      }
    },
    created() {
      const { name, query } = this.$route
      if (name == 'levelAdd') return
      if (name === 'levelEdit') {
        console.log('query', query)
        getUserLevel(query.id).then((res) => {
          console.log('res', res)
          if (res['discount']) {
            this.levelDiscount = res['discount']
            res['discount'] = 1
          } else {
            res['discount'] = 0
          }
          this.ruleForm = {
            ...res,
            image: _.castArray(res['image']),
            background_image: _.castArray(res['background_image']),
          }
        })
      }
    },
    methods: {
      // 提交
      async submitForm(formName) {
        await this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const data = {
              ..._.pick(this.ruleForm, [
                'name',
                'remark',
                'image',
                'background_image',
                'growth_value',
              ]),
            }
            if (this.ruleForm.discount === 1) {
              data['discount'] = this.levelDiscount
            } else {
              data['discount'] = 10
            }
            data['image'] = this.$refs['userLevelImage'].fileList[0].url
            data['background_image'] =
              this.$refs['userLevelbackgroundImage'].fileList[0].url
            console.log('form', data)
            try {
              const { name, query } = this.$route
              let message = ''
              if (name == 'levelAdd') {
                await addUserLevel(data)
                message = '添加成功'
              } else if (name === 'levelEdit') {
                message = '修改成功'
                await updateUserLevel(query.id, data)
              }
              this.$message({
                type: 'success',
                message,
                duration: 1000,
              })
              this.$router.back()
            } catch (error) {}
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
    },
  }
</script>
<style scoped>
  .el-footer {
    display: fixed;
  }
</style>
