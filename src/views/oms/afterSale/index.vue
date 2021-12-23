<template>
  <div id="afterSale">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          @click="onSearchList()"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="onResetSearch()"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="编号搜索">
            <div class="flex">
              <el-select
                class="select-width"
                v-model="listQuery.snType"
                placeholder="请选择编号类型"
              >
                <el-option
                  v-for="item in snOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                class="input-width"
                v-model="listQuery.sn"
                placeholder="请输入编号"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="退款人搜索">
            <div class="flex">
              <el-select
                class="select-width"
                v-model="listQuery.userType"
                placeholder="请选择编号类型"
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                class="input-width"
                v-model="listQuery.user"
                placeholder="请输入编号"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="申请时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.created_at"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex items-center justify-between" style="margin-left: 72px">
        <div class="pt-2">
          <span class="el-form-item__label">售后申请状态：</span>
          <el-radio-group v-model="listQuery.status">
            <el-radio-button
              v-for="item in afterSaleOptions"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </el-card>
    <div class="table-container">
      <el-table
        :data="afterSaleList"
        ref="afterSaleTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="tableLoading"
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="订单编号" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.order.order_sn }}</template>
        </el-table-column>
        <el-table-column label="售后编号" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.after_sales.sn }}</template>
        </el-table-column>
        <el-table-column label="申请人信息" width="210px" align="center">
          <template slot-scope="scope">
            <div class="flex text-xs items-start">
              <el-image :src="scope.row.user.avatar" lazy></el-image>
              <div class="pl-2 text-left">
                <p>会员编号:{{ scope.row.user.sn }}</p>
                <p>会员昵称:{{ scope.row.user.username }}</p>
                <p>手机号:{{ scope.row.user.phone }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" width="210px" align="center">
          <template slot-scope="scope">
            <div class="flex text-xs items-start">
              <el-image :src="scope.row.orderGoods[0].pic_url" lazy></el-image>
              <div class="pl-2 text-left">
                <p>商品编号:{{ scope.row.orderGoods[0].goods_sn }}</p>
                <p class="truncate w-32">
                  商品名称:{{ scope.row.orderGoods[0].goods_name }}
                </p>
                <p>商品价格:{{ scope.row.orderGoods[0].price }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="订单信息" width="150px" align="center">
          <template slot-scope="scope">
            <div class="flex text-xs items-start">
              <div class="pl-2 text-left">
                <p>订单状态:{{ scope.row.order.status | formatOrderStatus }}</p>
                <p>支付金额:{{ scope.row.order.order_price }}</p>
                <p>支付方式:{{ scope.row.order.payWay }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="售后信息" width="150px" align="center">
          <template slot-scope="scope">
            <div class="flex text-xs items-start">
              <div class="pl-2 text-left">
                <p>
                  售后方式:{{
                    scope.row.after_sales.refund_type == 0
                      ? '仅退款'
                      : '退款退货'
                  }}
                </p>
                <p>退款金额:{{ scope.row.after_sales.refund_price }}</p>
                <p>
                  售后状态:{{ scope.row.after_sales.status | formatAfStatus }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.created_at | formatCreateTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="onDetails(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container ml-5 mt-5">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate(operateType)"
        type="primary"
        size="small"
      >
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 15]"
        :total="total"
      ></el-pagination>
    </div>
    <Operate-dialog ref="OperateDialog"></Operate-dialog>
  </div>
</template>

<script>
  import { getAfterSaleList } from '@/api/order'
  import { formatDate } from '@/utils/date'
  import OperateDialog from './components/operateDialog'

  const defaultListQuery = {
    page: 1,
    pageSize: 10,
    snType: null,
    sn: null,
    userType: null,
    user: null,
    created_at: '',
    status: 0,
  }
  export default {
    name: 'afterSale',
    components: {
      OperateDialog,
    },
    data() {
      return {
        // 搜索表单数据
        listQuery: Object.assign({}, defaultListQuery),
        // 售后列表
        afterSaleList: [],
        //售后选择列表
        afterSaleSelect: [],
        // 数据总条数
        total: 0,
        // 表格加载开关
        tableLoading: false,
        // 编号key列表
        snOptions: [
          {
            label: '售后编号',
            value: 'afterSaleSn',
          },
          {
            label: '订单编号',
            value: 'orderSn',
          },
          {
            label: '用户编号',
            value: 'userSn',
          },
          {
            label: '商品编号',
            value: 'goodsSn',
          },
        ],
        // 退款人key列表
        userOptions: [
          {
            label: '会员编号',
            value: 'userSn',
          },
          {
            label: '会员昵称',
            value: 'username',
          },
          {
            label: '会员电话',
            value: 'phone',
          },
        ],
        // 售后状态信息列表
        afterSaleOptions: [
          {
            label: '全部',
            value: '',
          },
          {
            label: '申请退款',
            value: 0,
          },
          {
            label: '商家拒绝',
            value: 1,
          },
          {
            label: '商品待退货',
            value: 2,
          },
          {
            label: '商家待收货',
            value: 3,
          },
          {
            label: '商家拒收货',
            value: 4,
          },
          {
            label: '等待退款',
            value: 5,
          },
          {
            label: '退款成功',
            value: 6,
          },
        ],
        // 批量操作方法列表
        operateType: null,
        operateOptions: [
          {
            label: '批量发货',
            value: 1,
          },
          {
            label: '关闭订单',
            value: 2,
          },
          {
            label: '删除订单',
            value: 3,
          },
        ],
      }
    },
    mounted() {
      this.reqGetList()
    },
    methods: {
      // 获取列表
      async reqGetList() {
        this.tableLoading = true
        const res = await getAfterSaleList(this.funCovertQuery())
        let { list, pagination } = res
        console.log('list', list)
        this.afterSaleList = list
        this.total = pagination.rowCount
        this.tableLoading = false
      },
      // 点击查询列表
      onSearchList() {
        this.listQuery.page = 1
        this.reqGetList()
      },
      // 点击重置搜索表单
      onResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery)
        this.listQuery.page = 1
        this.reqGetList()
      },
      // 调整每页个数
      handleSizeChange(val) {
        this.listQuery.page = 1
        this.listQuery.pageSize = val
        this.getList()
      },
      // 列表翻页
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      // 勾选后的数据单独存放
      handleSelectionChange(value) {
        this.afterSaleSelect = value
      },
      // 批量操作方法
      handleBatchOperate(operateType) {
        if (!operateType) {
          this.$message({
            type: 'info',
            message: '请选择批量操作方法',
            duration: 1000,
          })
          return
        }
        if (!this.afterSaleSelect.length > 0) {
          this.$message({
            type: 'info',
            message: '请勾择需要操作订单',
            duration: 1000,
          })
          return
        }
        if (operateType === 1) {
        }
        if (operateType === 2) {
        }
        if (operateType === 3) {
        }
      },
      // 搜索条件对象转换处理
      funCovertQuery() {
        const { snType, sn, userType, user, ...query } = this.listQuery
        let data = {
          ...query,
        }
        if (snType) {
          data[snType] = sn
        }
        if (userType) {
          data[userType] = user
        }
        return data
      },
      // 售后退款详情模态框
      onDetails(afterSale) {
        this.$refs.OperateDialog.afterSaleData = afterSale
        this.$refs.OperateDialog.dialogShow = true
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
        switch (status) {
          case 0:
            text = '申请退款'
            break
          case 1:
            text = '商家拒绝'
            break
          case 2:
            text = '待退货退款'
            break
          case 3:
            text = '商家待收货'
            break
          case 4:
            text = '商家拒收货'
            break
          case 5:
            text = '等待退款'
            break
          case 6:
            text = '退款成功'
            break
          default:
            this.statusText = '无状态'
            break
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
        switch (status) {
          case 100:
            text = '申请退款'
            break
          case 200:
            text = '商家拒绝'
            break
          case 300:
            text = '待退货退款'
            break
          case 301:
            text = '商家待收货'
            break
          case 303:
            text = '商家拒收货'
            break
          case 400:
            text = '等待退款'
            break
          case 404:
            text = '退款成功'
            break
          case 500:
            text = '退款成功'
            break
          case 501:
            text = '退款成功'
            break
          case 502:
            text = '退款成功'
            break
          case 600:
            text = '退款成功'
            break
          case 700:
            text = '退款成功'
            break
          default:
            text = '无状态'
            break
        }
        return text
      },
    },
  }
</script>

<style scoped>
  .input-width {
    width: 203px;
  }

  .select-width {
    width: 150px;
    margin-right: 10px;
  }
</style>
