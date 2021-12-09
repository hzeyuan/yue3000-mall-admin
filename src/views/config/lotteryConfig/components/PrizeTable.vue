<template>
  <div class="PrizeTable">
    <div class="table-box">
      <el-table :data="LotteryPrizeList" v-loading="tableLoading">
        <el-table-column label="序号" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="onUpdateDialog(scope.row)">编辑</el-button>
            <el-button size="small" type="danger"  @click="onDeletePrize(scope.row.id)">删除</el-button>
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
          <el-form-item label="奖品名称">
            <el-input v-model="prizeData.name"></el-input>
          </el-form-item>
          <el-form-item label="奖品概率">
            <el-input v-model="prizeData.probability"></el-input>
          </el-form-item>
          <el-form-item label="奖品数量">
            <el-input v-model="prizeData.number"></el-input>
          </el-form-item>
          <el-form-item label="奖品图片">
            <IconUpload :icon="prizeData.image_url"></IconUpload>
          </el-form-item>
          <el-form-item label="奖品类型">
            <el-select v-model="prizeData.prize_type" placeholder="请选择奖品类型" @change="handlePrizeTypeVary(1)">
              <el-option
                v-for="item in prizeTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="prizeData.prize_type === 1" label="积分值">
            <el-input v-model="prizeData.value"></el-input>
          </el-form-item>
          <el-form-item v-if="prizeData.prize_type === 2" label="优惠卷">
            <el-select v-model="prizeData.value" placeholder="请选择优惠卷">
              <el-option
                v-for="item in couponList"
                :key="item.id"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="innerDialogShow = DialogShow">取 消</el-button>
          <el-button type="primary" v-if="prizeData.id" @click="onUpdatePrize()" >修 改</el-button>
          <el-button type="primary" v-else @click="onAddPrize" >添 加</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {deleteLotteryActivityPrize, getLotteryPrizeList, updateLotteryActivityPrize} from "@/api/config/lottery";

export default {
  name: "PrizeTable",
  data () {
    return {
      LotteryPrizeList: [],//奖品列表
      tableLoading: false,//表格加载框
      pageData: {
        page: 1,
        total: 0
      },//表格分页数据
      prizeData: {},//单个奖品信息
      rules: {},//表单验证
      DialogShow: true,//对会框状态
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
    this.getLotteryPrizeList(1)
  },
  methods: {
    // 获取奖品列表
    async getLotteryPrizeList(page){
      this.tableLoading = true
      const res = await getLotteryPrizeList(page)
      this.LotteryPrizeList = res.list
      this.pageData.total = res.pagination.total
      this.tableLoading = false
    },
    // 点击打开修改对话框
    onUpdateDialog(Prize){
    },
    // 点击打开添加对话框
    onAddDialog(){
    },
    // 点击删除奖品
    onDeletePrize(id) {
      this.$confirm("是否要删除该奖品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteLotteryActivityPrize(id).then( (res)=>{
          this.$message({
            type: "success",
            message: "删除成功",
            duration: 1000,
          })
        })
      });
    },
    // 点击修改奖品
    onUpdatePrize(){
      updateLotteryActivityPrize(this.prizeData.id,this.prizeData).then((res)=>{
        this.prizeList.forEach((item, index) => {
          if (item.id === res.id){
            this.prizeList[index] = res
          }
        })
        this.$message({
          type: "success",
          message: "修改成功",
          duration: 1000,
        })
        this.innerDialogShow = false
      })
    },
  }
}
</script>

<style scoped>

</style>
