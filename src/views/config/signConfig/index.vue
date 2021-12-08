<!--签到配置-->
<template>
  <div id="signConfig">
    <el-card>
      <div class="top-box">
        <div class="text-title" @click="topOpen=!topOpen">
          <i class="el-icon-arrow-right" v-show="topOpen"></i>
          <i class="el-icon-arrow-down" v-show="!topOpen"></i>
          <span>操作提示</span>
        </div>
        <div class="text-span" v-show="!topOpen">
          <p>*用户每天签到一次可获得每天签到奖励，包括积分和成长值。</p>

          <p>*点击新增连续签到奖励可以设置满足连续签到天数时的额外奖励，连续天数规则不能重复。</p>

          <p>*用户签到中断会重新计算连续天数；超过设置的最大连续签到奖励天数后，也会重新计算连续天数，循环发放连续奖励。</p>
        </div>
      </div>
      <div class="body-box">
        <div class="menu-title">
          <div class="menu-item" :class='{show: menuShow === 1}' @click="menuShow = 1">签到设置</div>
          <div class="menu-item" :class='{show: menuShow === 2}' @click="menuShow = 2">签到记录</div>
        </div>
        <el-divider></el-divider>
        <div class="sign-site" v-show="menuShow === 1">
          <div class="award-config">
            <div class="text">
              每天签到奖励：
            </div>
            <el-form ref="signRule" :model="signRule.dailySign" label-width="150px">
              <el-form-item label="签到送积分：">
                <el-input v-model.number="signRule.dailySign.integral"
                          oninput="value=Number(value.replace(/[^0-9.]/g,''))">
                </el-input>
              </el-form-item>
              <el-form-item label="签到送成长值：">
                <el-input v-model.number="signRule.dailySign.growth"
                          oninput="value=Number(value.replace(/[^0-9.]/g,''))">
                </el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="award-config">
            <div class="text">
              连续签到奖励：
            </div>
            <p class="span">连续签到奖励断签后会重新计算连续签到天数，达到连续天数后即可获得连续奖励</p>
          </div>
          <div class="award-add">
            <el-button size="small" type="primary" @click="onAddDialog">新增连续签到奖励</el-button>
          </div>
          <div class="award-table">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="连续天数" align="center" width="300">
                <template slot-scope="scope">
                  {{ scope.row.days }} 天
                </template>
              </el-table-column>
              <el-table-column label="连续奖励" align="center">
                <template slot-scope="scope">
                  {{ scope.row.integral | integral }}{{ scope.row.growth | growth}}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="300">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" @click="onUpdateDialog(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger"  @click="onDeleteDialog(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="award-config" style="margin-top: 10px">
            <div class="text">
              签到规则说明：
            </div>
            <el-input style="width: 500px; margin-left: 30px"
                      v-model="signRule.instructions"
                      type="textarea"
                      :autoSize="true"
            ></el-input>
            <div style="margin-left: 20px">
              <el-button size="small" @click="onDefaultButton">使用默认说明</el-button>
            </div>
          </div>
          <div class="award-button">
            <el-button size="small" type="primary" @click="onButton">确认修改</el-button>
          </div>
        </div>
        <div class="sign-record" v-show="menuShow === 2">
          <div class="filter">
            <div class="filter-title">
              会员信息筛选
            </div>
            <div class="filter-type">
              <el-select v-model="filterTypeValue" placeholder="请选择">
                <el-option
                  v-for="item in filterType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="filter-Keyword">
              <el-input v-model="filterValue" placeholder="请输入关键字"></el-input>
            </div>
            <div class="filter-button">
              <el-button type="primary" @click="onSearchButton">查  询</el-button>
              <el-button @click="onResetButton">重  置</el-button>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="table">
            <el-table :data="recordData" border style="width: 100%">
              <el-table-column label="序号" align="center" width="50" type="index">
              </el-table-column>
              <el-table-column label="会员信息" align="center" width="300">
                <template slot-scope="scope">
                  <div class="info-box">
                    <div class="left">
                      <img :src="scope.row.avatar" alt="">
                    </div>
                    <div class="right">
                      <p>会员编号：{{scope.row.user_id}}</p>
                      <p>昵称：{{scope.row.username}}</p>
                      <p>手机号：{{scope.row.phone}}</p>
                      <p>注册时间：{{scope.row.created_at | created_at}}</p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="连续天数" align="center" width="100">
                <template slot-scope="scope">
                  {{ scope.row.days }} 天
                </template>
              </el-table-column>
              <el-table-column label="签到奖励" align="center" width="250">
                <template slot-scope="scope">
                  {{ scope.row.integral | integral }} {{ scope.row.growth | growth}}
                </template>
              </el-table-column>
              <el-table-column label="连续奖励" align="center" width="250">
                <template slot-scope="scope">
                  {{ scope.row.continuous_integral | integral }} {{ scope.row.continuous_growth | growth}}
                </template>
              </el-table-column>
              <el-table-column label="签到时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.sign_time | sign_time}}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination background layout="prev, pager, next" :current-page="pageData.page"
                           :total="pageData.total" :page-size="10" @prev-click="handlePageTo"
                           hide-on-single-page @next-click="handlePageTo" @current-change="handlePageTo">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-card>

    <!--    添加修改对话框-->
    <el-dialog title="连续签到规则" :visible.sync="dialogShow" width="40%">
      <div style="width: 450px;margin: 0 auto">
        <el-form ref="ref-form" :model="form" label-width="150px">
          <el-form-item label="连续签到数据：">
            <el-input v-model="form.days"
                      oninput="value=Number(value.replace(/[^0-9.]/g,''))"></el-input>
          </el-form-item>
          <el-form-item label="额外赠送积分：">
            <el-input v-model="form.integral"
                      oninput="value=Number(value.replace(/[^0-9.]/g,''))"></el-input>
          </el-form-item>
          <el-form-item label="额外赠送成长值：">
            <el-input v-model="form.growth"
                      oninput="value=Number(value.replace(/[^0-9.]/g,''))"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="onAddDate()" v-if="isEdge">添 加</el-button>
        <el-button type="primary" @click="onUpdateDate()" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSignData,
  addSignsData,
  updateSignsData,
  deleteSignsData,
  getSignsData,
  updateSignData,
  getSignRecordData
} from "@/api/config";
import _ from "lodash";

export default {
  name: "signConfig",
  data () {
    return {
      // 表单属性
      signRule: {},
      // 连续签到规格数据
      tableData: [],
      // 签到记录数据
      recordData: [],
      // 头部展开状态
      topOpen: false,
      menuShow: 1,
      // 对话框显示状态
      dialogShow: false,
      // 添加 修改修改数据表单
      form:{
        days: 0,
        growth: 0,
        integral: 0,
      },
      // 对话框为修改还是增加 false为修改
      isEdge: false,
      // 筛选类别
      filterType: [
        {
          value: 'user_id',
          label: '会员编号'
        },
        {
          value: 'username',
          label: '会员昵称'
        },
        {
          value: 'phone',
          label: '手机号码'
        }
      ],
      // 筛选类别结果
      filterTypeValue: '',
      // 筛选值
      filterValue: '',
      // 数据分页
      pageData: {
        page: 1,
        total: 0,
      }
    }
  },
  filters: {
    integral(value){
      if (value > 0){
        return `赠送${value}积分；`
      } else {
        return ''
      }
    },
    growth(value){
      if (value > 0){
        return `赠送${value}成长值；`
      } else {
        return ''
      }
    },
    sign_time (value) {
      let date = new Date(value)
      return date.toLocaleString()
    },
    created_at (value) {
      let date = new Date(value)
      return date.toLocaleDateString()
    }
  },
  methods: {
    // 获取签到规则和连续签到规则
    async reqGetData() {
      let signRule = getSignData()
      let tableData = getSignsData()
      const res = await Promise.all([signRule, tableData])
      this.signRule = res[0]
      this.tableData = res[1].list
    },
    // 获取用户签到记录
    async reqGetRecordData(){
      const res = await getSignRecordData(this.filterTypeValue, this.filterValue, this.pageData.page)
      this.pageData.total = res.count
      this.recordData = res.list
    },
    // 修改签到规则请求
    updateSignData() {
      updateSignData(this.signRule).then((response) => {
        this.$message({
          type: "success",
          message: "修改成功",
          duration: 1000,
        });
      })
      this.reqGetData()
    },
    // 修改连续签到规则请求
    reqUpdateTableData() {
      updateSignsData(this.form.id, this.form).then((response) => {
        this.$message({
          type: "success",
          message: "修改成功",
          duration: 1000,
        });
      })
      this.reqGetData()
    },
    // 添加连续签到规则请求
    reqAddTableData() {
      addSignsData(this.form).then((response) => {
        this.$message({
          type: "success",
          message: "添加成功",
          duration: 1000,
        });
      })
      this.reqGetData()
    },
    // 删除连续签到规则请求
    reqDeleteSignsData(id){
      deleteSignsData(id).then((response) => {
        this.$message({
          type: "success",
          message: "删除成功",
          duration: 1000,
        });
      })
      this.reqGetData()
    },
    // 点击添加连续签到规则 打开对话框
    onAddDialog() {
      this.form = {
        days: 0,
        growth: 0,
        integral: 0,
      }
      this.isEdge = true
      this.dialogShow = true
    },
    // 点击修改连续签到规则 打开对话框
    onUpdateDialog(obj) {
      this.form = _.cloneDeep(obj)
      this.isEdge = false
      this.dialogShow = true
    },
    // 点击删除按钮 打开确认删除对话框
    onDeleteDialog(id){
      this.$confirm("是否要删除该规则", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.reqDeleteSignsData(id)
      });
    },
    // 点击添加
    onAddDate() {
      this.dialogShow = false
      this.reqAddTableData()
    },
    // 点击修改
    onUpdateDate() {
      this.dialogShow = false
      this.reqUpdateTableData()
    },
    // 点击确认修改
    onButton(){
      this.$confirm("是否要修改该参数", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.updateSignData()
      });
    },
    // 点击默认规则按钮
    onDefaultButton(){
      this.signRule.instructions = '1.每天签到可以获得每天签到奖励；\n' +
        '2.每日最多可签到1次，断签则会重新计算连签天数，达到连续天数后即可获得连续奖励；\n' +
        '3.活动以及奖励最终解释权归商家所有。'
    },
    // 点击查询按钮
    onSearchButton() {
      this.pageData.page = 1
      this.reqGetRecordData()
    },
    // 点击重置按钮
    onResetButton(){
      this.pageData.page = 1
      this.filterValue = ''
      this.filterTypeValue = ''
      this.reqGetRecordData()
    },
    // 页面跳转
    handlePageTo(value){
      this.pageData.page = value
      this.reqGetRecordData()
    },
  },
  mounted() {
    this.reqGetData()
    this.reqGetRecordData()
  }
}
</script>

<style lang="scss" scoped>
#signConfig{
  //padding: 20px;
  .top-box{
    border: #e6e6e6 1px dashed;
    margin-bottom: 30px;
    .text-title{
      padding-left: 20px;
      line-height: 36px;
      font-size: 16px;
      cursor: pointer;
    }
    .text-title:hover{
      color: #1e6abc;
    }
    .text-span{
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
  .body-box{
    .menu-title{
      overflow: hidden;
      padding: 2px 0 0 2px;
      background-color: #f2f2f2;

      .menu-item{
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
    .show{
      font-weight: bold;
      background-color: #fff;
      color: #000;
    }
    .award-config{
      display: flex;
      .text{
        margin-left: 20px;
        padding: 10px;
        line-height: 20px;
        font-size: 14px;
      }
      .span{
        margin: 0;
        padding: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #999;
      }
    }
    .award-add{
      margin-bottom: 10px;
    }
    .award-button{
      padding: 20px;
      text-align: center;
    }
    .filter{
      display: flex;
      .filter-title{
        margin: 0 10px;
        line-height: 40px;
      }
      .filter-type{
        margin: 0 10px;
      }
      .filter-Keyword{
        margin: 0 10px;
      }
      .filter-button{
        margin: 0 10px;
      }
    }
    .info-box{
      display: flex;
      height: 100px;
      .left{
        width: 60px;
        margin: auto 0;
        img{
          width: 60px;
        }
      }
      .right{
        margin: auto 0;
        text-align: left;
        p{
          line-height: 15px;
          font-size: 10px;
          margin: 0;
          padding: 0 0;
        }
      }
    }
    .page{
      margin-top: 10px;
    }
  }
}
</style>
