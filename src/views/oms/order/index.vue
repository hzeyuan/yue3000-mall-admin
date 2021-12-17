<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="handleResetSearch()"
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
          label-width="100px">
          <el-form-item label="搜索：">
            <div class="flex">
              <el-select class="select-width" v-model="listQuery.search_key" placeholder="请选择编号类型">
                <el-option
                  v-for="item in keywordOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input class="input-width" v-model="listQuery.keyword" placeholder="请输入编号"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="商品名称：">
            <div class="flex">
              <el-input class="input-width" v-model="listQuery.goods_name" placeholder="请输入商品名称"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="下单时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.create_at"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="订单来源：">
            <el-select class="select-width" v-model="listQuery.sourceType" placeholder="请选择订单来源">
              <el-option
                v-for="item in sourceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex items-center justify-between" style="margin-left: 50px">
        <div class="pt-2">
          <span class="el-form-item__label">订单状态：</span>
          <el-radio-group v-model="listQuery.status" @change="handleCurrentChange(1)">
            <el-radio-button
              v-for="item in orderStateOptions"
              :key="item.value"
              :label="item.value">
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="orderTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="订单编号" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.order_sn }}</template>
        </el-table-column>
        <el-table-column label="提交时间" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.created_at | formatCreateTime }}
          </template>
        </el-table-column>
        <el-table-column width="210px" label="用户账号" align="center">
          <template slot-scope="scope">
            <div class="flex text-xs items-start">
              <el-image :src="scope.row.avatar" lazy></el-image>
              <div class="pl-2 text-left">
                <p>会员编号:{{ scope.row.user_sn }}</p>
                <p>会员昵称:{{ scope.row.username }}</p>
                <p>手机号:{{ scope.row.phone }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="商品图片"
          width="320"
          align="center"
        >
          <template #default="{ row }">
            <div :key="goods.id" v-for="goods in row.order_goods" class="flex">
              <el-image
                style="width: 70px; height: 70px; min-width: 70px"
                lazy
                fit="fill"
                :src="goods.pic_url"
              ></el-image>
              <div class="flex flex-col items-start">
                <div>{{ goods.goods_name }}</div>
                <el-row>
                  <el-col :span="16">
                    <div>
                      <span>商品规格：</span>
                      <span>{{ goods.specifications }}</span>
                    </div>
                  </el-col>
                </el-row>
                <div>
                  <span>数量：x {{ goods.number }}</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="订单金额" width="120" align="center">
          <template slot-scope="scope">
            <div class="flex text-xs items-start">
              <div class="pl-2 text-left">
                <p>运费金额:￥{{ scope.row.order_price }}</p>
                <p>订单金额:￥{{ scope.row.order_price }}</p>
                <p>优惠金额:￥{{ scope.row.order_price }}</p>
                <p>实付金额:￥{{ scope.row.order_price }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="收货信息" width="180" align="center">
          <template slot-scope="scope">
            <div class="flex text-xs items-start">
              <div class="pl-2 text-left">
                <p>收货人:{{ scope.row.receiver }}</p>
                <p>手机号码:{{ scope.row.phone }}</p>
                <p>收货地址:{{ scope.row.address }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" width="80" align="center">
          <template slot-scope="scope">
            {{ scope.row.payWay | formatPayType }}
          </template>
        </el-table-column>
        <el-table-column label="订单来源" width="80" align="center">
          <template slot-scope="scope">
            {{ scope.row.sourceType | formatSourceType }}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="80" align="center">
          <template slot-scope="scope">
            {{ scope.row.status | formatStatus }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewOrder(scope.$index, scope.row)"
            >
              订单详情
            </el-button>
            <!-- 待发货:取消订单 -->
            <el-button
              size="mini"
              type="warning"
              @click="handleCloseOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 200"
            >
              取消订单
            </el-button>
            <!-- 待发货:发货 -->
            <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 200"
            >
              订单发货
            </el-button>
            <!-- 待发货，待收货，运输中，已完成:物流查询 -->
            <el-button
              size="mini"
              @click="handleViewLogistics(scope.$index, scope.row)"
              v-show="scope.row.status >= 300 && scope.row.status <= 600"
            >
              物流查询
            </el-button>
            <!-- 已完成:确认收货 -->
            <el-button
              size="mini"
              @click="handleConfirmOrder(scope.row)"
              v-show="scope.row.status >= 300 && scope.row.status < 600"
            >
              确认收货
            </el-button>
            <!-- 已关闭:删除订单 -->
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 700"
            >
              删除订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
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
        @click="handleBatchOperate()"
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
    <el-dialog
      title="关闭订单"
      :visible.sync="closeOrder.dialogVisible"
      width="30%"
    >
      <span style="vertical-align: top">操作备注：</span>
      <el-input
        style="width: 80%"
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="closeOrder.content"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <OrderTracesDrawer ref="orderTraces"></OrderTracesDrawer>
    <OrderDeliveryDrawer
      @isDelivery="getList"
      ref="orderDelivery"
    ></OrderDeliveryDrawer>
  </div>
</template>
<script>
import OrderDeliveryDrawer from './components/OrderDeliveryDrawer'
import {fetchList, closeOrder, deleteOrder, confirmOrder} from '@/api/order'
import {formatDate} from '@/utils/date'
import OrderTracesDrawer from './components/OrderTracesDrawer'

const defaultListQuery = {
  page: 1,
  pageSize: 10,
  // 搜索模糊匹配的key
  search_key: '',
  // 搜索模糊匹配的value
  keyword: '',
  // 订单状态
  status: 0,
  // 下单时间
  create_at: '',
  goods_name: '',
  // 订单来源
  sourceType: ''

}
export default {
  name: 'orderList',
  components: {OrderTracesDrawer, OrderDeliveryDrawer},
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      operateType: null,
      multipleSelection: [],
      closeOrder: {
        dialogVisible: false,
        content: null,
        orderIds: [],
      },
      statusOptions: [
        {
          label: '待付款',
          value: 100,
        },
        {
          label: '待发货',
          value: 200,
        },
        {
          label: '已发货',
          value: 300,
        },
        {
          label: '待评价',
          value: 400,
        },
        {
          label: '已完成',
          value: 500,
        },
        {
          label: '已关闭',
          value: 600,
        },
      ],
      orderTypeOptions: [
        {
          label: '正常订单',
          value: 0,
        },
        {
          label: '秒杀订单',
          value: 1,
        },
      ],

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
      // 订单物流
      orderTraces: [],
      // 搜索key列表
      keywordOptions: [
        {
          label: '订单编号',
          value: 'order_sn'
        },
        {
          label: '用户编号',
          value: 'user_sn'
        },
        {
          label: '用户编号',
          value: 'username'
        },
        {
          label: '手机号码',
          value: 'user_phone'
        },
      ],
      // 订单列表数据
      orderStateOptions: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '待付款',
          value: 100
        },
        {
          label: '待发货',
          value: 200
        },
        {
          label: '已发货',
          value: 300
        },
        {
          label: '待收货',
          value: 400
        },
        {
          label: '待评价',
          value: 500
        },
        {
          label: '已完成',
          value: 600
        },
        {
          label: '已关闭',
          value: 700
        },
      ],
      // 订单来源
      sourceTypeOptions: [
        {
          label: 'PC订单',
          value: 0,
        },
        {
          label: 'APP订单',
          value: 1,
        },
      ],
    }
  },
  created() {
    this.getList()
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatPayType(value) {
      if (value === 1) {
        return '支付宝'
      } else if (value === 2) {
        return '微信'
      } else {
        return '未支付'
      }
    },
    formatSourceType(value) {
      if (value === 1) {
        return 'APP订单'
      } else {
        return 'PC订单'
      }
    },
    formatStatus(value) {
      if (value === 100) {
        return '待付款'
      } else if (value === 200) {
        return '待发货'
      } else if (value === 300) {
        return '已发货'
      } else if (value === 400) {
        return '待收货'
      } else if (value === 500) {
        return '待评价'
      } else if (value === 600) {
        return '已完成'
      } else if (value === 700) {
        return '已关闭'
      }
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //查看订单
    handleViewOrder(index, row) {
      this.$router.push({path: '/oms/orderDetail', query: {id: row.id}})
    },
    // 取消订单
    handleCloseOrder(index, row) {
      this.$confirm('确认取消订单吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      })
        .then(async () => {
          await closeOrder(row.id)
          this.$message({
            type: 'success',
            message: '取消成功!',
          })
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消',
          })
        })
    },
    // 处理订单发货
    handleDeliveryOrder(index, row) {
      this.$refs.orderDelivery.open(row.id)
    },
    // 删除订单
    handleDeleteOrder(index, row) {
      let ids = []
      ids.push(row.id)
      this.$confirm('确认删除订单吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
      })
        .then(async () => {
          await deleteOrder(ids)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消',
          })
        })
    },
    // 确认收货
    handleConfirmOrder(row) {
      this.$confirm('确认订单商品已收货吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
      })
        .then(async () => {
          await confirmOrder(row.id)
          this.$message({
            type: 'success',
            message: '收货成功!',
          })
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消',
          })
        })
    },
    // 物流查询
    handleViewLogistics(index, row) {
      this.$refs.orderTraces.open(row.id)
      // const traces = [...row.traces]
      // traces.reverse()
      // this.orderTraces = traces
    },

    handleBatchOperate() {
      if (
        this.multipleSelection == null ||
        this.multipleSelection.length < 1
      ) {
        this.$message({
          message: '请选择要操作的订单',
          type: 'warning',
          duration: 1000,
        })
        return
      }
      if (this.operateType === 1) {
        //批量发货
        let list = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status === 200) {
            list.push(this.covertOrder(this.multipleSelection[i]))
          }
        }
        if (list.length === 0) {
          this.$message({
            message: '选中订单中没有可以发货的订单',
            type: 'warning',
            duration: 1000,
          })
          return
        }
        this.$router.push({
          path: '/oms/deliverOrderList',
          query: {list: list},
        })
      } else if (this.operateType === 2) {
        //关闭订单
        this.closeOrder.orderIds = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.closeOrder.orderIds.push(this.multipleSelection[i].id)
        }
        this.closeOrder.dialogVisible = true
      } else if (this.operateType === 3) {
        //删除订单
        let ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id)
        }
        this.deleteOrder(ids)
      }
    },
    handleSizeChange(val) {
      this.listQuery.page = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleCloseOrderConfirm() {
      if (this.closeOrder.content == null || this.closeOrder.content === '') {
        this.$message({
          message: '操作备注不能为空',
          type: 'warning',
          duration: 1000,
        })
        return
      }
      let params = new URLSearchParams()
      params.append('ids', this.closeOrder.orderIds)
      params.append('note', this.closeOrder.content)
      closeOrder(params).then((response) => {
        this.closeOrder.orderIds = []
        this.closeOrder.dialogVisible = false
        this.getList()
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000,
        })
      })
    },
    covertQuery() {
      const {status, create_at, ...query} = this.listQuery
      let data = {
        ...query
      }
      if (status) {
        if (status === 300) {
          data.status_in = [300, 301, 302, 303] + ''
        } else {
          data.status = status
        }
      }
      if (create_at) {
        let date = new Date(create_at)
        date = date.setDate(date.getDate() + 1);
        date = new Date(date)
        date = formatDate(date, 'yyyy-MM-dd')
        data.created_at_gt = create_at
        data.created_at_lte = date
      }
      return data
    },
    getList() {
      this.listLoading = true
      fetchList(this.covertQuery()).then((response) => {
        this.listLoading = false
        const {list, pagination} = response
        this.list = list
        this.total = pagination.rowCount
      })
    },
    deleteOrder(ids) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let params = new URLSearchParams()
        params.append('ids', ids)
        deleteOrder(params).then((response) => {
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000,
          })
          this.getList()
        })
      })
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

body {
  margin: 0;
}
</style>
