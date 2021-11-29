<template>
  <div id="registerAward">
    <el-card>
      <div class="top-box">
        <div class="text-title" @click="topOpen=!topOpen">
          <i class="el-icon-arrow-right" v-show="topOpen"></i>
          <i class="el-icon-arrow-down" v-show="!topOpen"></i>
          <span>操作提示</span>
        </div>
        <div class="text-span" v-show="!topOpen">
          <p>*设置会员注册的奖励规则</p>
        </div>
      </div>
      <div class="body-box">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="会员注册奖励积分：">
            <el-input v-model.number="form.integral"
                      oninput="value=Number(value.replace(/[^0-9.]/g,''))"></el-input>
          </el-form-item>
          <el-form-item label="会员注册赠送优惠券红包：">
            <el-select v-model="form.coupon" multiple placeholder="请选择" style="width: 400px">
              <el-option
                v-for="item in couponList"
                :key="form.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
  name: "registerAward",
  data () {
    return{
      // 表单数据
      form: {
        // 注册赠送积分 0表示不赠送积分 不可为负
        integral: 0,
        // 注册赠送优惠卷 优惠卷有多个 处理成逗号分割的字符串
        coupon: []
      },
      // 优惠卷列表
      couponList: [
        {
          id: 1,
          name: '新人优惠',
        },
        {
          id: 2,
          name: '满减优惠',
        },
        {
          id: 3,
          name: '5元无门槛红包'
        },
        {
          id: 4,
          name: '水果优惠'
        }
      ],
      // 操作提示的展开与合并
      topOpen: false,
    }
  },
  methods: {
    // 获取系统配置参数
    async reqGetData () {
      // 注册送积分参数
      let integral = getConfigData('MarketingConfig','register_award_integral')
      // 注册送优惠卷参数
      let coupon = getConfigData('MarketingConfig','register_award_coupon')
      const res = await Promise.all([integral, coupon])
      this.form.integral = res[0].value
      this.form.coupon = res[1].value.split(",").map(Number)
    },
    // 修改积分参数
    reqUpdateData () {
      let integral = updateConfigData('MarketingConfig','register_award_integral',this.form.integral)
      let coupon = updateConfigData('MarketingConfig','register_award_coupon',this.form.coupon.join(','))
      Promise.all([integral, coupon]).then((response) => {
        this.$message({
          type: "success",
          message: "修改成功",
          duration: 1000,
        });
      });
    },
    // 点击确认按钮
    onButton () {
      console.log('coupon', this.form.coupon)
      this.$confirm("是否要修改该参数", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.reqUpdateData()
      });
    }
  },
  mounted() {
    this.reqGetData()
  }
}
</script>

<style lang="scss" scoped>
 #registerAward{
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
   .body-box{
     margin: 30px;
     height: 400px;
     width: 600px;
   }
 }
</style>
