<!--其他配置-->
<template>
  <div id="otherConfig">
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
          <div class="from-input">
            {{ item.value }}
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
    name: 'otherConfig',
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
        // 热门搜索
        hot_keyword: [],
      }
    },
    methods: {
      // 获取赠送积分参数
      async reqGetData() {
        // let hot_keyword = hot_search('hot_search', 'hot_keyword') // 订单待付款多久取消
      },
      // 修改积分参数
      reqUpdateData(name, value) {
        updateConfigData('trading', name, value).then((response) => {
          this.$message({
            type: 'success',
            message: '修改成功',
            duration: 1000,
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
  #otherConfig {
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
        .from-input {
          width: 160px;
          padding: 0 20px;
          line-height: 32px;
          border: #dcdfe6 1px solid;
        }
      }
    }
    .dialog {
      display: flex;
      justify-content: center;
      .title {
        line-height: 32px;
      }
    }
  }
</style>
