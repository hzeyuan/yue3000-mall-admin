<!--充值配置-->
<template>
  <div id="rechargeConfig">
    <el-card>
      <div class="top-box">
        <div class="text-title" @click="topOpen = !topOpen">
          <i class="el-icon-arrow-right" v-show="topOpen"></i>
          <i class="el-icon-arrow-down" v-show="!topOpen"></i>
          <span>操作提示</span>
        </div>
        <div class="text-span" v-show="!topOpen">
          <p>*设置会员下单赠送的积分和成长值</p>
          <p>*设置会员注册时赠送的相关奖励</p>
          <p>*设置会员邀请注册时的奖励</p>
        </div>
      </div>
      <div class="body-box">
        <div class="menu-title">
          <div
            class="menu-item"
            :class="{ show: menuShow === 1 }"
            @click="menuShow = 1"
          >
            充值方案
          </div>
          <div
            class="menu-item"
            :class="{ show: menuShow === 2 }"
            @click="menuShow = 2"
          >
            充值设置
          </div>
        </div>
        <div class="sign-site" v-show="menuShow === 1">
          <div class="award-add">
            <el-button size="small" type="primary" @click="onAddDialog">
              新增充值规则
            </el-button>
          </div>
          <div class="award-table">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="充值金额" align="center" width="200">
                <template slot-scope="scope">
                  ¥{{ scope.row.money | money }}
                </template>
              </el-table-column>
              <el-table-column label="赠送金额" align="center" width="200">
                <template slot-scope="scope">
                  ¥{{ scope.row.give_money | money }}
                </template>
              </el-table-column>
              <el-table-column label="推荐" align="center">
                <template slot-scope="scope">
                  <el-switch
                    :value="Boolean(scope.row.is_recommend)"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="排序" align="center" width="100">
                <template slot-scope="scope">
                  {{ scope.row.sort }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="300">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="primary"
                    @click="onUpdateDialog(scope.row)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="onDeleteDialog(scope.row.id)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="sign-record" v-show="menuShow === 2">
          <div class="form-box">
            <div class="form-item" v-for="(item, index) in data" :key="index">
              <div class="from-label">
                <span>{{ item.title }}：</span>
              </div>
              <div class="from-input">
                <el-input
                  v-model.number="item.value"
                  oninput="value=Number(value.replace(/[^0-9.]/g,''))"
                ></el-input>
              </div>
              <div class="from-button">
                <el-button type="primary" @click="handleRevise(item)">
                  修 改
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <!--  充值规则对话框-->
    <el-dialog title="充值方案" :visible.sync="dialogShow1" width="40%">
      <div style="width: 450px; margin: 0 auto">
        <el-form ref="ref-form" :rules="rules" :model="form" label-width="150px">
          <el-form-item label="充值金额：" prop="notNull">
            <el-input
              v-model="form.money"
              oninput="value=Number(value.replace(/[^0-9.]/g,''))"
            ></el-input>
          </el-form-item>
          <el-form-item label="赠送金额：" prop="notNull">
            <el-input
              v-model="form.give_money"
              oninput="value=Number(value.replace(/[^0-9.]/g,''))"
            ></el-input>
          </el-form-item>
          <el-form-item label="推荐：">
            <el-switch v-model="form.is_recommend"></el-switch>
          </el-form-item>
          <el-form-item label="排序：">
            <el-input
              v-model="form.sort"
              oninput="value=Number(value.replace(/[^0-9.]/g,''))"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow1 = false">取 消</el-button>
        <el-button type="primary" @click="reqAddTableData()" v-if="!form.id">
          添 加
        </el-button>
        <el-button type="primary" @click="reqUpdateTableData()" v-else>
          修 改
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getConfigData,
    updateConfigData,
    getRechargeList,
    updateRechargeList,
    addRechargeList,
    deleteRechargeList,
  } from '@/api/config'
  import _ from 'lodash'

  export default {
    name: 'index',
    data() {
      return {
        // 头部提示框的展开可和合并
        topOpen: false,
        rules: {
          notNull: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ]
        },
        // 对话框的显示与隐藏
        dialogShow: false,
        dialogShow1: false,
        menuShow: 1,
        // 对话框参数标题
        dialogTitle: '',
        // 对话框值
        dialogValue: '',
        // 对话框值的key
        dialogName: '',
        // 配置参数
        data: [
          {
            name: 'give_integral',
            title: '充值赠送积分',
            value: 0,
          },
          {
            name: 'give_growth',
            title: '充值赠送成长值',
            value: 0,
          },
          {
            name: 'min_money',
            title: '最小充值金额',
            value: 0,
          },
        ],
        // 表格数据
        tableData: [],
        form: {
          give_money: '',
          is_recommend: false,
          money: '',
          sort: '',
          tips: '',
        },
      }
    },
    mounted() {
      this.reqGetData()
      this.reqGetTableData()
    },
    methods: {
      async reqGetData() {
        let give_integral = getConfigData('recharge', 'give_integral') //充值赠送积分
        let give_growth = getConfigData('recharge', 'give_growth') //充值赠送成长值
        let min_money = getConfigData('recharge', 'min_money') //充值最小金额
        const res = await Promise.all([
          give_integral,
          give_growth,
          min_money,
        ])
        this.data.forEach((item, index) => {
          item.value = res[index].value
        })
      },
      // 修改配置参数
      reqUpdateData(name, value) {
        updateConfigData('recharge', name, value).then((response) => {
          this.dialogShow = false
          this.$message({
            type: 'success',
            message: '修改成功',
            duration: 1000,
          })
          this.data.forEach((item) => {
            if (item.name === name) {
              item.value = value
            }
          })
        })
      },
      // 获取表格数据：充值列表
      async reqGetTableData() {
        const res = await getRechargeList()
        this.tableData = res
      },
      // 添加表格项参数
      reqAddTableData() {
        this.$refs['ref-form'].validate((valid) => {
          if(valid){
            addRechargeList(this.form).then((response) => {
              this.$message({
                type: 'success',
                message: '添加成功',
                duration: 1000,
              })
              this.reqGetTableData()
              this.dialogShow1 = false
            })
          } else {
            return false;
          }
        })
      },
      // 修改表格项参数
      reqUpdateTableData() {
        this.$refs['ref-form'].validate((valid) => {
          if (valid) {
            updateRechargeList(this.form.id, this.form).then((response) => {
              this.$message({
                type: 'success',
                message: '修改成功',
                duration: 1000,
              })
              this.reqGetTableData()
              this.dialogShow1 = false
            })
          } else {
            return false;
          }
        })
      },
      // 删除表格充值规则
      reqDeleteTableData(id) {
        deleteRechargeList(id).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 1000,
          })
          this.reqGetTableData()
        })
      },
      // 点击添加充值规则 打开对话框
      onAddDialog() {
        this.form = {
          give_money: 0,
          is_recommend: false,
          money: 0,
          sort: 0,
          tips: '',
        }
        this.dialogShow1 = true
      },
      // 点击修改充值规则 打开对话框
      onUpdateDialog(obj) {
        this.form = _.cloneDeep(obj)
        this.form.is_recommend = Boolean(this.form.is_recommend)
        this.dialogShow1 = true
      },
      // 点击删除 打开确认删除对话框
      onDeleteDialog(id) {
        this.$confirm('是否要删除该规则', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.reqDeleteTableData(id)
        })
      },
      // 点击修改按钮打开对话框
      onButtonRevise(item) {
        const { title, name, value } = item
        this.dialogTitle = title
        this.dialogName = name
        this.dialogValue = value
        this.dialogShow = true
      },
      // 对话框修改按钮
      handleRevise(obj) {
        this.$confirm('是否要修改该参数', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.reqUpdateData(obj.name, obj.value)
        })
      },
    },
    filters: {
      money(value) {
        var num = parseFloat(value.toFixed(10))
        var s = num.toString()
        var rs = s.indexOf('.')

        // 没有小数点时：
        if (rs < 0) {
          rs = s.length
          s += '.'
        }
        while (s.length <= rs + 2) {
          s += '0'
        }
        return s
      },
    },
  }
</script>

<style lang="scss" scoped>
  #rechargeConfig {
    //padding: 20px;
    .top-box {
      border: #e6e6e6 1px dashed;
      margin-bottom: 30px;
      .text-title {
        padding-left: 20px;
        line-height: 36px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
      }
      .text-title:hover {
        color: #1e6abc;
      }
      .text-span {
        padding: 10px;
        border-top: #e6e6e6 1px solid;
        font-size: 14px;
        line-height: 22px;
        color: #666;
        p {
          padding: 0;
          margin: 0;
        }
      }
    }
    .body-box {
      .menu-title {
        overflow: hidden;
        padding: 2px 0 0 2px;
        background-color: #f2f2f2;
        margin-bottom: 30px;

        .menu-item {
          float: left;
          cursor: pointer;
          height: 40px;
          padding: 0 15px;
          text-align: center;
          line-height: 40px;
          color: #666;
          font-size: 14px;
        }
      }
      .show {
        font-weight: bold;
        background-color: #fff;
        color: #000;
      }
      .award-add {
        margin-bottom: 20px;
      }
    }
    .form-box {
      .form-item {
        display: flex;
        justify-content: space-between;
        width: 580px;
        margin: 20px auto;
        .from-label {
          width: 260px;
          text-align: right;
          line-height: 32px;
          font-size: 16px;
        }
      }
    }
    .dialog {
      display: flex;
      justify-content: center;
      .title {
        line-height: 32px;
      }
    }
  }
</style>
