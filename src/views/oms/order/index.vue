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
          label-width="140px"
        >
          <el-form-item label="输入搜索：">
            <el-input
              v-model="listQuery.order_sn"
              class="input-width"
              placeholder="订单编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input
              v-model="listQuery.keyword"
              class="input-width"
              placeholder="收货人姓名/手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.create_at"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select
              v-model="listQuery.status"
              class="input-width"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单分类：">
            <el-select
              v-model="listQuery.payWay"
              class="input-width"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in orderTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单来源：">
            <el-select
              v-model="listQuery.sourceType"
              class="input-width"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in sourceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
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
        border>
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="订单编号" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.order_sn }}</template>
        </el-table-column>
        <el-table-column label="提交时间" width="180" align="center">
          <template slot-scope="scope">{{
            scope.row.created_at | formatCreateTime
          }}</template>
        </el-table-column>
        <el-table-column label="用户账号" align="center">
          <template slot-scope="scope">{{ `${scope.row.username} ${scope.row.phone}` }}</template>
        </el-table-column>
        <el-table-column label="订单金额" width="120" align="center">
          <template slot-scope="scope">￥{{ scope.row.acutal_price }}</template>
        </el-table-column>
        <el-table-column label="支付方式" width="120" align="center">
          <template slot-scope="scope">{{
            scope.row.payWay | formatPayType
          }}</template>
        </el-table-column>
        <el-table-column label="订单来源" width="120" align="center">
          <template slot-scope="scope">{{
            scope.row.sourceType | formatSourceType
          }}</template>
        </el-table-column>
        <el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="scope">{{
            scope.row.status | formatStatus
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewOrder(scope.$index, scope.row)"
              >查看订单</el-button
            >
            <!-- <el-button
              size="mini"
              @click="handleCloseOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 0"
              >关闭订单</el-button
            > -->
            <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 200"
              >订单发货</el-button
            >
            <!-- 300:已发货，400：已收货 -->
            <el-button
              size="mini"
              @click="handleViewLogistics(scope.$index, scope.row)"
              v-show="scope.row.status === 300 || scope.row.status === 400"
              >订单跟踪</el-button
            >
            <!-- 600：已关闭订单，700：已完成订单  -->
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 600 || scope.row.status === 700"
              >删除订单</el-button
            >
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
        >
        </el-option>
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
      >
      </el-pagination>
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
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <logistics-dialog :orderTraces="orderTraces" v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>
<script>
import { fetchList, closeOrder, deleteOrder } from "@/api/order";
import { formatDate } from "@/utils/date";
import LogisticsDialog from "@/views/oms/order/components/logisticsDialog";

const defaultListQuery = {
  page: 1,
  pageSize: 10,
  orderSn: null,
  receiverKeyword: null,
  status: null,
  orderType: null,
  sourceType: null,
  createTime: null,
};
export default {
  name: "orderList",
  components: { LogisticsDialog },
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
          label: "待付款",
          value: 100,
        },
        {
          label: "待发货",
          value: 200,
        },
        {
          label: "已发货",
          value: 300,
        },
        {
          label: "待评价",
          value: 400,
        },
        {
          label: "已完成",
          value: 500,
        },
        {
          label: "已关闭",
          value: -1,
        },
      ],
      orderTypeOptions: [
        {
          label: "正常订单",
          value: 0,
        },
        {
          label: "秒杀订单",
          value: 1,
        },
      ],
      sourceTypeOptions: [
        {
          label: "PC订单",
          value: 0,
        },
        {
          label: "APP订单",
          value: 1,
        },
      ],
      operateOptions: [
        {
          label: "批量发货",
          value: 1,
        },
        {
          label: "关闭订单",
          value: 2,
        },
        {
          label: "删除订单",
          value: 3,
        },
      ],
      // 订单物流
      logisticsDialogVisible: false,
      orderTraces:[]
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatPayType(value) {
      if (value === 1) {
        return "支付宝";
      } else if (value === 2) {
        return "微信";
      } else {
        return "未支付";
      }
    },
    formatSourceType(value) {
      if (value === 1) {
        return "APP订单";
      } else {
        return "PC订单";
      }
    },
    formatStatus(value) {
      if (value === 200) {
        return "待发货";
      } else if (value === 300) {
        return "已发货";
      } else if (value === 400) {
        return "待评价";
      } else if (value === 500) {
        return "已完成";
      } else if (value === 100) {
        return "待付款";
      }else if(value === 600){
        return '已关闭'
      }
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleViewOrder(index, row) {
      this.$router.push({ path: "/oms/orderDetail", query: { id: row.id } });
    },
    handleCloseOrder(index, row) {
      this.closeOrder.dialogVisible = true;
      this.closeOrder.orderIds = [row.id];
    },
    // 处理订单发货
    handleDeliveryOrder(index, row) {
      let listItem = this.covertOrder(row);
      this.$router.push({
        path: "/oms/deliverOrderList",
        query: { list: [listItem] },
      });
    },
    handleViewLogistics(index, row) {
      if(!row.traces)return
      const traces =  [...row.traces];
      traces.reverse()
      this.orderTraces =traces;
      this.logisticsDialogVisible = true;
    },
    handleDeleteOrder(index, row) {
      let ids = [];
      ids.push(row.id);
      this.deleteOrder(ids);
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: "请选择要操作的订单",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (this.operateType === 1) {
        //批量发货
        let list = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status === 200) {
            list.push(this.covertOrder(this.multipleSelection[i]));
          }
        }
        if (list.length === 0) {
          this.$message({
            message: "选中订单中没有可以发货的订单",
            type: "warning",
            duration: 1000,
          });
          return;
        }
        this.$router.push({
          path: "/oms/deliverOrderList",
          query: { list: list },
        });
      } else if (this.operateType === 2) {
        //关闭订单
        this.closeOrder.orderIds = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.closeOrder.orderIds.push(this.multipleSelection[i].id);
        }
        this.closeOrder.dialogVisible = true;
      } else if (this.operateType === 3) {
        //删除订单
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        this.deleteOrder(ids);
      }
    },
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCloseOrderConfirm() {
      if (this.closeOrder.content == null || this.closeOrder.content === "") {
        this.$message({
          message: "操作备注不能为空",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let params = new URLSearchParams();
      params.append("ids", this.closeOrder.orderIds);
      params.append("note", this.closeOrder.content);
      closeOrder(params).then((response) => {
        this.closeOrder.orderIds = [];
        this.closeOrder.dialogVisible = false;
        this.getList();
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    covertQuery(){
      const {keyword,...query} = this.listQuery;
      return {
        ...query,
        phone:keyword,
        username:keyword
      }
    },
    getList() {
      this.listLoading = true;
      fetchList(this.covertQuery()).then((response) => {
        this.listLoading = false;
        const { list, pagination } = response;
        this.list = list;
        this.total = pagination.rowCount;
      });
    },
    deleteOrder(ids) {
      this.$confirm("是否要进行该删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", ids);
        deleteOrder(params).then((response) => {
          this.$message({
            message: "删除成功！",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    covertOrder(order) {
      // let address =
      //   order.receiverProvince +
      //   order.receiverCity +
      //   order.receiverRegion +
      //   order.receiverDetailAddress;
      let listItem = {
        orderId: order.id,
        orderSn: order.order_sn,
        receiverName: order.username,
        receiverPhone: order.phone,
        // receiverPostCode: order.receiverPostCode, // todo；邮政编号
        address: order.address,
        deliveryCompany: order.ship_channel,
        deliverySn: order.ship_sn,
      };
      return listItem;
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 203px;
}
</style>


