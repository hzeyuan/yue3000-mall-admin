<template>
  <el-drawer :visible.sync="visible" title="订单物流" direction="rtl">
    <div style="padding: 0 40px; width: 100%">
      <el-divider content-position="left">收货信息</el-divider>
      <el-descriptions direction="vertical">
        <el-descriptions-item label="收货人">
          <!-- {{ order.receiver }} -->
        </el-descriptions-item>
        <el-descriptions-item label="手机号">
          {{ orderTraces.take.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="收货地址">
          {{ orderTraces.take.address }}
        </el-descriptions-item>
      </el-descriptions>
      <el-divider content-position="left">订单信息</el-divider>
      <el-descriptions direction="vertical">
        <el-descriptions-item label="物流公司">
          {{ orderTraces.order.ship_channel }}
        </el-descriptions-item>
        <el-descriptions-item label="物流编号">
          {{ orderTraces.order.ship_sn }}
        </el-descriptions-item>
      </el-descriptions>
      <!-- :active="active" -->
      <el-divider content-position="left">物流跟踪</el-divider>
      <el-steps direction="vertical" finish-status="success" space="50px">
        <el-step
          v-for="item in orderTraces.traces"
          :key="item.AcceptStation"
          :title="item.AcceptStation"
          :description="item.AcceptTime"
        ></el-step>
      </el-steps>
    </div>
  </el-drawer>
</template>

<script>
  import { getOrderTraces } from '@/api/order'
  export default {
    name: 'OrderTracesDrawer',
    data() {
      return {
        visible: false,
        orderTraces: {
          traces: [],
          take: {
            phone: '',
            address: '',
          },
          order: {
            ship_channel: '',
            ship_sn: '',
          },
        },
      }
    },
    watch: {},
    methods: {
      async open(id) {
        this.visible = true
        const data = await getOrderTraces(id) //订单详情
        this.orderTraces = data
        const traces = []
        if (data.bought) {
          traces.push({
            AcceptStation: data.bought.tips,
            AcceptTime: data.bought.time,
          })
        }
        if (data.shipped) {
          traces.push({
            AcceptStation: data.shipped.tips,
            AcceptTime: data.shipped.time,
          })
        }
        if (data.traces) {
          this.orderTraces['traces'] = [...traces, data.traces]
        } else {
          this.orderTraces['traces'] = traces
        }
      },
    },
  }
</script>

<style></style>
