<template>
  <div id="operateDialog">
    <el-dialog
        title="售后详情"
        :visible.sync="dialogShow"
        width="40%">
      <div class="max-h-96 overflow-y-auto">
        <el-divider
            content-position="left">
          售后信息
        </el-divider>
        <div class="flex flex-wrap p-5">
          <div class="w-1/3 mb-2">售后单号：{{ afterSaleData.after_sale.sn }}</div>
          <div class="w-1/3 mb-2">退款方式：{{ afterSaleData.after_sale.refund_type }}</div>
          <div class="w-1/3 mb-2">退款金额：{{ afterSaleData.after_sale.refund_price }}</div>
          <div class="w-1/3 mb-2">申请时间：{{ afterSaleData.after_sale.create_time }}</div>
          <div class="w-1/3 mb-2">退款原因：{{ afterSaleData.after_sale.refund_reason }}</div>
          <div class="w-1/3 mb-2">退款备注：{{ afterSaleData.after_sale.refund_remark }}</div>
          <div class="w-1/3 mb-2">申请状态：{{ afterSaleData.after_sale.refund_status }}</div>
        </div>
        <el-divider
            content-position="left">
          订单信息
        </el-divider>
        <div class="flex flex-wrap p-5">
          <div class="w-1/3 mb-2">订单编号：{{ afterSaleData.order.order_sn }}</div>
          <div class="w-1/3 mb-2">订单金额：{{ afterSaleData.order.order_amount }}</div>
          <div class="w-1/3 mb-2">付款方式：{{ afterSaleData.order.pay_way }}</div>
          <div class="w-1/3 mb-2">配送方式：{{ afterSaleData.order.pay_way }}</div>
          <div class="w-1/3 mb-2">订单状态：{{ afterSaleData.order.order_status }}</div>
        </div>
        <el-divider
            content-position="left">
          会员信息
        </el-divider>
        <div class="flex flex-wrap p-5">
          <div class="w-1/3 mb-2">会员编号：{{ afterSaleData.user.user_sn }}</div>
          <div class="w-1/3 mb-2">会员昵称：{{ afterSaleData.user.username }}</div>
          <div class="w-1/3 mb-2">手机号码：{{ afterSaleData.user.phone }}</div>
          <div class="w-1/3 mb-2">会员性别：{{ afterSaleData.user.sex }}</div>
          <div class="w-1/3 mb-2">注册时间：{{ afterSaleData.user.create_time }}</div>
        </div>
        <el-divider
            content-position="left">
          退款商品
        </el-divider>
        <div class="p-5">
          <el-table :data="afterSaleData.order_goods"
                    :summary-method="getSummaries"
                    show-summary
                    style="width: 100%">
            <el-table-column label="商品图片" width="100" align="center">
              <template slot-scope="scope">
                <el-image :src="scope.row.image" lazy></el-image>
              </template>
            </el-table-column>
            <el-table-column label="商品信息" align="center">
              <template slot-scope="scope">
                {{ scope.row.goods_name }}
              </template>
            </el-table-column>
            <el-table-column label="价格(元)" width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.goods_price }}
              </template>
            </el-table-column>
            <el-table-column label="数量" width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.goods_num }}
              </template>
            </el-table-column>
            <el-table-column label="小计" width="100" prop="total_pay_price" align="center">
            </el-table-column>
          </el-table>
        </div>
        <el-divider
            content-position="left"
            v-if="afterSaleData.refund_type === '退货退款'">
          收货信息
        </el-divider>
        <div class="flex flex-wrap p-5"
             v-if="afterSaleData.refund_type === '退货退款'">
          <div class="w-1/3 mb-2">快递公司：{{ afterSaleData.user.user_sn }}</div>
          <div class="w-1/3 mb-2">快递单号：{{ afterSaleData.user.username }}</div>
          <div class="w-1/3 mb-2">快递说明：{{ afterSaleData.user.phone }}</div>
          <div class="w-1/3 mb-2">退货地址：{{ afterSaleData.user.sex }}</div>
          <div class="w-1/3 mb-2">入库方式：{{ afterSaleData.user.create_time }}</div>
          <div class="w-1/3 mb-2">收货时间：{{ afterSaleData.user.create_time }}</div>
        </div>
        <el-divider
            content-position="left">
          售后日志
        </el-divider>
        <div class="pl-20 p-5">
          <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp">
              <h3>{{ activity.content }}</h3>
              <span>备注：{{ activity.content }}</span>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="afterSaleData.status === '申请退款'" type="success"
                   @click="onSuccessBtn(afterSaleData.status)">同意退款</el-button>
        <el-button v-if="afterSaleData.status === '申请退款'" type="warning"
                   @click="onWarningBtn(afterSaleData.status)">拒绝退款</el-button>
        <el-button v-else-if="afterSaleData.status === '商家待收货'" type="success"
                   @click="onSuccessBtn(afterSaleData.status)">确认收货</el-button>
        <el-button v-else-if="afterSaleData.status === '商家待收货'" type="warning"
                   @click="onWarningBtn(afterSaleData.status)">拒绝收货</el-button>
        <el-button v-else-if="afterSaleData.status === '等待退款'" type="success"
                   @click="onSuccessBtn(afterSaleData.status)">确认退款</el-button>
        <el-button type="primary" @click="dialogShow = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
        width="20%"
        :title="innerDialogTitle"
        :visible.sync="innerVisibleShow"
        append-to-body>
      <div>
        {{ innerDialogSpan }}
        <el-form :model="formData" ref="formData" label-width="75px" class="demo-ruleForm">
          <el-form-item label="提示:">
            {{ formData.hint }}
          </el-form-item>
          <el-form-item label="退款方式:">
            {{ formData.refund }}
          </el-form-item>
          <el-form-item label="退款金额:">
            {{ formData.amount }}
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="formData.Remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisibleShow = false">取 消</el-button>
          <el-button type="primary" @click="innerVisibleShow = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "operateDialog",
  props: {},
  watch: {
    afterSaleData: {
      deep: true,
      handler(value) {
        console.log('对话框数据', value)
      }
    }
  },
  data() {
    return {
      afterSaleData: {},
      // 售后日志列表
      activities: [
        {
          content: '活动按期开始',
          timestamp: '2018-04-15',
        },
        {
          content: '通过审核',
          timestamp: '2018-04-13',
        },
        {
          content: '创建成功',
          timestamp: '2018-04-11',
        }
      ],
      // 外层对话框显示开关
      dialogShow: false,
      // 表单数据
      formData: {
        Remark: '',
      },
      // 内层对话框显示开关
      innerVisibleShow: false,
      innerDialogTitle: '消息',
      innerDialogSpan: '',
      innerDialogRemark: false,
    }
  },
  mounted() {
  },
  methods: {
    onSuccessBtn(type) {
      if (type === '申请退款') {
        this.formData.hint = '该笔订单通过余额支付付款，商家确认退款后，退款将自动原路退回会员账户。'
        this.formData.refund = '余额'
        this.formData.amount = '¥100.00'
      }
      if (type === '商家待收货') {
      }
      if (type === '等待退款') {
      }
      this.innerDialogRemark = true
      this.innerVisibleShow = true
    },
    onWarningBtn(type) {
      if (type === '申请退款') {
      }
      if (type === '商家待收货') {
      }
      this.innerDialogRemark = false
      this.innerVisibleShow = true
    },
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        const values = data.map(item => parseFloat(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += '元';
        } else {
          sums[index] = 'N/A';
        }
      });
      return sums;
    },
  }
}
</script>

<style lang="scss">
#operateDialog {
  .el-divider--horizontal {
    margin: 10px 0;
  }
}

</style>
