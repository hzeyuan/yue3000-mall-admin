<template>
  <div>
    <strapi-table
      model="users"
      :router="router"
      showSearch
      :columns="columns"
      :rowBars="[]"
      :diyBars="diyBars"
    >
      <template slot="userInfo" slot-scope="{ row }">
        <div class="flex text-xs items-start">
          <el-image :src="row.avatar" lazy></el-image>
          <div class="pl-2 text-left">
            <p>会员id:{{ row.id }}</p>
            <p>会员昵称:{{ row.username }}</p>
            <p>会员等级:{{ row.level }}</p>
          </div>
        </div>
      </template>
    </strapi-table>
    <el-drawer title="佣金详情" :visible.sync="drawer" direction="rtl">
      <div class="ml-10">
        <div class="flex items-start pb-1">
          <span class="w-20">会员id:</span>
          <div>
            <span>{{ withdrawDetails.id }}</span>
          </div>
        </div>
        <div class="flex items-start pb-1">
          <span class="w-20">会员昵称</span>
          <div>
            <span>{{ withdrawDetails.username }}</span>
          </div>
        </div>
        <div class="flex items-start pb-1">
          <span class="w-20">手机号码</span>
          <div>
            <span>{{ withdrawDetails.phone }}</span>
          </div>
        </div>
        <div class="flex items-start pb-1">
          <span class="w-20">提现金额</span>
          <div>
            <span>￥{{ withdrawDetails.money }}</span>
          </div>
        </div>
        <div class="flex items-start pb-1">
          <span class="w-20">手续费</span>
          <div>
            <span>￥{{ withdrawDetails.money }}</span>
          </div>
        </div>
        <div class="flex items-start pb-1">
          <span class="w-20">到账金额</span>
          <div>
            <span>￥{{ withdrawDetails.left_money }}</span>
          </div>
        </div>
        <div class="flex items-start pb-1">
          <span class="w-20">提现方式:</span>
          <div>
            <span>{{ withdrawDetails.type | typeFormat }}</span>
          </div>
        </div>
        <div class="flex items-start pb-1">
          <span class="w-20">申请时间:</span>
          <div>
            <span>{{ withdrawDetails.created_at }}</span>
          </div>
        </div>
        <div class="flex items-start pb-1">
          <span class="w-20">申请备注:</span>
          <div>
            <span>{{ withdrawDetails.remark }}</span>
          </div>
        </div>
        <div class="flex items-start pb-1">
          <span class="w-20">提现状态:</span>
          <div>
            <span>{{ withdrawDetails.status | statusFormat }}</span>
          </div>
        </div>
        <div class="flex items-start pb-1">
          <span class="w-20">转账凭证:</span>
          <div>
            <span>{{ withdrawDetails.transfer_voucher || '无' }}</span>
          </div>
        </div>
        <div class="flex items-start pb-1">
          <span class="w-20">转账备注:</span>
          <div>
            <span>{{ withdrawDetails.transfer_description || '无' }}</span>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import { formatDate } from '@/utils/date'
  import strapiTable from '@/components/strapi-table' //上传文件组件
  const columns = [
    {
      key: 'id',
      label: 'id',
      type: Number,
      hidden: true,
    },
    {
      key: 'sn',
      label: '提现单号',
      editable: false,
      width: '180px',
      type: String,
    },
    {
      key: 'userInfo',
      width: '180px',
      label: '会员信息',
      editable: false,
      type: String,
    },
    {
      key: 'phone',
      label: '手机号码',
      editable: false,
      type: String,
    },
    {
      key: 'money',
      label: '提现金额',
      editable: false,
      type: String,
    },
    {
      key: 'type',
      label: '提现方式',
      editable: false,
      filter: (field) => {
        if (field == 1) {
          return '提现到钱包余额'
        } else if (field == 2) {
          return '提现到微信零钱'
        } else if (field == 3) {
          return '提现到微信收款码'
        }
      },
      type: String,
    },
    {
      key: 'status',
      label: '提现状态',
      filter: (field) => {
        if (field == 1) {
          return '待提现'
        } else if (field == 2) {
          return '提现中'
        } else if (field == 3) {
          return '-提现成功'
        } else if (field == 4) {
          return '提现失败'
        }
      },
      editableComponent: 'el-input',
      editable: false,
      type: String,
    },
    {
      key: 'remark',
      label: '提现备注',
      editableComponent: 'el-input',
      editable: false,
      type: String,
    },
    {
      key: 'created_at',
      label: '提现时间',
      width: '180px',
      filter: (field) => {
        return formatDate(new Date(field), 'yyyy-MM-dd hh:mm:ss')
      },
      editableComponent: 'el-input',
      editable: false,
      type: String,
    },
  ]
  const router = {
    find: {
      url: '/mall-admin/withdraw/lists',
      method: 'get',
    },
  }
  export default {
    components: { strapiTable },
    data() {
      return {
        model: 'withdraw',
        drawer: false,
        router: router,
        diyBars: [
          {
            name: '详情',
            callback: (row, index) => {
              this.withdrawDetail(row, index)
            },
          },
          {
            name: '审核',
            callback: (row, index) => {
              this.withdrawReview(row, index)
            },
          },
        ],
        withdrawDetails: {},
      }
    },
    computed: {
      columns() {
        return columns
      },
    },
    filters: {
      typeFormat(field) {
        if (field == 1) {
          return '提现到钱包余额'
        } else if (field == 2) {
          return '提现到微信零钱'
        } else if (field == 3) {
          return '提现到微信收款码'
        }
      },
      statusFormat(field) {
        if (field == 1) {
          return '待提现'
        } else if (field == 2) {
          return '提现中'
        } else if (field == 3) {
          return '-提现成功'
        } else if (field == 4) {
          return '提现失败'
        }
      },
    },
    methods: {
      // 佣金提现详情
      withdrawDetail(row, index) {
        ;(this.drawer = true), (this.withdrawDetails = row)
      },
      // 提现审核
      withdrawReview(row, index) {},
    },
  }
</script>

<style></style>
