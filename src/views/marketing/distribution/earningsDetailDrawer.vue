<template>
  <el-drawer
    :visible.sync="visible"
    direction="rtl"
  >
    <div style="padding: 0 15px; width: 100%">
      <div class="el-descriptions__title">收入明细：</div>
      <el-table :data="earningsDetailData" v-loading="loading" align="center" width="100">
        <el-table-column
          prop="distribution_id"
          width="50"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="type"
          width="80"
          label="收入类型">
        </el-table-column>
        <el-table-column
          prop="money"
          width="80"
          label="收入金额">
        </el-table-column>
        <el-table-column
          prop="order_sn"
          width="150"
          label="订单编号">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="记录时间">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at | date }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-drawer>
</template>

<script>
import {earningsDetail} from '@/api/user'

export default {
  name: 'earningsDetail',
  data() {
    return {
      tableLoading: false,
      visible: true,
      earningsDetailData: [
        {
          created_at: "2021-11-26T14:13:11.000Z",
          distribution_id: 12,
          money: 199,
          order_sn: "20211201621565",
          sn: "",
          type: "分销佣金",
        },
        {
          created_at: "2021-11-26T14:13:11.000Z",
          distribution_id: 12,
          money: 199,
          order_sn: "20211201621565",
          sn: "",
          type: "分销佣金",
        },
      ],
    }
  },
  filters: {
    date(value) {
      let date = new Date(value)
      return date.toLocaleString().replace(/:\d{1,2}$/, ' ')
    }
  },
  watch: {},
  methods: {
    async open(id) {
      this.tableLoading = true
      this.visible = true
      const res = await earningsDetail(id)
      this.earningsDetailData = res.list
      this.tableLoading = false
    }
  },
}
</script>

<style></style>
