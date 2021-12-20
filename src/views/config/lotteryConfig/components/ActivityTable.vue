<template>
  <!--  抽奖活动相关-->
  <div id="ActivityTable">
    <div class="add">
      <el-button size="small" type="primary" @click="onAddDialog">新增抽奖活动</el-button>
    </div>
    <div class="table-container">
      <el-table :data="LotteryActivityList" v-loading="tableLoading">
        <el-table-column align="center" width="30">
        </el-table-column>
        <el-table-column type="expand" width="20">
          <template slot-scope="props">
            <div class="pl-4 flex overflow-x-auto">
              <el-tag size="medium" v-for="(item, index) in props.row.prize"
                      :key="index">{{ item.name }}
              </el-tag>
            </div>
            <div class="text-center" v-if="props.row.prize.length === 0">
              <span>奖品暂无</span>
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
            <el-popover trigger="hover" placement="top" v-show="scope.row.rule">
              <h5>活动规则：</h5>
              <p v-for="(item , index) in funStringRuleTOArrayRule(scope.row.rule)" :key="index">{{ item }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.message ? scope.row.message : '暂无描述' }}
              </div>
            </el-popover>
            <div slot="reference" class="name-wrapper" v-show="!scope.row.rule">
              {{ scope.row.message ? scope.row.message : '暂无描述' }}
            </div>
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
            <el-button size="small" type="danger" @click="onDeleteDialog(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :current-page="pageData.page"
                     :total="pageData.total" :page-size="10" @prev-click="getLotteryActivityList"
                     hide-on-single-page @next-click="getLotteryActivityList" @current-change="getLotteryActivityList">
      </el-pagination>
    </div>
    <lottery-dialog :isEdge="isEdge" ref="dialog"></lottery-dialog>
  </div>
</template>

<script>
import LotteryDialog from "./LotteryDialog";
import {deleteLotteryActivityList, getLotteryActivityList, updateLotteryActivityStatus} from "@/api/config/lottery";
import _ from "lodash";

export default {
  name: "ActivityTable",
  components: {
    LotteryDialog
  },
  data() {
    return {
      LotteryActivityList: [],
      // 活动列表分页
      pageData1: {
        page: 1,
        total: 0,
      },
      //对话框状态 false为修改 ture为增加
      isEdge: false,
      // 分页数据
      pageData: {page: 1, total: 0,},
      // 表格遮罩层
      tableLoading: true,
    }
  },
  filters: {
    prizeType(value) {
      if (value === 1) {
        return '积分奖励'
      } else if (value === 2) {
        return '奖励优惠卷'
      } else if (value === 3) {
        return '谢谢惠顾'
      }
    }
  },
  mounted() {
    this.getLotteryActivityList(1)
  },
  methods: {
    // 请求活动列表
    async getLotteryActivityList(page) {
      this.tableLoading = true
      const res = await getLotteryActivityList(page)
      this.LotteryActivityList = res.list
      this.pageData1.total = res.pagination.total
      this.tableLoading = false
    },
    // 删除活动按钮  模态框校验
    onDeleteDialog(id) {
      this.$confirm("是否要删除该活动", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteLotteryActivityList(id).then(() => {
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
    onAddDialog() {
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
    onUpdateDialog(activityData) {
      this.isEdge = false
      this.$refs.dialog.activityData = _.cloneDeep(activityData)
      this.$refs.dialog.dialogShow = true
    },
    // 修改活动状态
    handleStatus(activity) {
      let {id, status} = activity
      updateLotteryActivityStatus(id, status)
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功",
            duration: 1000,
          });
        }).catch(() => {
        activity.status = (status + 1) % 2
        this.$message({
          type: "error",
          message: "修改失败",
          duration: 1000,
        });
      })
    },
    // 活动规则字符串根据'\n'分割成数组
    funStringRuleTOArrayRule(rule) {
      return _.split(rule, '\n')
    },
  }
}
</script>

<style lang="scss" scoped>
#ActivityTable {
  .add {
    margin-bottom: 10px;
  }

  .table-container {
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
</style>
