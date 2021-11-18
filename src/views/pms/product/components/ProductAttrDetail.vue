<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productAttrForm" label-width="120px" style="width: 600px" size="small">
<!--              开放商品规格-->
      <el-form-item label="规格" v-show="!productsShow">
        <InputButton span="开放商品规格" @click.native="onSpecification"></InputButton>
      </el-form-item>
      <!--              商品规格 第一组规格需要图片-->
      <el-form-item v-for="(item, index) in value.goods_specifications"
                    :key="index" :label="'规格' + (index + 1) ">
        <InputTable :options-data="item">
          <i class="el-icon-close" @click.prevent="onClose(index)"></i>
        </InputTable>
      </el-form-item>
      <!--      增加商品规格-->
      <el-form-item label="" v-show="productsShow">
        <InputButton span="增加商品规格" @click.native="onSpecification"></InputButton>
      </el-form-item>
      <el-form-item label="规格表" v-if="productsShow">
        <OptionsTable :options-table="value.goods_products" :options-title="value.goods_specifications"></OptionsTable>
      </el-form-item>
      <el-form-item label="多件优惠">
        <InputButton>
          <i class="el-icon-circle-plus-outline"></i>
          <span>新增优惠区间</span>
        </InputButton>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import InputButton from "../../add/components/InputButton";
  import InputTable from "../../add/components/InputTable";
  import OptionsTable from "../../add/components/OptionsTable";
  import {multiply, arrMultiply} from '@/utils/multiply'

  export default {
    name: "ProductAttrDetail",
    components:{
      InputButton,
      InputTable,
      OptionsTable
    },
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      'value.goods_specifications': {
        deep: true,
        handler(){
          let arrobj = []
          let a = this.value.goods_specifications
          if (a.length === 1){
            this.value.goods_specifications[0].value.forEach((item)=>{
              arrobj.push({
                specifications:[item],
                number: '',
                price: '',
                pic_url: ''
              })
            })
          }else {
            let arr = multiply(a[0].value, a[1].value)
            arr.forEach((item)=>{
              arrobj.push({
                specifications:item,
                number: '',
                price: '',
                pic_url: ''
              })
            })
          }
          arrobj = arrMultiply(arrobj, this.value.goods_products)
          this.value.goods_products = arrobj
        }
      },
    },
    computed:{
      productsShow(){
        if (this.value.goods_specifications.length === 0){
          return false
        }
        return true
      },
    },
    data() {
      return{
      }
    },
    methods: {
      // 增加规格表单
      onSpecification () {
        this.value.goods_specifications.push({
          specification: '',   //规格名
          value: ["",],           //规格值
          pic_url: '',         //规格图片
        })
      },
      // 删除规格表单
      onClose(index){
        this.value.goods_specifications.splice(index,1)
      },
      // 打印查看计算出的表格数组
      oncop(e){
        console.log('table',e)
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .littleMarginLeft {
    margin-left: 10px;
  }

  .littleMarginTop {
    margin-top: 10px;
  }

  .paramInput {
    width: 250px;
  }

  .paramInputLabel {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px
  }

  .cardBg {
    background: #F8F9FC;
  }
</style>
