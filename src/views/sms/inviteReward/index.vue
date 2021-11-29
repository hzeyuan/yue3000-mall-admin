<template>
  <div id="inviteReward">
    <el-card>
      <div class="top-box">
        <div class="text-title" @click="topOpen=!topOpen">
          <i class="el-icon-arrow-right" v-show="topOpen"></i>
          <i class="el-icon-arrow-down" v-show="!topOpen"></i>
          <span>操作提示</span>
        </div>
        <div class="text-span" v-show="!topOpen">
          <p>*设置会员邀请的奖励规则。</p>
        </div>
      </div>
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label="邀请奖励积分：">
            <el-input v-model.number="form.integral"
                      oninput="value=Number(value.replace(/[^0-9.]/g,''))"></el-input>
          </el-form-item>
          <el-form-item style="text-align: left">
            <el-button type="primary" size="medium" @click="onButton">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getConfigData, updateConfigData} from "@/api/smsApi/orderReward";

export default {
  name: "inviteReward",
  data () {
    return {
      form: {
        integral: 0,
      },
      topOpen: false
    }
  },
  methods: {
    // 获取奖励积分参数
    async reqGetData () {
      const res = await getConfigData('MarketingConfig','invited_award_integral')
      this.form.integral = res.value
    },
    // 修改积分参数
    reqUpdateData (data) {
      updateConfigData('MarketingConfig', 'invited_award_integral', data).then((response) => {
        this.$message({
          type: "success",
          message: "修改成功",
          duration: 1000,
        });
      });
    },
    // 点击确认按钮
    onButton () {
      this.$confirm("是否要修改该参数", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.reqUpdateData(this.form.integral)
      });
    }
  },
  mounted() {
  this.reqGetData()
}
}
</script>

<style lang="scss" scoped>
#inviteReward{
  padding: 20px;
  .top-box{
    border: #e6e6e6 1px dashed;
    margin-bottom: 30px;
    .text-title{
      padding-left: 20px;
      line-height: 36px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }
    .text-title:hover{
      color: #1e6abc;
    }
    .text-span{
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
  .form-box{
    margin: 30px;
    width: 400px;
    height: 200px;
  }
}
</style>
