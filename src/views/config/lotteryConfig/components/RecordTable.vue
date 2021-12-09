<template>
  <div id="RecordTable">
    <div class="table-box">
      <el-table :data="LotteryRecordList" v-loading="tableLoading">
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
</template>

<script>
import {getLotteryRecordList} from "@/api/config/lottery";

export default {
  name: "RecordTable",
  data () {
    return {
      LotteryRecordList: [],
      // 活动记录分页
      pageData2:{
        page: 1,
        total: 0,
      },
      // 表格加载遮罩层
      tableLoading: false
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
    console.log('123')
    this.getLotteryRecordList(1)
  },
  methods: {
    // 获取抽奖记录列表
    async getLotteryRecordList (page) {
      this.tableLoading = true
      const res = await getLotteryRecordList(page)
      this.LotteryRecordList = res.list
      this.pageData2.total = res.pagination.total
      this.tableLoading = false
    },
  }
}
</script>

<style lang="scss" scoped>
#RecordTable{
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
