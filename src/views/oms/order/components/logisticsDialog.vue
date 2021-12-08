<template>
  <el-dialog
    title="订单跟踪"
    :visible.sync="visible"
    :before-close="handleClose"
    width="40%"
  >
    <el-steps
      direction="vertical"
      :active="active"
      finish-status="success"
      space="50px"
    >
      <el-step
        v-for="item in orderTraces"
        :key="item.AcceptStation"
        :title="item.AcceptStation"
        :description="item.AcceptTime"
      ></el-step>
    </el-steps>
  </el-dialog>
</template>
<script>
  export default {
    name: 'logisticsDialog',
    props: {
      value: Boolean,
      orderTraces: {
        type: Array,
        default() {
          return []
        },
      },
    },

    computed: {
      visible: {
        get() {
          return this.value
        },
        set(visible) {
          this.value = visible
        },
      },
      active() {
        if (!this.orderTraces) return
        console.log('active', this.orderTraces.length - 1)
        return this.orderTraces.length - 1
      },
    },
    data() {
      return {
        logisticsList: Object.assign({}, this.orderTraces),
      }
    },
    methods: {
      emitInput(val) {
        this.$emit('input', val)
      },
      handleClose() {
        this.emitInput(false)
      },
    },
  }
</script>
<style></style>
