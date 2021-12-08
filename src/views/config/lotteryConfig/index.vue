<template>
  <div id="lottery">
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
          <div class="menu-item" :class='{show: menuShow === 1}' @click="menuShow = 1">抽奖设置</div>
          <div class="menu-item" :class='{show: menuShow === 2}' @click="menuShow = 2">抽奖记录</div>
          <div class="menu-item" :class='{show: menuShow === 3}' @click="menuShow = 3">奖品列表</div>
        </div>
        <el-divider></el-divider>
        <div class="" v-show="menuShow === 1" style="width: 100%">
          <div class="add">
            <el-button size="small" type="primary" @click="onAddDialog">新增抽奖活动</el-button>
          </div>
          <div class="table-box">
            <el-table :data="LotteryActivityList">
            <el-table-column align="center" width="30">
            </el-table-column>
            <el-table-column type="expand" width="20">
              <template slot-scope="props">
                <div class="pl-4 flex overflow-x-auto">
                  <el-card class="ml-4"
                           v-for="(item, index) in props.row.prize"
                           :key="index" shadow="hover">
<!--                    <div class="" v-if="item.prize_type === 1">-->
<!--                      <span class="text-lg">{{ item.value }} 积分</span>-->
<!--                    </div>-->
<!--                    <div class="" v-if="item.prize_type === 2">-->
<!--                      <span class="text-lg">优惠卷</span>-->
<!--                    </div>-->
                    <div class="">
                       <span class="text-lg">{{item.name}}</span>
                    </div>
                  </el-card>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="序号" align="center" width="100">
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column label="活动名称" align="center" width="200">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="活动描述" align="center" width="300">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <h5>活动规则：</h5>
                  <p v-for="(item , index) in funStringRuleTOArrayRule(scope.row.rule)" :key="index">{{ item }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.message }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="活动状态" align="center" width="200">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"
                           @change="handleStatus(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="活动开始时间" align="center" width="250">
              <template slot-scope="scope">
                2021-10-12 12:00
              </template>
            </el-table-column>
            <el-table-column label="活动结束时间" align="center" width="250">
              <template slot-scope="scope">
                2021-12-12 12:00
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="onUpdateDialog(scope.row)">编辑</el-button>
                <el-button size="small" type="danger"  @click="onDeleteDialog(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <div class="page">
            <el-pagination background layout="prev, pager, next" :current-page="pageData1.page"
                           :total="pageData1.total" :page-size="10" @prev-click="getLotteryActivityList"
                           hide-on-single-page @next-click="getLotteryActivityList" @current-change="getLotteryActivityList">
            </el-pagination>
          </div>
        </div>
        <div class="" v-show="menuShow === 2" style="width: 100%">
          <div class="table-box">
            <el-table :data="LotteryRecordList">
              <el-table-column label="序号" align="center" width="100">
                <template slot-scope="scope">
                  {{ scope.row.id }}
                </template>
              </el-table-column>
              <el-table-column label="会员信息" align="center" width="300">
                <template slot-scope="scope">
                  <div class="info-box">
                    <div class="left">
                      <img :src="scope.row.user_id.avatar" alt="">
                    </div>
                    <div class="right">
                      <p>会员编号：{{scope.row.user_id.id}}</p>
                      <p>昵称：{{scope.row.user_id.username}}</p>
                      <p>手机号：{{scope.row.user_id.phone}}</p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="奖品信息" align="center" width="300">
                <template slot-scope="scope">
                  <div class="info-box">
                    <div class="right">
                      <p>奖品名称：{{scope.row.prize.name}}</p>
                      <p>奖品类型：{{scope.row.prize.prize_type | prizeType }}</p>
                      <p v-if="scope.row.prize.prize_type == 1">积分数量：{{scope.row.prize.value}}</p>
                      <p v-if="scope.row.prize.prize_type == 2">优惠卷名称：{{scope.row.prize.value}}</p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="活动信息" align="center" width="300">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <h5>活动描述：</h5>
                    <p>抽奖送积分</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">积分活动</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="抽奖时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.created_at  | created_at}}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination background layout="prev, pager, next" :current-page="pageData2.page"
                           :total="pageData2.total" :page-size="10" @prev-click="getLotteryRecordList"
                           hide-on-single-page @next-click="getLotteryRecordList" @current-change="getLotteryRecordList">
            </el-pagination>
          </div>
        </div>
        <div class="" v-show="menuShow === 2" style="width: 100%">
          <div class="table-box">
            <el-table :data="LotteryRecordList">
              <el-table-column label="序号" align="center" width="100">
                <template slot-scope="scope">
                  {{ scope.row.id }}
                </template>
              </el-table-column>
              <el-table-column label="会员信息" align="center" width="300">
                <template slot-scope="scope">
                  <div class="info-box">
                    <div class="left">
                      <img :src="scope.row.user_id.avatar" alt="">
                    </div>
                    <div class="right">
                      <p>会员编号：{{scope.row.user_id.id}}</p>
                      <p>昵称：{{scope.row.user_id.username}}</p>
                      <p>手机号：{{scope.row.user_id.phone}}</p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="奖品信息" align="center" width="300">
                <template slot-scope="scope">
                  <div class="info-box">
                    <div class="right">
                      <p>奖品名称：{{scope.row.prize.name}}</p>
                      <p>奖品类型：{{scope.row.prize.prize_type | prizeType }}</p>
                      <p v-if="scope.row.prize.prize_type == 1">积分数量：{{scope.row.prize.value}}</p>
                      <p v-if="scope.row.prize.prize_type == 2">优惠卷名称：{{scope.row.prize.value}}</p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="活动信息" align="center" width="300">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <h5>活动描述：</h5>
                    <p>抽奖送积分</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">积分活动</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="抽奖时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.created_at  | created_at}}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination background layout="prev, pager, next" :current-page="pageData2.page"
                           :total="pageData2.total" :page-size="10" @prev-click="getLotteryRecordList"
                           hide-on-single-page @next-click="getLotteryRecordList" @current-change="getLotteryRecordList">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-card>
    <lottery-dialog :isEdge="isEdge" ref="dialog"></lottery-dialog>
  </div>
</template>

<script>
import LotteryDialog from "./components/LotteryDialog";
import {getLotteryRecordList, getLotteryActivityList, updateLotteryActivityStatus, deleteLotteryActivityList} from "@/api/config/lottery";
import _ from 'lodash'

export default {
  name: "lottery",
  components: {LotteryDialog},
  data () {
    return {
      topOpen:true,
      menuShow: 1,
      // 活动列表
      LotteryActivityList: [],
      // 活动列表分页
      pageData1:{
        page: 1,
        total: 0,
      },
      // 活动记录数据
      LotteryRecordList: [],
      // 活动记录分页
      pageData2:{
        page: 1,
        total: 0,
      },
      //对话框状态 false为修改 ture为增加
      isEdge: false,
    }
  },
  filters: {
    created_at (value) {
      let date = new Date(value)
      return date.toLocaleString()
    },
    prizeType (value) {
      if (value === 1){
        return '积分奖励'
      } else if (value === 2){
        return  '奖励优惠卷'
      } else if (value === 3){
        return '谢谢惠顾'
      }
    }
  },
  mounted() {
    this.getLotteryActivityList(1)
    this.getLotteryRecordList(1)
  },
  methods: {
    // 获取抽奖活动列表数据
    async getLotteryActivityList(page) {
      const res = await getLotteryActivityList(page)
      this.LotteryActivityList = res.list
      this.pageData1.total = res.pagination.total
    },
    // 获取抽奖记录数据
    async getLotteryRecordList (page) {
      const res = await getLotteryRecordList(page)
      this.LotteryRecordList = res.list
      this.pageData2.total = res.pagination.total
    },
    // 删除活动按钮  模态框校验
    onDeleteDialog(id){
      this.$confirm("是否要删除该活动", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteLotteryActivityList(id).then(()=>{
          this.$message({
            type: "success",
            message: "删除成功",
            duration: 1000,
          });
          this.getLotteryActivityList(1)
        })
      });
    },
    // 打开添加对话框
    onAddDialog(){
      this.isEdge = true
      this.$refs.dialog.activityData = {
        name: '',
        status: 0,  //活动状态 1表示进行中 0表示关闭
        message: '', //活动描述
        rule: '',
        prize: []
      }
      this.$refs.dialog.dialogShow = true
    },
    // 打开修改对话框
    onUpdateDialog(activityData){
      this.isEdge = false
      this.$refs.dialog.activityData = _.cloneDeep(activityData)
      this.$refs.dialog.dialogShow = true
    },
    // 修改活动状态
    handleStatus(activity){
      let {id, status} = activity
      updateLotteryActivityStatus(id,status)
        .then( () => {
          this.$message({
          type: "success",
          message: "修改成功",
          duration: 1000,
        });
      }).catch(() => {
        activity.status = (status+1)%2
        this.$message({
          type: "error",
          message: "修改失败",
          duration: 1000,
        });
      })
    },
    // 活动规则字符串根据'\n'分割成数组
    funStringRuleTOArrayRule(rule){
      return _.split(rule, '\n')
    },
  }
}
</script>

<style lang="scss" scoped>
#lottery{
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

  .body-box {
    .menu-title {
      overflow: hidden;
      padding: 2px 0 0 2px;
      background-color: #f2f2f2;

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
    .add{
      margin-bottom: 10px;
    }
    .table-box{
      border: 1px solid #ebeef5;
      .demo-table-expand {
        font-size: 0;
      }
      .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
      }
      .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
  }
  .info-box{
    display: flex;
    justify-content: center;
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
        padding: 0 0 0 15px;
      }
    }
  }
  .page{
    margin-top: 10px;
  }
}
</style>
