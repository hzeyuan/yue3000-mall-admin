<template>
  <div class="app-container">
    <!--    左侧-->
    <div class="main-column">
      <!--      代办事项-->
      <el-card class="card">
        <div class="top">
          <div class="title">
            <p>待办事项清单</p>
            <span>您的待处理事项</span>
          </div>
        </div>
        <div class="status">
          <div class="to-do-box" v-for="(item, index) in upcomingMatter" :key="index">
            <div class="item-quantity">{{item.quantity}}</div>
            <div class="item-title">{{item.title}}</div>
          </div>
        </div>
      </el-card>
      <!--      数据中心-->
      <el-card class="card">
        <div class="top">
          <div class="title">
            <p>卖家数据中心 <span>(显示资料至 GMT+8 21:00)</span></p>
            <span>可出货订单数量数据概述</span>
          </div>
          <div class="more">
            <span>更多</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="offset">
          <div class="nev">
            <div id="chart-box" class="chart-box">
            </div>
          </div>
          <div class="nev">
            <div class="list-box">
              <div class="nev-item">
                <div class="item">
                  <div class="item-title">
                    <p>不重复访客数量：<i class="el-icon-star-off icon"></i></p>
                    <p>4</p>
                  </div>
                  <div class="item-compare">
                    <div class="text-overflow">和昨天比：</div>
                    <div class="text-number">60.00%</div>
                    <div class="text-icon"><img src="../../assets/images/xiangshang.png" alt=""></div>
                  </div>
                </div>
                <div class="item">
                  <div class="item-title">
                    <p>页面浏览数量：<i class="el-icon-star-off icon"></i></p>
                    <p>4</p>
                  </div>
                  <div class="item-compare">
                    <div class="text-overflow">和昨天比：</div>
                    <div class="text-number">60.00%</div>
                    <div class="text-icon"><img src="../../assets/images/xiangxia.png" alt=""></div>
                  </div>
                </div>
              </div>
              <el-divider></el-divider>
              <div class="nev-item">
                <div class="item">
                  <div class="item-title">
                    <p style="margin-top: 0">订单：<i class="el-icon-star-off icon"></i></p>
                    <p>4</p>
                  </div>
                  <div class="item-compare">
                    <div class="text-overflow">和昨天比：</div>
                    <div class="text-number">60.00%</div>
                    <div class="text-icon"><img src="../../assets/images/xiangxia.png" alt=""></div>
                  </div>
                </div>
                <div class="item">
                  <div class="item-title">
                    <p style="margin-top: 0">下单转换率：<i class="el-icon-star-off icon"></i></p>
                    <p>4</p>
                  </div>
                  <div class="item-compare">
                    <div class="text-overflow">和昨天比：</div>
                    <div class="text-number">60.00%</div>
                    <div class="text-icon"><img src="../../assets/images/xiangxia.png" alt=""></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!--    右侧-->
    <div class="aside-column">
      <el-card class="card-notify">
        <div class="top">
          <div class="title">
            <p>商城公告</p>
          </div>
          <div class="more">
            <span>更多<i class="el-icon-arrow-right"></i></span>
          </div>
        </div>
        <div class="notify-box">
          <div class="notify">
            <div class="image">
              <img src="../../assets/images/redu.png" alt="">
            </div>
            <div class="text">
              <div class="content">
                <span>海外仓定价模拟器来啦~~</span>
                <p>还在手算仓储费操作费？海外仓卖家也可以享受一键定价的快乐啦！点击查看详情。</p>
              </div>
              <div class="date">
                <span style="color: #ee4d2d">新通知</span>
                <span style="color: #999">·</span>
                <span style="color: #999">2021年11月19日</span>
              </div>
            </div>
          </div>
          <div class="notify">
            <div class="image">
              <img src="../../assets/images/redu.png" alt="">
            </div>
            <div class="text">
              <div class="content">
                <span>海外仓定价模拟器来啦~~</span>
                <p>还在手算仓储费操作费？海外仓卖家也可以享受一键定价的快乐啦！点击查看详情。</p>
              </div>
              <div class="date">
                <span style="color: #ee4d2d">新通知</span>
                <span style="color: #999">·</span>
                <span style="color: #999">2021年11月19日</span>
              </div>
            </div>
          </div>
          <div class="notify">
            <div class="image">
              <img src="../../assets/images/redu.png" alt="">
            </div>
            <div class="text">
              <div class="content">
                <span>海外仓定价模拟器来啦~~</span>
                <p>还在手算仓储费操作费？海外仓卖家也可以享受一键定价的快乐啦！点击查看详情。</p>
              </div>
              <div class="date">
                <span style="color: #ee4d2d">新通知</span>
                <span style="color: #999">·</span>
                <span style="color: #999">2021年11月19日</span>
              </div>
            </div>
          </div>
          <div class="notify">
            <div class="image">
              <img src="../../assets/images/redu.png" alt="">
            </div>
            <div class="text">
              <div class="content">
                <span>海外仓定价模拟器来啦~~</span>
                <p>还在手算仓储费操作费？海外仓卖家也可以享受一键定价的快乐啦！点击查看详情。</p>
              </div>
              <div class="date">
                <span style="color: #ee4d2d">新通知</span>
                <span style="color: #999">·</span>
                <span style="color: #999">2021年11月19日</span>
              </div>
            </div>
          </div>
          <div class="notify">
            <div class="image">
              <img src="../../assets/images/redu.png" alt="">
            </div>
            <div class="text">
              <div class="content">
                <span>海外仓定价模拟器来啦~~</span>
                <p>还在手算仓储费操作费？海外仓卖家也可以享受一键定价的快乐啦！点击查看详情。</p>
              </div>
              <div class="date">
                <span style="color: #ee4d2d">新通知</span>
                <span style="color: #999">·</span>
                <span style="color: #999">2021年11月19日</span>
              </div>
            </div>
          </div>
          <div class="notify">
            <div class="image">
              <img src="../../assets/images/redu.png" alt="">
            </div>
            <div class="text">
              <div class="content">
                <span>海外仓定价模拟器来啦~~</span>
                <p>还在手算仓储费操作费？海外仓卖家也可以享受一键定价的快乐啦！点击查看详情。</p>
              </div>
              <div class="date">
                <span style="color: #ee4d2d">新通知</span>
                <span style="color: #999">·</span>
                <span style="color: #999">2021年11月19日</span>
              </div>
            </div>
          </div>
          <div class="notify">
            <div class="image">
              <img src="../../assets/images/redu.png" alt="">
            </div>
            <div class="text">
              <div class="content">
                <span>海外仓定价模拟器来啦~~</span>
                <p>还在手算仓储费操作费？海外仓卖家也可以享受一键定价的快乐啦！点击查看详情。</p>
              </div>
              <div class="date">
                <span style="color: #ee4d2d">新通知</span>
                <span style="color: #999">·</span>
                <span style="color: #999">2021年11月19日</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {timeLeftZero} from '@/utils/date';
import {getDashboard} from '@/api/home.js'
import echarts from 'echarts'

export default {
  name: 'home',
  data() {
    return {
      upcomingMatter: [
        {
          title: '待付款订单1',
          quantity: 0,
          path: ''
        },
        {
          title: '待付款订单2',
          quantity: 0,
          path: ''
        },
        {
          title: '待付款订单3',
          quantity: 0,
          path: ''
        },
        {
          title: '待付款订单',
          quantity: 0,
          path: ''
        },
        {
          title: '待付款订单',
          quantity: 0,
          path: ''
        },
        {
          title: '待付款订单',
          quantity: 0,
          path: ''
        },
        {
          title: '待付款订单',
          quantity: 0,
          path: ''
        },
        {
          title: '待付款订单',
          quantity: 0,
          path: ''
        }
      ],
      // Echarts参数
      EchartsData: {
        date: [
          [1637898013000, 200],
          [1637908813000, 100],
          [1637923213000, 400],
          [1637930413000, 300],
          [1637941213000, 300]
        ], // 图像数据
        time24: [] //完成24小时制间隔
      },
    }
  },
  methods:{
    // 获取图表数据
    async reqGetDashboard () {
      const res = await getDashboard()
      this.funInitDate(res.toadyOrderSales.orderPricePerTime)
    },
    // 初始化时间轴虚拟数据
    funInitTime24(){
      let time24 = []
      let my_time = new Date()
      my_time = `${my_time.getFullYear()}/${my_time.getMonth() + 1}/${my_time.getDate()} 00:00:00`
      my_time = (new Date(my_time)).getTime()
      for(let i = 0; i < 5 ;i++){
        time24.push([my_time, ''])
        my_time = my_time + (6*60*60*1000)
        if (i == 3) my_time = my_time -1000
      }
      console.log('date', time24)
      this.EchartsData.time24 = time24
    },
    // 初始化图表数据
    funInitDate(orderPricePerTime){
      let data = []
      const value = Object.values(orderPricePerTime)
      const time = Object.keys(orderPricePerTime)
      for (let i = 0; i < time.length; i++){
        data.push([parseInt(time[i]),value[i]])
      }
      this.EchartsData.date =  data
      this.initEcharts()
    },
    // 初始化图表
    initEcharts () {
      const chart = echarts.init(document.getElementById('chart-box'))
      const option = {
        grid: {
          x: 17,
          y: 20,
          x2: 15,
          y2: 20,
        },
        xAxis: {
          type: 'time',
          // splitNumber: 10,
          axisLabel:{
            show:true,
            showMaxLabel:true,
            showMinLabel:true,
            formatter: function (value, index){
              let date = new Date(value)
              return `${timeLeftZero(date.getHours())}:${timeLeftZero(date.getMinutes())}`
            }
          },
          splitLine:{show: false},
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show:false,
          },
          splitLine:{show: false},
        },
        series: [
          {//真实数据
            data: this.EchartsData.date,
            type: 'line',
            smooth: true,
            tooltip: {
              trigger: 'axis'
            }
          },
          {// 假数据用于展开X轴
            data: this.EchartsData.time24,
            type: 'line',
          },
        ]
      }
      chart.setOption(option)
    },
  },
  mounted() {
    this.reqGetDashboard()
    this.funInitTime24()
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  .main-column{
    margin-right: 20px;
    .card{
      width: 800px;
      margin-bottom: 10px;
    }
  }
  .aside-column{
    width: 320px;
  }
}

.top{
  overflow: hidden;
  .title{
    width: 60%;
    float: left;
    p{
      margin: 6px 0;
      font-size: 18px;
      color: #333;
      font-weight: bold;
    }
    span{
      margin-top: 6px;
      font-size: 12px;
      font-weight: 400;
      color: #999;
    }
  }
  .more{
    float: right;
    color: #2673dd;
    cursor: pointer;
    line-height: 18px;
    font-size: 14px;
  }
  .more:hover{
    opacity: 0.7;
  }
}

.status{
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .to-do-box{
    padding: 8px 0 8px 0;
    margin-bottom: 16px;
    width: 189px;
    cursor: pointer;
    border-right: #e5e5e5 1px solid;
    .item-quantity{
      margin-bottom: 7px;
      font-size: 16px;
      min-height: 18px;
      color: #2673dd;
      text-align: center;
    }
    .item-title{
      font-size: 12px;
      color: #333;
      max-height: 42px;
      overflow: hidden;
      padding: 0 12px;
      text-align: center;
    }
  }
  //.to-do-box:after{
  //  content: "";
  //  width: 3px;
  //  height: 35px;
  //  background-color: #b84545;
  //  position: absolute;
  //  top: 50%;
  //  right: 0;
  //  margin-top: -18px;
  //}
  .to-do-box:hover{
    background-color: #f6f6f6;
  }
  .to-do-box:nth-child(4n){
    border-right: none;
  }
}

.offset{
  display: flex;
  .nev{
    display: block;
    flex: 1;
  }
  .nev-flex{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.chart-title{
  margin-top: 5px;
  .p-title{
    line-height: 16px;
    font-size: 12px;
    color: #666;
    margin: 15px 0 0 0;
  }
  .p-subtitle{
    line-height: 24px;
    font-weight: bold;
    font-size: 14px;
    color: #333;
    margin: 0 0 15px 0;
  }
}

.chart-box{
  height: 220px;
}

.list-box{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .nev-item{
    display: flex;
    justify-content: space-around;
  }
}

.item{
  padding: 0 15px;
  margin-top: 5px;
  .item-title{
    p{
      margin: 15px 0 0 0;
      line-height: 16px;
      font-size: 12px;
      color: #666;
    }
    p:nth-child(2){
      line-height: 24px;
      font-size: 20px;
      font-weight: bold;
      color: #333;
      margin: 8px 0;
    }
  }
  .item-compare{
    display: flex;
    div{
      font-size: 12px;
      color: #999;
      line-height: 14px;
    }
    .text-icon{
      width: 14px;
    }
  }
}

.notify-box{
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 15px;
  .notify{
    margin-bottom: 15px;
    display: flex;
    align-items: stretch;
    .image{
      padding-top: 10px;
      width: 24px;
      img{
        width: 14px;
      }
    }
    .text{
      flex: 1;
      padding: 10px 20px 5px 0;
      .content{
        color: #333;
        cursor: pointer;
      }
      .content:hover{
        color: #1e6abc;
      }
      span{
        font-size: 14px;
        font-weight: bold;
      }
      p{
        margin: 8px 0 8px 0;
        line-height: 18px;
        font-size: 14px;
        opacity: 0.6;
      }
      .date{
        margin-top: 6px;
        span{
          font-size: 12px;
        }
      }
    }
  }
}

</style>
