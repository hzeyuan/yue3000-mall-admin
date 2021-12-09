<template>
  <div id="LotteryDialog">
    <el-dialog title="抽奖活动详情" :visible.sync="dialogShow" width="40%">
<!--      活动信息表单数据-->
      <div class="pt-5">
        <el-form ref="ref-activity-from" :model="activityData" :rules="rules" label-width="100px">
          <el-form-item label="活动名称：" prop="name">
            <el-input v-model="activityData.name"></el-input>
          </el-form-item>
          <el-form-item label="活动状态：">
            <el-switch v-model="activityData.status" :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item label="活动描述：" prop="message">
            <el-input v-model="activityData.message"></el-input>
          </el-form-item>
          <el-form-item label="活动规则：">
            <el-input type="textarea" v-model="activityData.rule" autosize></el-input>
          </el-form-item>
          <el-form-item label="活动奖品：">
            <div class="flex flex-wrap">
<!--              添加活动奖品-->
              <div class="prize-box bg-gray-100 h-24 m-1 w-24">
                <div class="add-prize" @click="onAddDialog">
                  <i class="el-icon-circle-plus-outline text-2xl leading-none"></i>
                  <p class="p-0">添加奖品</p>
                </div>
              </div>
<!--              奖品数据-->
              <div class="prize-box bg-gray-100 h-24 m-1 w-24 text-center" v-for="(item,index) in prizeList" :key="index">
                <div v-if="item.prize_type === 1">
                <p>积分奖励</p>
                <p>{{ item.value }}积分</p>
                </div>
                <div v-if="item.prize_type === 2">
                  <p>优惠卷</p>
                  <p>店铺满减</p>
                </div>
                <div v-if="item.prize_type === 3">
                 <p>谢谢惠顾</p>
                </div>
                <div class="prize-operate">
                  <i class="el-icon-edit" @click="onUpdateDialog(item)"></i>
                  <i class="el-icon-circle-close" @click="onDeletePrize(item.id, index)"></i>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="onAddDate()" v-if="isEdge">添 加</el-button>
        <el-button type="primary" @click="onUpdateDate()" v-else>修 改</el-button>
      </span>
    </el-dialog>


    <!--      添加奖品修改奖品对话框  内层对话框-->
    <el-dialog width="30%" title="奖品详情" :visible.sync="innerDialogShow" append-to-body>
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
          <el-button @click="innerDialogShow = false">取 消</el-button>
          <el-button type="primary" v-if="prizeData.id" @click="onUpdatePrize()" >修 改</el-button>
          <el-button type="primary" v-else @click="onAddPrize" >添 加</el-button>
        </span>
    </el-dialog>


  </div>
</template>

<script>
import IconUpload from "@/components/Upload/IconUpload";
import _ from 'lodash'
import {
  updateLotteryActivityList,
  addLotteryActivityList,
  getLotteryActivityPrizeList,
  addLotteryActivityPrize,
  updateLotteryActivityPrize,
  deleteLotteryActivityPrize
} from "@/api/config/lottery";

export default {
  name: "LotteryDialog",
  components: {
    IconUpload
  },
  props: {
    isEdge: Boolean,
  },
  data () {
    return {
      // 控制活动详情模态框的显示与隐藏
      dialogShow: false,
      // 控制奖品详情模态框的显示与隐藏
      innerDialogShow: false,
      // 优惠卷列表 后期使用网络请求刷新
      couponList: [
        {
          id: 3,
          label: '店铺满减',
          value: '3',
        },
      ],
      // 奖品类型列表
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
      ],
      // 活动详情数据
      activityData: {},
      // 奖品列表数据
      prizeList: [],
      // 单个奖品数据
      prizeData: {},
      // 表单验证
      rules: {
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        message: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        notNull: {
          required: true,
          message: '该项不能为空',
          trigger: 'blur'
        }
      }
    }
  },
  watch: {
    activityData: {
      deep: true,
      handler(){
        if (!this.isEdge){
          let {id} = this.activityData
          this.reqGetPrizeList(id)
        }
        this.prizeList = []
      }
    }
  },
  methods: {
    async reqGetPrizeList(id){
      const res = await getLotteryActivityPrizeList(id)
      this.prizeList = res.list
    },
    // 点击删除活动奖品
    onDeletePrize(id, index) {
      this.$confirm("是否要删除该奖品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteLotteryActivityPrize(id).then( ()=>{
          this.prizeList.splice(index, 1)  //本地删除活动奖品
          this.$message({
            type: "success",
            message: "删除成功",
            duration: 1000,
          })
        })
      });
    },
    // 点击打开增加奖品对话框
    onAddDialog() {
      this.prizeData= {
        name: '',
        prize_type: '',   //奖品类型 1表示积分 2表示优惠卷 3表示谢谢惠顾
        number: '',     //奖品数量
        probability: 0, //抽奖概率
        value: '',        //奖品值
      }
      this.innerDialogShow = true
    },
    // 点击增加奖品
    onAddPrize() {
      addLotteryActivityPrize(this.prizeData).then((res) =>{
        this.$message({
          type: "success",
          message: "奖品添加成功",
          duration: 1000,
        })
        this.prizeList.push(res)
        this.innerDialogShow = false
      })
    },
    // 点击打开修改奖品对话框
    onUpdateDialog(prize){
      this.prizeData = _.cloneDeep(prize)
      this.innerDialogShow = true
    },
    // 点击修改奖品
    onUpdatePrize(){
      updateLotteryActivityPrize(this.prizeData.id,this.prizeData).then((res)=>{
        this.$message({
          type: "success",
          message: "修改成功",
          duration: 1000,
        })
        this.prizeList.forEach((item, index) => {
          if (item.id === res.id){
            this.prizeList[index] = res
          }
        })
        this.innerDialogShow = false
      })
    },
    // 奖品类型发生变化时 初始化该奖品的value 和 number
    handlePrizeTypeVary(){
      this.prizeData.value = ''
      this.prizeData.number = ''
    },
    // 点击修改活动发送请求
    onUpdateDate(){
      this.$refs['ref-activity-from'].validate((valid) => {
        if (!valid) return false
        let prize_ids = this.prizeList.map(item => item.id)
        this.activityData.prize_ids = prize_ids
        updateLotteryActivityList(this.activityData.id, this.activityData).then( ()=>{
          this.$message({
            type: "success",
            message: "修改成功",
            duration: 1000,
          })
          this.$parent.getLotteryActivityList(1)
          this.dialogShow = false
        })
      })
    },
    // 点击添加活动发送请求
    onAddDate(){
      this.$refs['ref-activity-from'].validate((valid) => {
        if (!valid) return false
        let prize_ids = this.prizeList.map(item => item.id)
        this.activityData.prize_ids = prize_ids
        addLotteryActivityList(this.activityData).then(()=>{
            this.$message({
              type: "success",
              message: "添加成功",
              duration: 1000,
            })
            this.$parent.getLotteryActivityList(1)
            this.dialogShow = false
          })
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.absolute{
  top: -10px;
  right: 0;
  cursor: pointer;
}
.add-prize{
  cursor: pointer;
  text-align: center;
}
.add-prize:hover{
  color: #1e6abc;
}
.prize-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  .prize-operate{
    display: none;
  }
  &:hover{
    .prize-operate{
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(59, 60, 61, 0.5);
      i {
        margin: 35px 0 0 15px;
        display: block;
        font-size: 24px;
        color: white;
        float: left;
        cursor: pointer;
      }
    }
  }
}

</style>
