<template>
  <div id="LotteryDialog">
    <el-dialog title="抽奖活动详情" :visible.sync="dialogShow" width="60%">
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
            <div class="flex flex-wrap overflow-y-auto h-80">
<!--              奖品信息-->
              <div class="bg-gray-100 py-8 pr-5 mb-5 mr-5 w-72 h-72 relative"
                   v-for="(item, index) in activityData.prize" :key="index">
                <div class="absolute p-2" @click="onDeletePrize(index)">
                  <i class="el-icon-close"></i>
                </div>
                <el-form-item label="奖品名称：" :prop="'prize[' + index + '].name'"
                              :rules="rules.notNull">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="获奖概率：">
                  <el-input v-model.number="item.probability"></el-input>
                </el-form-item>
                <el-form-item label="奖品类型：" :prop="'prize[' + index + '].prize_type'"
                              :rules="rules.notNull">
                  <el-select v-model="item.prize_type" placeholder="请选择奖品类型" @change="handlePrizeTypeVary(index)">
                    <el-option
                      v-for="item in prizeTypeList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="积分数量：" v-if="item.prize_type === 1" :prop="'prize[' + index + '].value'"
                              :rules="rules.notNull">
                  <el-input v-model.number="item.value"
                            oninput="value=Number(value.replace(/[^0-9.]/g,''))"></el-input>
                </el-form-item>
                <el-form-item label="优惠卷：" v-if="item.prize_type === 2" :prop="'prize[' + index + '].value'"
                              :rules="rules.notNull">
                  <el-select v-model="item.value" placeholder="请选择优惠卷">
                    <el-option
                      v-for="item in couponList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="奖品数量：" v-if="item.prize_type === 1 || item.prize_type === 2" :prop="'prize[' + index + '].number'"
                              :rules="rules.notNull">
                  <el-input v-model="item.number"></el-input>
                </el-form-item>
              </div>
<!--              添加奖品框-->
              <div class="bg-gray-100 p-5 mb-5 mr-5 w-72 h-72 text-center">
                <div class="add-prize" @click="onAddPrize">
                  <i class="el-icon-circle-plus-outline text-5xl leading-none"></i>
                  <p>添加奖品</p>
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
  </div>
</template>

<script>
import {updateLotteryActivityList, addLotteryActivityList} from "@/api/config/lottery";

export default {
  name: "LotteryDialog",
  props: {
    isEdge: Boolean,
  },
  data () {
    return {
      // 控制模态框的显示与隐藏
      dialogShow: false,
      // 优惠卷列表 后期使用网络请求刷新
      couponList: [
        {
          id: 1,
          label: '优惠卷1',
          value: 1,
        },
        {
          id: 2,
          label: '优惠卷2',
          value: 2,
        },
        {
          id: 3,
          label: '优惠卷3',
          value: 3,
        },
        {
          id: 4,
          label: '优惠卷4',
          value: 4,
        }
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
      activityData: {
      },
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
  methods: {
    // 点击删除活动奖品
    onDeletePrize(index) {
      this.$confirm("是否要删除该奖品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.activityData.prize.splice(index, 1)
      });
    },
    // 点击增加活动奖品
    onAddPrize() {
      this.activityData.prize.push({
        id: -1,
        name: '',
        prize_type: '',   //奖品类型 1表示积分 2表示优惠卷 3表示谢谢惠顾
        number: '',     //奖品数量
        probability: 0, //抽奖概率
        value: '',        //奖品值
      })
    },
    // 某一奖品类型发生变化时 初始化value 和 number
    handlePrizeTypeVary(index){
      this.activityData.prize[index].value = ''
      this.activityData.prize[index].number = ''
    },
    // 点击修改活动发送请求
    onUpdateDate(){
      this.$refs['ref-activity-from'].validate((valid) => {
        if (valid) {
          updateLotteryActivityList(this.activityData.id, this.activityData).then( ()=>{
            this.$message({
              type: "success",
              message: "修改成功",
              duration: 1000,
            })
            this.$parent.getLotteryActivityList()
            this.dialogShow = false
          })
        } else {
          return false;
        }
      })
    },
    // 点击添加活动发送请求
    onAddDate(){
      this.$refs['ref-activity-from'].validate((valid) => {
        if (valid) {
          addLotteryActivityList(this.activityData).then(()=>{
            this.$message({
              type: "success",
              message: "修改成功",
              duration: 1000,
            })
            this.$parent.getLotteryActivityList()
            this.dialogShow = false
          })
        } else {
          return false;
        }
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
  width: 60px;
  height: 60px;
  margin: 80px auto;
  cursor: pointer;
}
.add-prize:hover{
  color: #1e6abc;
}
</style>
