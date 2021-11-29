<template>
  <div id="signDaily">
    <el-card>
      <div class="top-box">
        <div class="text-title" @click="topOpen=!topOpen">
          <i class="el-icon-arrow-right" v-show="topOpen"></i>
          <i class="el-icon-arrow-down" v-show="!topOpen"></i>
          <span>操作提示</span>
        </div>
        <div class="text-span" v-show="!topOpen">
          <p>*用户每天签到一次可获得每天签到奖励，包括积分和成长值。</p>

          <p>*点击新增连续签到奖励可以设置满足连续签到天数时的额外奖励，连续天数规则不能重复。</p>

          <p>*用户签到中断会重新计算连续天数；超过设置的最大连续签到奖励天数后，也会重新计算连续天数，循环发放连续奖励。</p>
        </div>
      </div>
      <div class="body-box">
        <div class="menu-title">
          <div class="menu-item" :class='{show: menuShow === 1}' @click="menuShow = 1">签到设置</div>
          <div class="menu-item" :class='{show: menuShow === 2}' @click="menuShow = 2">签到记录</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "sign_daily",
  data () {
    return {
      topOpen: false,
      menuShow: 1,
    }
  },
}
</script>

<style lang="scss" scoped>
#signDaily{
  padding: 20px;
  .top-box{
    border: #e6e6e6 1px dashed;
    margin-bottom: 30px;
    .text-title{
      padding-left: 20px;
      line-height: 36px;
      font-size: 16px;
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
    .menu-title{
      overflow: hidden;
      padding: 2px 0 0 2px;
      background-color: #f2f2f2;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      .menu-item{
        float: left;
        cursor: pointer;
        height: 40px;
        padding: 0 15px;
        text-align: center;
        line-height: 40px;
        color: #666;
        font-size: 14px;
      }
    }
    .show{
      font-weight: bold;
      background-color: #fff;
      color: #000;
    }
  }
}
</style>
