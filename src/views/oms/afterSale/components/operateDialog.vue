<template>
  <div id="operateDialog">
    <el-dialog
      title="售后详情"
      :visible.sync="dialogShow"
      width="40%">
      <div class="max-h-96 overflow-y-auto">
        <el-divider content-position="left">售后信息</el-divider>
        <div class="flex flex-wrap p-5">
          <div class="w-1/3 mb-2">售后单号：{{ afterSaleData.after_sales.sn }}</div>
          <div class="w-1/3 mb-2">退款方式：{{ afterSaleData.after_sales.refund_type }}</div>
          <div class="w-1/3 mb-2">退款金额：{{ afterSaleData.after_sales.refund_price }}</div>
          <div class="w-1/3 mb-2">申请时间：{{ afterSaleData.created_at | formatCreateTime}}</div>
          <div class="w-1/3 mb-2">退款原因：{{afterSaleData.after_sales.refund_reason}}</div>
          <div class="w-1/3 mb-2">退款说明：{{afterSaleData.after_sales.refund_remark}}</div>
          <div class="w-1/3 mb-2">申请状态：{{ afterSaleData.after_sales.status | formatAfStatus }}</div>
          <div class="w-1/3 mb-2">售后说明：{{ afterSaleData.after_sales.refund_type }}</div>
        </div>
        <el-divider content-position="left">订单信息</el-divider>
        <div class="flex flex-wrap p-5">
          <div class="w-1/3 mb-2">订单编号：{{ afterSaleData.order.order_sn }}</div>
          <div class="w-1/3 mb-2">订单金额：{{ afterSaleData.order.order_price }}</div>
          <div class="w-1/3 mb-2">付款方式：{{ afterSaleData.order.payWay }}</div>
          <div class="w-1/3 mb-2">配送方式：物流配送</div>
          <div class="w-1/3 mb-2">订单状态：{{ afterSaleData.order.status | formatOrderStatus}}</div>
        </div>
        <el-divider content-position="left">会员信息</el-divider>
        <div class="flex flex-wrap p-5">
          <div class="w-1/3 mb-2">会员编号：{{ afterSaleData.user.sn }}</div>
          <div class="w-1/3 mb-2">会员昵称：{{ afterSaleData.user.username }}</div>
          <div class="w-1/3 mb-2">手机号码：{{ afterSaleData.user.phone }}</div>
          <!-- <div class="w-1/3 mb-2">会员性别：{{ afterSaleData.user.sex }}</div> -->
          <!-- <div class="w-1/3 mb-2">注册时间：{{ afterSaleData.user.created_at | formatCreateTime }}</div> -->
        </div>
        <el-divider content-position="left">退款商品</el-divider>
        <div class="pb-2">
          <el-table :data="afterSaleData.orderGoods"
                    style="width: 100%">
            <el-table-column label="商品图片" width="100" align="center">
              <template slot-scope="scope">
                <el-image :src="scope.row.pic_url" lazy></el-image>
              </template>
            </el-table-column>
            <el-table-column label="商品信息" align="center">
              <template slot-scope="scope">
                {{ scope.row.goods_name }}
              </template>
            </el-table-column>
            <el-table-column label="价格(元)" width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.price }}
              </template>
            </el-table-column>
            <el-table-column label="数量" width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.number }}
              </template>
            </el-table-column>
            <el-table-column label="小计" width="100" prop="total_pay_price" align="center">
            </el-table-column>
          </el-table>
        </div>
        <el-divider content-position="left">售后操作</el-divider>
        
        <el-divider content-position="left">售后日志</el-divider>
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
       <el-button v-if="afterSaleData.after_sales.status == 0" type="success"
                   @click="onSuccessBtn(afterSaleData.after_sales.status)">审核申请退款</el-button>
        <el-button v-if="afterSaleData.after_sales.status == 0" type="warning"
                   @click="onWarningBtn(afterSaleData.after_sales.status)">商家拒绝</el-button>
        <el-button v-if="afterSaleData.after_sales.status == 2" type="success"
        @click="onSuccessBtn(afterSaleData.after_sales.status)">商品待退货</el-button>
        <el-button v-if="afterSaleData.after_sales.status == 3" type="success"
                   @click="onSuccessBtn(afterSaleData.after_sales.status)">商家待收货</el-button>
        <el-button v-if="afterSaleData.after_sales.status == 3" type="warning"
                   @click="onWarningBtn(afterSaleData.after_sales.status)">商家拒收货</el-button>
        <el-button v-if="afterSaleData.after_sales.status == 5" type="success"
                   @click="onSuccessBtn(afterSaleData.after_sales.status)">等待退款</el-button>
        <el-button v-if="afterSaleData.after_sales.status == 6" type="success"
        @click="onSuccessBtn(afterSaleData.after_sales.status)">售后完成</el-button>
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
          <!-- <el-form-item label="退款方式:">
            {{ formData.refund }}
          </el-form-item>
          <el-form-item label="退款金额:">
            {{ formData.amount }}
          </el-form-item> -->
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisibleShow = false">取 消</el-button>
          <el-button type="primary" @click="onConfirm">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {formatDate} from "@/utils/date";
import {afterSalesAgree,afterSalesRefuse,afterSalesTakeGoods,afterSalesRefuseGoods,afterSalesConfirm} from "@/api/order";

export default {
  name: "operateDialog",
  props: {},
  data() {
    return {
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
      dialogShow: false,
       // 外层对话框显示开关
      dialogShow: false,
      // 表单数据
      formData: {
        remark: '',
        hint: '',
        refund: '',
        amount: ''
      },
      statusText: '',
      // 内层对话框显示开关
      innerVisibleShow: false,
      innerDialogTitle: '消息',
      innerDialogSpan: '',
      innerDialogRemark: false,
      afterSaleData: {
        after_sales:{}
      },
      clickStatus: ''
    }
  },
  mounted() {
  },
  methods: {
     onSuccessBtn(status) {
       //售后状态;0-申请退款;1-商家拒绝;2-商品待退货;3-商家待收货;4-商家拒收货;5-等待退款;6-退款成功
      if (status === 0) {
        this.formData.hint = '确认信息无误，该用户是否可以申请退款？'
        this.clickStatus = 0
        // this.formData.refund = '余额'
        // this.formData.amount = '¥100.00'
      }
      if (status === 2) {
        this.formData.hint = '客户退货中，快递发出后，会更新状态'
        this.clickStatus = 2

      }
      if (status === 3) {
        this.formData.hint = '确认已收货，是否把售后状态改为 等待退款'
        this.clickStatus = 3

      }
      if (status ===5) {
        this.formData.hint = '是否把售后状态改为已完成'
        this.clickStatus = 5
      }

      this.innerDialogRemark = true
      this.innerVisibleShow = true
    },
    onWarningBtn(status) {
      if (status === 0) {
        this.formData.hint = '确认拒绝售后申请？'
        this.clickStatus = 1

      }
      if (status === 3) {
        this.formData.hint = '确认拒绝收货？'
        this.clickStatus = 4

      }
      this.innerDialogRemark = false
      this.innerVisibleShow = true
    },
    onConfirm() {
      this.innerVisibleShow = false
      const id = this.afterSaleData.after_sales.id
      //同意申请
      if(this.clickStatus == 0) {
        afterSalesAgree(id)
      }
      //拒绝申请
      if(this.clickStatus == 1) {
        afterSalesRefuse(id)
      }
      //收到货物
      if(this.clickStatus == 3) {
        afterSalesTakeGoods(id)
      }
      //拒绝收货
      if(this.clickStatus == 4) {
        afterSalesRefuseGoods(id)
      }
      if(this.clickStatus == 5) {
        afterSalesConfirm(id)
      }
      
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
  },
    filters: {
    formatCreateTime(value) {
      let date = new Date(value)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatAfStatus(status) {
       //售后状态;0-申请退款;1-商家拒绝;2-商品待退货;3-商家待收货;4-商家拒收货;5-等待退款;6-退款成功
        let text
      switch(status) {
        case 0:
          text = '申请退款'
          break;
         case 1:
          text = '商家拒绝'
        break;
         case 2:
          text = '待退货退款'
        break;
         case 3:
          text = '商家待收货'
        break;
         case 4:
          text = '商家拒收货'
        break;
         case 5:
          text = '等待退款'
        break;
         case 6:
          text = '退款成功'
        break;
        default: 
          this.statusText = '无状态'
          break;
      }
      return text
    },
     formatOrderStatus(status) {
    //    this.PAY = 100; //待付款
    // this.TOSHIPPED = 200; //待发货
    // this.SHIPPED = 300; //待收货
    // this.COLLECTED = 301; // 已揽收
    // this.INSHIPPED = 302; // 在途中
    // this.INSIGN = 303; //已签收  
    // this.RECEIVED = 400; //已收货(待评价)
    // this.SHIPPED_TROUBLE = 404; //问题件
    // this.APPLY_REFUND = 500; // 申请售后
    // this.REFUNDING = 501; // 501: 售后/退款 处理中
    // this.REFUNDEND = 502; // 售后/退款完成
    // this.COMPLETED = 600; // 已完成
    // this.CLOSED = 700; // 订单关闭
        let text
      switch(status) {
        case 100:
          text = '申请退款'
          break;
         case 200:
          text = '商家拒绝'
        break;
         case 300:
          text = '待退货退款'
        break;
         case 301:
          text = '商家待收货'
        break;
         case 303:
          text = '商家拒收货'
        break;
         case 400:
          text = '等待退款'
        break;
         case 404:
          text = '退款成功'
        break;
         case 500:
          text = '退款成功'
        break;
         case 501:
          text = '退款成功'
        break;
         case 502:
          text = '退款成功'
        break;
          case 600:
          text = '退款成功'
        break;
          case 700:
          text = '退款成功'
        break;
        default: 
          text = '无状态'
          break;
      }
      return text
    }
  },
}
</script>

<style scoped>

</style>
