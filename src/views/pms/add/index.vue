<template>
<!--  添加商品  -->
  <div class="box">
    <div class="card-box">
      <!--    添加分类-->
      <card-class></card-class>
      <!--    基本信息-->
      <card-inform></card-inform>
      <!--    商品属性-->
      <card-attributes></card-attributes>
      <!--    销售资讯-->
      <card-sales></card-sales>
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


const defaultProductParam = {
  name: '',              //商品名称
  category_id: 0,        //分类id
  gallery: [],           //图片URL地址数组
  keywords: '',          //商品关键字
  brief:'',              //简单描述
  pic_url: '',           //商品展示图片 默认为商品轮播图的第一个
  share_url: '',         //分享链接
  unit: '',              //商品单位
  counter_price: 0 ,     //柜台价格
  retail_price: 0,       //零售价格
  detail: '',            //商品详情
  goods_product: [],
  goods_attributes: [    //商品属性
    {
      id: '',            //属性id
      attribute: '',     //属性名称
      value:''           //属性名
    }
  ],
  specifications: [],
  spec1:{},
  spec2:{},
  specifications_products: [  //产品规格
    {

    }
  ],
  shop: 0               //店铺id
}
export default {
  name: "index",
  components: {
    CardClass,
    CardInform,
    CardAttributes,
    CardSales,
    ComponentSteps
  },
  data() {
    return {
      text: '',
      options: []
    };
  },
  methods:{
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
