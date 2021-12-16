<template>
  <el-drawer :visible.sync="visible" title="订单发货" direction="rtl">
    <div style="padding: 0 40px; width: 100%">
      <el-divider content-position="left">收货信息</el-divider>
      <el-descriptions direction="vertical">
        <el-descriptions-item label="收货人">
          {{ order.receiver }}
        </el-descriptions-item>
        <el-descriptions-item label="手机号">
          {{ order.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="收货地址">
          {{ order.address }}
        </el-descriptions-item>
      </el-descriptions>
      <el-divider content-position="left">商品信息</el-divider>
      <el-table :data="order.order_goods" v-loading="tableLoading" width="100">
        <el-table-column label="商品信息" width="330">
          <template slot-scope="{ row }">
            <div class="flex">
              <el-image
                style="width: 70px; height: 70px; min-width: 70px"
                lazy
                fit="fill"
                :src="row.pic_url"
              ></el-image>
              <div class="flex flex-col items-start">
                <div>{{ row.goods_name }}</div>
                <div class="flex justify-between w-full">
                  <div>
                    <span>{{ row.specifications }}</span>
                  </div>
                  <div>
                    <span>x {{ row.number }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="价格">
          <template slot-scope="{ row }">
            <div>{{ row.price }}</div>
          </template>
        </el-table-column>
        <el-table-column label="小计">
          <template slot-scope="{ row }">
            <div>{{ row.price * row.number }}</div>
          </template>
        </el-table-column>
      </el-table>
      <el-divider content-position="left">快递配送</el-divider>
      <el-form :inline="true" :model="form" size="small" label-width="80">
        <el-form-item label="快递单号">
          <el-input v-model="form.ship_sn"></el-input>
        </el-form-item>
        <el-form-item label="选择物流">
          <el-select
            :clearable="true"
            value-key="value"
            placeholder="请选择"
            size="small"
            v-model="form.ship_channel"
          >
            <el-option
              :key="item.value"
              :label="item.text"
              :value="item.value"
              v-for="item in deliveryOptions"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="this.visible = false">取 消</el-button>
        <el-button type="primary" @click="deliveryOrder" :loading="loading">
          提交
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
  import { deliveryOrder, getOrderDetail } from '@/api/order'
  export default {
    name: 'OrderDeliveryDrawer',
    data() {
      return {
        tableLoading: false,
        loading: false,
        visible: false,
        order: {
          ship_channel: 0,
        },
        deliveryOptions: [
          { text: '圆通', value: 'yuantong' },
          { text: '顺丰', value: 'shunfeng' },
          { text: '中通', value: 'zhongtong' },
        ],
        form: {},
      }
    },
    watch: {},
    methods: {
      async open(id) {
        this.tableLoading = true
        this.visible = true
        const data = await getOrderDetail(id) //订单详情
        this.order = { id, ...data }
        this.tableLoading = false
      },
      // 发货
      async deliveryOrder() {
        this.loading = true
        const data = this.form
        await deliveryOrder([{ ...data, id: this.order.id }])
        this.loading = false
        this.visible = false
        this.$emit('isDelivery')
      },
    },
  }
</script>

<style></style>
