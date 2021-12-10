<template>
  <div id="PrizeTable">
    <div class="add">
      <el-button size="small" type="primary" @click="onAddDialog">新增奖品</el-button>
    </div>
    <div class="table-container">
      <el-table :data="LotteryPrizeList" v-loading="tableLoading">
        <el-table-column label="序号" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="奖品名称" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="奖品类型" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.prize_type | prizeType }}
          </template>
        </el-table-column>
        <el-table-column label="剩余数量" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.number }}
          </template>
        </el-table-column>
        <el-table-column label="奖品概率" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.probability }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="onUpdateDialog(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="onDeletePrize(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :current-page="pageData.page"
                     :total="pageData.total" :page-size="10" @prev-click="getLotteryPrizeList"
                     hide-on-single-page @next-click="getLotteryPrizeList" @current-change="getLotteryPrizeList">
      </el-pagination>
    </div>

    <el-dialog width="30%" title="奖品详情" :visible.sync="DialogShow">
      <div>
        <el-form ref="ref-prize-from" :model="prizeData" :rules="rules" label-width="100px">
          <el-form-item label="奖品名称" prop="name">
            <el-input v-model="prizeData.name"></el-input>
          </el-form-item>
          <el-form-item label="奖品概率" prop="probability">
            <el-input v-model="prizeData.probability"></el-input>
          </el-form-item>
          <el-form-item label="奖品数量">
            <el-input v-model.number="prizeData.number"
                      oninput="value=Number(value.replace(/[^0-9.]/g,''))"></el-input>
          </el-form-item>
          <el-form-item label="奖品图片">
            <IconUpload v-if="DialogShow" :icon="prizeData.image_url" ref="IconUpload"></IconUpload>
          </el-form-item>
          <el-form-item label="奖品类型">
            <el-select v-model="prizeData.prize_type" placeholder="请选择奖品类型" @change="handlePrizeTypeVary">
              <el-option
                v-for="item in prizeTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="prizeData.prize_type === 1" label="积分值">
            <el-input v-model.number="prizeData.value"
                      oninput="value=Number(value.replace(/[^0-9.]/g,''))"></el-input>
          </el-form-item>
          <el-form-item v-if="prizeData.prize_type === 2" label="优惠卷" prop="value">
            <el-select v-model="prizeData.value" placeholder="请选择优惠卷" @focus="handlePrizeCoupons">
              <el-option
                v-for="item in couponList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="DialogShow = !DialogShow">取 消</el-button>
          <el-button type="primary" v-if="prizeData.id" @click="onUpdatePrize()">修 改</el-button>
          <el-button type="primary" v-else @click="onAddPrize">添 加</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import IconUpload from "@/components/Upload/IconUpload";
import {getLotteryCoupons} from "@/api/coupons";

import {deleteLotteryActivityPrize, getLotteryPrizeList, updateLotteryActivityPrize} from "@/api/config/lottery";
import _ from "lodash";

export default {
  name: "PrizeTable",
  components: {
    IconUpload
  },
  data() {
    return {
      LotteryPrizeList: [],//奖品列表
      tableLoading: false,//表格加载框
      pageData: {
        page: 1,
        total: 0
      },//表格分页数据
      prizeData: {},//单个奖品信息
      rules: {
        name: {required: true, message: '该项不能为空', trigger: 'blur'},
        probability: {required: true, message: '该项不能为空', trigger: 'blur'},
        value: {required: true, message: '请选择优惠卷', trigger: 'blur'}
      },//表单验证
      DialogShow: false,//对话框状态
      couponList: [],// 优惠卷列表 后期使用网络请求刷新
      prizeTypeList: [
        {
          id: 1,
          label: '积分',
          value: 1
        },
        {
          id: 2,
          label: '优惠卷',
          value: 2
        },
        {
          id: 3,
          label: '谢谢惠顾',
          value: 3
        }
      ],//奖品类型列表
    }
  },
  filters: {
    prizeType(value) {
      if (value === 1) {
        return '积分奖励'
      } else if (value === 2) {
        return '奖励优惠卷'
      } else if (value === 3) {
        return '谢谢惠顾'
      }
    },
  },
  mounted() {
    this.getLotteryPrizeList(1)
  },
  methods: {
    // 获取奖品列表
    async getLotteryPrizeList(page) {
      this.tableLoading = true
      const res = await getLotteryPrizeList(page)
      this.LotteryPrizeList = res.list
      // this.pageData.total = res.pagination.rowCount
      this.tableLoading = false
    },
    // 点击打开修改对话框
    onUpdateDialog(Prize) {
      this.prizeData = _.cloneDeep(Prize)
      this.DialogShow = true
    },
    // 点击打开添加对话框
    onAddDialog() {
      this.prizeData = {
        name: '',
        prize_type: '',   //奖品类型 1表示积分 2表示优惠卷 3表示谢谢惠顾
        number: '',     //奖品数量
        probability: '', //抽奖概率
        value: '',        //奖品值
        image_url: '',  //奖品图片
      }
      this.DialogShow = true
    },
    // 点击删除奖品
    onDeletePrize(id) {
      this.$confirm("是否要删除该奖品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteLotteryActivityPrize(id).then((res) => {
          this.$message({
            type: "success",
            message: "删除成功",
            duration: 1000,
          })
          this.getLotteryPrizeList(this.pageData.page)
        })
      });
    },
    // 点击添加奖品
    onAddPrize() {
      this.$refs['ref-prize-from'].validate((valid) => {
        if (!valid) return false
        let data = _.cloneDeep(this.prizeData)
        data.image_url = this.$refs.IconUpload.gallery
        addLotteryActivityPrize(this.prizeData.id, data).then((res) => {
          this.$message({
            type: "success",
            message: "添加成功",
            duration: 1000,
          })
          this.DialogShow = false
          this.getLotteryPrizeList(this.pageData.page)
        })
      })
    },
    // 点击修改奖品
    onUpdatePrize() {
      this.$refs['ref-prize-from'].validate((valid) => {
        if (!valid) return false
        let data = _.cloneDeep(this.prizeData)
        data.image_url = this.$refs.IconUpload.gallery
        updateLotteryActivityPrize(this.prizeData.id, data).then((res) => {
          this.$message({
            type: "success",
            message: "修改成功",
            duration: 1000,
          })
          this.DialogShow = false
          this.getLotteryPrizeList(this.pageData.page)
        })
      })
    },
    // 奖品类型发生变化时 初始化该奖品的value 和 number
    handlePrizeTypeVary(value) {
      if (value == 1) {
        this.prizeData.number = ''
        this.prizeData.value = 0
        return
      }
      this.prizeData.value = ''
      this.prizeData.number = ''
    },

    // 获取优惠卷列表
    handlePrizeCoupons() {
      console.log('123');
      if (this.couponList.length === 0) {
        const res = getLotteryCoupons()
        console.log(res)
        this.couponList = res.list
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#PrizeTable {
  .add {
    margin-bottom: 10px;
  }

  .table-container {
    border: 1px solid #ebeef5;

    .demo-table-expand {
      font-size: 0;
    }

    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }

  .page {
    margin-top: 10px;
  }
}
</style>
