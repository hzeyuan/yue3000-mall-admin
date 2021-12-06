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
                <div class="flex">
                  <el-card class="w-1/5 m-1"
                           v-for="(item, index) in props.row.prize"
                           :key="index" shadow="hover">
                    <img class="object-top w-12 h-12 float-left" :src="item.image">
                    <div class="w-12 h-12">item.name</div>
                  </el-card>
                </div>
<!--                <el-form label-position="left" inline class="demo-table-expand">-->
<!--                  <el-form-item label="奖品名称：" class="">-->
<!--                    <span>{{ props.row.prize[0].name }}</span>-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="奖品类型：">-->
<!--                    <span>{{ props.row.prize[1].name }}</span>-->
<!--                  </el-form-item>-->
<!--                </el-form>-->
              </template>
            </el-table-column>
            <el-table-column label="序号" align="center" width="100">
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column label="活动名称" align="center" width="150">
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
                <el-switch v-model="scope.row.status"></el-switch>
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
        </div>
        <div class="" v-show="menuShow === 2">
          记录
        </div>
      </div>
    </el-card>
    <lottery-dialog :isEdge="isEdge" ref="dialog"></lottery-dialog>
  </div>
</template>

<script>
import LotteryDialog from "./components/LotteryDialog";
import {getLotteryRecordList, getLotteryActivityList} from "@/api/config/lottery";
import _ from 'lodash'

export default {
  name: "lottery",
  components: {LotteryDialog},
  data () {
    return {
      topOpen:true,
      menuShow: 1,
      LotteryActivityList: [],
      isEdge: false, //对话框状态 false为修改
    }
  },
  mounted() {
    this.getLotteryActivityList()
  },
  methods: {
    getLotteryActivityList() {
      const res = getLotteryActivityList()
      this.LotteryActivityList = res
    },
    // 活动规则分割成数组
    funStringRuleTOArrayRule(rule){
      return _.split(rule, '\n')
    },

    onDeleteDialog(){
      this.$confirm("是否要删除该活动", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 删除
        // this.reqDeleteSignsData(id)
      });
    },

    // 打开添加对话框
    onAddDialog(){
      this.isEdge = true
      this.$refs.dialog.dialogShow = true
    },
    // 打开修改对话框
    onUpdateDialog(){
      this.isEdge = false
      this.$refs.dialog.dialogShow = true
    }
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
}
</style>
