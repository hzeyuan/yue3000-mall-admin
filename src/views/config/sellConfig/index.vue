<!--奖励配置-->
<template>
  <div id="sellConfig">
    <el-card>
      <div class="top-box">
        <div class="text-title" @click="topOpen=!topOpen">
          <i class="el-icon-arrow-right" v-show="topOpen"></i>
          <i class="el-icon-arrow-down" v-show="!topOpen"></i>
          <span>操作提示</span>
        </div>
        <div class="text-span" v-show="!topOpen">
          <p>*设置会员下单赠送的积分和成长值</p>
          <p>*设置会员注册时赠送的相关奖励</p>
          <p>*设置会员邀请注册时的奖励</p>
        </div>
      </div>
      <div class="form-box">
        <div class="form-item" v-for="(item, index) in data" :key="index">
          <div class="from-label">
            <span>{{ item.title }}：</span>
          </div>
          <div class="from-input" v-if="index!==3">
            <el-input v-model="item.value" placeholder="请输入内容" style="width: 180px"></el-input>
          </div>
          <div class="from-input" v-else>
            <el-select v-model="item.value" placeholder="请选择优惠卷">
              <el-option
                v-for="coupon in couponList"
                :key="coupon.id"
                :label="coupon.label"
                :value="coupon.value">
              </el-option>
            </el-select>
          </div>
          <div class="from-button">
            <el-button type="primary" @click="onButtonRevise(item)">修 改</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getConfigData, updateConfigData} from "@/api/config";

export default {
  name: "sellConfig",
  data () {
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
      data: [
        {
          name: 'orderAwardConfig',
          title: '每日首单额外赠送积分',
          value: 0,
        },
        {
          name: 'invited_award_integral',
          title: '邀请送积分',
          value: 0,
        },
        {
          name: 'register_award_integral',
          title: '注册送积分',
          value: 0,
        },
        {
          name: 'register_award_coupon',
          title: '注册送优惠卷',
          value: 0,
        },
      ],
      couponList: [
        {
          id: 3,
          label: '店铺满减',
          value: '3',
        },
      ],// 优惠卷列表 后期使用网络请求刷新

    }
  },
  mounted() {
    this.reqGetData()
  },
  methods: {
    // 获取赠送积分参数
    async reqGetData () {
      let orderAwardConfig = getConfigData('MarketingConfig','orderAwardConfig') // 订单奖励积分
      let invited_award_integral = getConfigData('MarketingConfig','invited_award_integral') // 邀请奖励积分
      let register_award_integral = getConfigData('MarketingConfig','register_award_integral') //注册奖励积分
      let register_award_coupon = getConfigData('MarketingConfig','register_award_coupon')  //注册奖励优惠卷
      const res = await Promise.all([orderAwardConfig, invited_award_integral, register_award_integral, register_award_coupon])
      this.data.forEach((item,index) => {
        item.value = res[index].value
      })
    },
    // 修改积分参数
    reqUpdateData (name, value) {
      updateConfigData('MarketingConfig', name, value).then((response) => {
        this.dialogShow = false
        this.$message({
          type: "success",
          message: "修改成功",
          duration: 1000,
        });
        this.data.forEach(item => {
          if (item.name === name) {
            item.value = value
          }
        })
      });
    },
    // 点击修改按钮
    onButtonRevise (item) {
      this.$confirm("是否要修改该参数", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.reqUpdateData(item.name, item.value).then( ()=>{
          this.$message({
            type: "success",
            message: "修改成功",
            duration: 1000,
          });
        })
      });
      // const {title, name, value } = item
      // this.dialogTitle = title
      // this.dialogName = name
      // this.dialogValue = value
      // this.dialogShow = true
    },
  },
};
</script>

<style lang="scss" scoped>
#sellConfig{
  //padding: 20px;
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
    .form-item{
      display: flex;
      justify-content: space-between;
      width: 480px;
      margin: 20px auto;
      .from-label{
        width: 180px;
        text-align: right;
        line-height: 32px;
        font-size: 16px;
      }
      .from-input{
        padding: 0 20px;
        line-height: 32px;
      }
    }
  }
  .dialog{
    display: flex;
    justify-content: center;
    .title{
      line-height: 32px;
    }
  }
}

</style>
