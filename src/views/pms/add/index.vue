<template>
<!--  添加商品  -->
  <div class="box">
    <div class="card-box">
      <!--    添加分类-->
      <card-class :value="goods"></card-class>
      <!--    基本信息-->
      <card-inform :value="goods"></card-inform>
      <!--    商品属性-->
      <card-attributes :value="goods"></card-attributes>
      <!--    销售资讯-->
      <card-sales :value="goods"></card-sales>
      <!--      上传商品-->
      <el-card class="card" shadow="never">
        <div style="overflow: hidden">
          <el-button type="primary" style="float: right" @click="reqPostGoods">上传商品并上架</el-button>
          <el-button style="float: right; margin: 0 20px">添加商品并下架</el-button>
        </div>
      </el-card>
    </div>
    <component-steps></component-steps>
  </div>

</template>

<script>
import ComponentSteps from "./components/ComponentSteps";
import CardClass from "./components/CardClass";
import CardInform from "./components/CardInform";
import CardAttributes from "./components/CardAttributes";
import CardSales from "./components/CardSales";
import {postGoods} from "@/api/product"

const defaultProductParam = {
  name: '',                //商品名称
  category_id: '',         //分类id
  gallery: [
    '', '', ''
  ],          //图片URL地址数组
  keywords: '',            //商品关键字
  brief:'',                //简单描述
  is_on_sale: false,       //是否在售
  sort_order: '',          //商品排序
  pic_url: '',             //商品展示图片 默认为商品轮播图的第一个
  share_url: '',           //分享链接
  is_new: '',              //是否新
  is_hot: '',              //是否热
  unit: '',                //商品单位
  counter_price: 0 ,       //柜台价格
  retail_price: 0,         //零售价格
  detail: '',              //商品详情
  goods_products: [
    {
      0:'',              //规格选项名0
      1:'',              //规格想选项1
      number: '',        //商品库存
      price: '',         //商品价格
      pic_url: ''        //商品图片
    }
  ],   //商品规格表
  goods_attributes: [
    {
      attribute: '',     //属性名称
      value:''           //属性值
    }
  ], //商品属性
  goods_specifications: [
    {
      specification: '',   //规格名
      value: '',           //规格值
      pic_url: '',         //规格图片
    }
  ],//产品规格
  shop: 0                  //店铺id
}
export default {
  name: "index",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CardClass,
    CardInform,
    CardAttributes,
    CardSales,
    ComponentSteps
  },
  data() {
    return {
      goods: Object.assign({}, defaultProductParam)
    };
  },
  methods:{
    reqPostGoods() {
      this.$confirm('是否要提交该产品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          postGoods(this.goods).then(()=>{
            this.$message ({
              type: 'success',
              message: '修改成功',
              duration:1000
            });
            this.$router.back();
          })
        } else {
          postGoods(this.goods).then(()=>{
            this.$message ({
              type: 'success',
              message: '添加成功',
              duration:1000
            });
            this.$router.back();
          })
        }
      })
    },
    reqGetGoods(id){
      // 请求商品数据以供修改
    }
  },
  mounted() {
    if (this.isEdit) {
      this.reqGetGoods(this.$route.query.id)
    }
  }
}
</script>

<style scoped>

.card-box{
  width: 800px;
  margin: 20px auto;
}

.card{
  margin: 20px;
}
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
