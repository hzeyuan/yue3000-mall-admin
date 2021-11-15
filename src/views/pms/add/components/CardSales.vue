<template>
<!--  商品销售信息-->
  <el-card class="card" shadow="never">
    <div class="text">
      <div class="title">
        销售规格
      </div>
      <div class="describe">
        设置商品的销售规格
      </div>
    </div>
    <el-divider></el-divider>
    <el-form label-position="right" label-width="80px"
             style="overflow: hidden; width: 600px; margin: auto"
             :model="formLabelAlign">
<!--      开放商品规格-->
      <el-form-item label="规格"
                    v-show="formLabelAlign.optionsTable.length === 0">
<!--        开放商品规格-->
        <InputButton span="开放商品规格"
                     @click.native="onSpecification">
        </InputButton>
      </el-form-item>
<!--              商品规格 第一组规格需要图片-->
      <el-form-item v-for="(item, index) in formLabelAlign.optionsTable"
                    :key="index" :label="'规格' + (index + 1) ">
        <InputTable :options-data="item">
          <i class="el-icon-close" @click.prevent="onClose(index)"></i>
        </InputTable>
      </el-form-item>
<!--      增加商品规格-->
      <el-form-item label=""
                    v-show="formLabelAlign.optionsTable.length >= 1">
        <InputButton span="增加商品规格"
                     @click.native="onSpecification">
        </InputButton>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="规格表" v-show="!(formLabelAlign.optionsTable.length === 0)">
        <OptionsTable :options-table="formLabelAlign.optionsTable"></OptionsTable>
      </el-form-item>
      <el-form-item label="多件优惠">
        <InputButton>
          <i class="el-icon-circle-plus-outline"></i>
          <span>新增优惠区间</span>
        </InputButton>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import InputButton from "./InputButton"
import InputTable from "./InputTable"
import OptionsTable from "./OptionsTable";

export default {
  name: "CardSales",
  components: {
    InputButton,
    InputTable,
    OptionsTable
  },
  data() {
    return {
      // 商品是否存在规格
      SpecificationShow: 0,
      formLabelAlign: {
        optionsTable: [],
        name: '',
        region: '',
        type: ''
      }
    }
  },
  methods: {
    // 增加规格表格
    onSpecification () {
      this.formLabelAlign.optionsTable.push({
        title: '',
        options: [
          {name: ''}
        ]
      })
    },
    // 关闭规格表格
    onClose(index){
      this.formLabelAlign.optionsTable.splice(index,1)
    }
  }
}
</script>

<style scoped>
.text .title{
  font-size: 24px;
  line-height: 36px;
}

.text .describe{
  font-size: 14px;
  line-height: 32px;
  color: #DCDFE6;
}
</style>
