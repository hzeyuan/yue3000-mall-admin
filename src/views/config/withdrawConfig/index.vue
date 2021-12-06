<!--提现配置-->
<template>
  <div id="withdrawConfig">
    <el-card>
      <div class="top-box">
        <div class="text-title" @click="topOpen = !topOpen">
          <i class="el-icon-arrow-right" v-show="topOpen"></i>
          <i class="el-icon-arrow-down" v-show="!topOpen"></i>
          <span>操作提示</span>
        </div>
        <div class="text-span" v-show="!topOpen">
          <p>*设置订单后台脚本服务配置</p>
        </div>
      </div>
      <div class="form-box">
        <div class="form-item" v-for="(item, index) in data" :key="index">
          <div class="from-label">
            <span>{{ item.title }}：</span>
          </div>
          <div>
            <el-input v-model="item.value" placeholder="请输入内容"></el-input>
          </div>
          <div class="from-button">
            <el-button
              type="primary"
              @click="reqUpdateData(item.name, item.value)"
            >
              修 改
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { getConfigData, updateConfigData } from '@/api/config'

  export default {
    name: 'withdrawConfig',
    data() {
      return {
        // 头部提示框的展开可和合并
        topOpen: false,
        // 对话框的显示与隐藏
        dialogShow: false,
        // 对话框参数标题
        dialogTitle: '',
        // 对话框值
        dialogValue: '',
        // 对话框值的key
        dialogName: '',
        // 数值类型配置
        data: [
          {
            name: 'min_withdraw',
            title: '最低提现金额',
            value: 0,
          },
          {
            name: 'max_withdraw',
            title: '最高提现金额',
            value: 0,
          },
          {
            name: 'poundage_percent',
            title: '提现手续费',
            value: 0,
          },
        ],
        // 特殊配置 类型为数组 提现方式
        withdrawType: {},
      }
    },
    methods: {
      // 获取赠送积分参数
      async reqGetData() {
        let min_withdraw = getConfigData('withdraw', 'min_withdraw') // 最小提现
        let max_withdraw = getConfigData('withdraw', 'max_withdraw') //最大提现
        let poundage_percent = getConfigData('withdraw', 'poundage_percent') //提现手续费
        let type = getConfigData('withdraw', 'type') //提现方式
        const res = await Promise.all([
          min_withdraw,
          max_withdraw,
          poundage_percent,
          type,
        ])
        this.data.forEach((item, index) => {
          item.value = res[index].value
        })
        this.withdrawType = res[4]
      },
      // 修改积分参数
      reqUpdateData(name, value) {
        updateConfigData('withdraw', name, value).then((response) => {
          this.dialogShow = false
          this.$message({
            type: 'success',
            message: '修改成功',
            duration: 1000,
          })
          this.data.forEach((item) => {
            if (item.name === name) {
              item.value = value
            }
          })
        })
      },
    },
    mounted() {
      this.reqGetData()
    },
  }
</script>

<style lang="scss" scoped>
  #withdrawConfig {
    .top-box {
      border: #e6e6e6 1px dashed;
      margin-bottom: 30px;
      .text-title {
        padding-left: 20px;
        line-height: 36px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
      }
      .text-title:hover {
        color: #1e6abc;
      }
      .text-span {
        padding: 10px;
        border-top: #e6e6e6 1px solid;
        font-size: 14px;
        line-height: 22px;
        color: #666;
        p {
          padding: 0;
          margin: 0;
        }
      }
    }
    .form-box {
      .form-item {
        display: flex;
        justify-content: space-between;
        width: 580px;
        margin: 20px auto;
        .from-label {
          width: 260px;
          text-align: right;
          line-height: 32px;
          font-size: 16px;
        }
      }
    }
  }
</style>
