<template>
  <div>
    <strapi-table
      ref="strapiTable"
      model="users"
      :router="router"
      showSearch
      :columns="columns"
      :rowBars="{}"
      :actionBars="[]"
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
      <template slot="opeator" slot-scope="{ row, $index }">
        <div>
          <el-link
            type="info"
            @click="withdrawDetail(row, $index)"
            :underline="false"
            key="detail"
          >
            详情
          </el-link>

          <el-link
            type="primary"
            v-show="row.status === 1 || row.status === 2"
            @click="withdrawReview(row, $index)"
            :underline="false"
            key="review"
          >
            <el-divider direction="vertical"></el-divider>
            审核
          </el-link>
          <el-link
            type="danger"
            v-show="row.status === 2"
            @click="withdrawTransfer(row, $index)"
            :underline="false"
            key="transfer"
          >
            <el-divider direction="vertical"></el-divider>
            转账
          </el-link>
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
    <el-dialog
      destroy-on-close
      label-width="80px"
      title="提现审核"
      :visible.sync="checkDialogVisible"
      width="30%"
    >
      <el-form :model="form">
        <el-form-item label="提现审核">
          <el-radio-group v-model="form.pass">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="0">审核拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-alert
          title="审核拒绝后，提现金额会全部退回佣金账户"
          type="info"
        ></el-alert>
        <el-form-item label="审核备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="examineFormSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      destroy-on-close
      label-width="80px"
      title="审核通过,转账中"
      :visible.sync="transferDialogVisible"
      width="50%"
    >
      <div class="flex">
        <el-result style="padding: 0" title="收款二维码">
          <template slot="icon">
            <el-image
              fit="contain"
              :preview-src-list="[form.money_qr_code]"
              style="width: 400px; height: 400px"
              lazy
              :src="form.money_qr_code"
            ></el-image>
          </template>
          <template slot="extra">
            <div class="flex justify-center items-center pb-1">
              提现金额:
              <p class="text-red-500 text-xl">￥100</p>
            </div>
          </template>
        </el-result>
        <el-form
          style="width: 400px"
          :model="form"
          label-width="80px"
          size="mini"
        >
          <el-form-item label="是否转账">
            <el-switch v-model="form.status"></el-switch>
          </el-form-item>
          <el-form-item v-show="form.status" label="支付单号">
            <el-input v-model="form.payment_no"></el-input>
          </el-form-item>
          <el-alert
            v-show="form.status"
            title="审核拒绝后，提现金额会全部退回佣金账户"
            type="info"
          ></el-alert>
          <el-form-item v-show="form.status" class="pt-2" label="转账凭证">
            <ele-upload-image
              name="files"
              action="http://localhost:1337/upload"
              :responseFn="
                (response, file, fileList) => {
                  return response[0].url
                }
              "
              multiple
              v-model="form.transfer_voucher"
            ></ele-upload-image>
          </el-form-item>
          <el-form-item label="转账备注">
            <el-input
              type="textarea"
              v-model="form.transfer_description"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="transferDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="transferFormSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { formatDate } from '@/utils/date'
  import {
    refuse,
    confirm,
    transferFail,
    transferSuccess,
  } from '@/api/withdraw'
  import strapiTable from '@/components/strapi-table'
  import EleUploadImage from 'vue-ele-upload-image'

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
      search: true,
      searchCompoent: {
        name: 'el-input',
        attr: {
          placeholder: '请输入查询单号',
        },
      },
      width: '180px',
      type: String,
    },
    {
      key: 'userInfo',
      width: '180px',
      label: '会员信息',
      type: String,
    },
    {
      key: 'phone',
      label: '手机号码',
      search: true,
      qs: 'user_id.phone_contains',
      searchCompoent: {
        name: 'el-input',

        attr: {
          placeholder: '请输入手机号码',
        },
      },
      type: String,
    },
    {
      key: 'money',
      label: '提现金额',
      displayFormatter: (value) => {
        return `￥${value}`
      },

      type: String,
    },
    {
      key: 'type',
      label: '提现方式',
      displayFormatter: (value) => {
        switch (value) {
          case 1:
            return '提现到余额'
          case 2:
            return '提现到微信'
          case 3:
            return '提现到微信收款码'
          case 4:
            return '提现到支付宝收款码'
        }
      },
      type: String,
    },
    {
      key: 'status',
      label: '提现状态',
      displayFormatter: (field) => {
        if (field == 1) {
          return '待提现'
        } else if (field == 2) {
          return '提现中'
        } else if (field == 3) {
          return '提现成功'
        } else if (field == 4) {
          return '审核失败'
        }
      },
      editableComponent: 'el-input',

      type: String,
    },
    {
      key: 'remark',
      label: '提现备注',
      editableComponent: 'el-input',
      editable: true,
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

      type: String,
    },
    {
      key: 'opeator',
      label: '操作',
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
    components: { strapiTable, EleUploadImage },
    data() {
      return {
        checkDialogVisible: false, // 审核对话框
        transferDialogVisible: false, // 提现对话框
        form: {
          sn: '',
          pass: '',
          remark: '',
          status: true,
        },
        model: 'withdraw',
        drawer: false,
        router: router,
        diyBars: [],
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
        this.drawer = true
        this.withdrawDetails = row
      },
      // 提现审核
      withdrawReview(row, index) {
        this.checkDialogVisible = true
        this.form.sn = row.sn
      },
      async withdrawTransfer(row, index) {
        this.transferDialogVisible = true
        this.form.sn = row.sn
        this.form.money_qr_code = row.money_qr_code
      },
      async examineFormSubmit() {
        const { sn, remark, pass } = this.form
        console.log('tgus,firn', this.form)
        if (pass === 1) {
          await confirm({ sn, remark })
        } else {
          await refuse({ sn, remark })
        }
        this.checkDialogVisible = false
        this.$refs.strapiTable.getList()
      },
      async transferFormSubmit() {
        const data = _.pick(this.form, [
          'payment_no',
          'transfer_description',
          'transfer_voucher',
          'sn',
        ])
        if (this.form.status) {
          data['transfer_voucher'] = data.transfer_voucher.join(',')
          await transferSuccess(data)
        } else {
          await transferFail(data)
        }
        this.transferDialogVisible = false
        this.$refs.strapiTable.getList()
      },
    },
  }
</script>

<style></style>
