<template>
  <el-drawer :visible.sync="visible" direction="rtl">
    <div style="padding: 0 40px; width: 100%">
      <div class="el-descriptions__title">粉丝列表：</div>
      <el-table :data="fansDetailData" v-loading="loading" width="100">
        <el-table-column label="粉丝信息">
          <template slot-scope="scope">
            <div class="flex text-xs items-start">
              <el-image :src="scope.row.avatar" lazy></el-image>
              <div class="pl-2 text-left">
                <p>会员id:{{ scope.row.user_id }}</p>
                <p>会员昵称:{{ scope.row.username }}</p>
                <p>会员等级:{{ scope.row.level }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="营销信息">
          <template slot-scope="scope">
            <div class="text-xs items-start">
              <div class="pl-2 text-left">
                <p>分销数量:{{ scope.row.distribution_order_num }}</p>
                <p>分销金额:{{ scope.row.distribution_money }}</p>
                <p>订单金额:{{ scope.row.order_amount }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-drawer>
</template>

<script>
  import { fans } from '@/api/user'

  export default {
    name: 'fansDetail',
    data() {
      return {
        tableLoading: false,
        visible: false,
        fansDetailData: [
          {
            avatar: '',
            created_at: null,
            distribution_money: 0,
            distribution_order_num: 0,
            leader: {
              id: 21,
              level: '',
              phone: '',
              sn: '',
              username: '',
            },
            order_amount: 0,
            phone: '',
            sn: '',
            username: '',
          },
        ],
      }
    },
    watch: {},
    methods: {
      async open(id) {
        this.tableLoading = true
        this.visible = true
        const res = await fans(id)
        this.fansDetailData = res.list
        this.tableLoading = false
      },
    },
  }
</script>

<style></style>
