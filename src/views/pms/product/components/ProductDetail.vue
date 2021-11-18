<template> 
  <el-card class="form-container" shadow="never">

    <product-info-detail
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep">
    </product-info-detail>

    <el-divider></el-divider>
    <product-sale-detail
      v-model="productParam"
      :is-edit="isEdit">
    </product-sale-detail>
    <el-divider></el-divider>
    <product-attr-detail
      v-model="productParam"
      :is-edit="isEdit">
    </product-attr-detail>
    <el-divider></el-divider>
    <product-relation-detail
      v-model="productParam"
      :is-edit="isEdit"
      @finishCommit="finishCommit">
    </product-relation-detail>
  </el-card>
</template>
<script>
  import ProductInfoDetail from './ProductInfoDetail';
  import ProductSaleDetail from './ProductSaleDetail';
  import ProductAttrDetail from './ProductAttrDetail';
  import ProductRelationDetail from './ProductRelationDetail';
  import {getSpecifications,setSpecifications} from '@/utils/multiply'
  import {postGoods,createProduct,getProduct,updateProduct} from '@/api/product';
  import _ from "lodash";

  const defaultProductParam = {
    name: '',                //商品名称
    category_id: '',         //分类id
    gallery: [
    ],          //图片URL地址数组
    keywords: '',            //商品关键字
    brief:'',                //简单描述
    is_on_sale: false,       //是否在售
    sort_order: '',          //商品排序
    pic_url: '',             //商品展示图片 默认为商品轮播图的第一个
    share_url: '',           //分享链接
    is_new: true,            //是否新
    is_hot: false,           //是否热
    unit: '',                //商品单位
    counter_price: 0 ,       //柜台价格
    retail_price: 0,         //零售价格
    detail: '',              //商品详情
    goods_products: [
      // {
      //   specifications:['红','小'],  //规格选项名
      //   number: '',        //商品库存
      //   price: '',         //商品价格
      //   pic_url: ''        //商品图片
      // },
      // {
      //   specifications:['红','大'],  //规格选项名
      //   number: '',        //商品库存
      //   price: '',         //商品价格
      //   pic_url: ''        //商品图片
      // }
    ],   //商品规格表
    goods_attributes: [
      // {
      //   attribute: '',     //属性名称
      //   value: []           //属性值
      // }
    ], //商品属性
    goods_specifications: [
      // {
      //   specification: '',     //规格名
      //   value: ''
      //   value: [''],           //规格值
      //   pic_url: '',           //规格图片
      // }
    ],//产品规格
    shop: 0                  //店铺id
  };
  export default {
    name: 'ProductDetail',
    components: {ProductInfoDetail, ProductSaleDetail, ProductAttrDetail, ProductRelationDetail},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        active: 0,
        productParam: Object.assign({}, defaultProductParam),
        showStatus: [false, true, true, true]
      }
    },
    created(){
      if(this.isEdit){
        getProduct(this.$route.query.id).then(response=>{
          this.productParam=response.data;
        });
      }
    },
    methods: {
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      // 上一组数据
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      // 下一组数据
      nextStep() {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      // 提交数据
      finishCommit(isEdit) {
        this.$confirm('是否要提交该产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(isEdit){
            updateProduct(this.$route.query.id,this.productParam).then(response=>{
              this.$message({
                type: 'success',
                message: '修改成功',
                duration:1000
              });
              this.$router.back();
            });
          }else{
            let data= _.cloneDeep(this.productParam)
            data.goods_specifications = getSpecifications(this.productParam.goods_specifications)
            postGoods(data).then(response=>{
              this.$message({
                type: 'success',
                message: '添加成功',
                duration:1000
              });
              this.$router.back();
            });
          }
        })
      }
    }
  }
</script>
<style>
  .form-container {
    width: 800px;
  }
</style>


