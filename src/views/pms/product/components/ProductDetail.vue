<template>
   
  <el-card class="form-container" shadow="never">
    <el-form
      :model="goods"
      :rules="goodsRules"
      ref="goodsForm"
      label-width="120px"
      style="width: 600px"
      size="small"
    >
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="goods.name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类：" prop="category_id">
        <el-cascader-panel
          :options="options"
          v-model="category_id"
          :props="{ value: 'id', label: 'name', children: 'child' }"
        >
        </el-cascader-panel>
      </el-form-item>
      <el-form-item label="商品图片：">
        <picture-upload
          :isEdit="isEdit"
          :gallery="goods.gallery"
        ></picture-upload>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="商品关键字：">
        <el-input v-model="goods.keywords"></el-input>
      </el-form-item>
      <el-form-item label="简单描述：">
        <el-input
          v-model="goods.brief"
          type="textarea"
          :autoSize="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品上架：">
        <el-switch v-model="goods.is_on_sale"></el-switch>
      </el-form-item>
      <el-form-item label="商品排序：">
        <el-input v-model="goods.sort_order"></el-input>
      </el-form-item>
      <el-form-item label="商品推荐：">
        <span style="margin-right: 10px">新品</span>
        <el-switch v-model="goods.is_new"></el-switch>
        <span style="margin-left: 10px; margin-right: 10px">热销</span>
        <el-switch v-model="goods.is_hot"></el-switch>
      </el-form-item>
      <el-form-item label="商品单位：">
        <el-input v-model="goods.unit"></el-input>
      </el-form-item>
      <el-form-item label="柜台价格：">
        <el-input v-model="goods.counter_price"></el-input>
      </el-form-item>
      <el-form-item label="零售价格：">
        <el-input v-model="goods.retail_price"></el-input>
      </el-form-item>
      <el-form-item label="商品详情：">
        <el-input v-model="goods.detail"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <!--      开放商品规格-->
      <el-form-item label="规格" v-show="!productsShow">
        <InputButton
          span="开放商品规格"
          @click.native="addSpecification"
        ></InputButton>
      </el-form-item>
      <!--      商品规格项-->
      <el-form-item
        :label="'规格' + (index + 1)"
        v-for="(item, index) in goods.goods_specifications"
        :key="index"
      >
        <InputTable :options-data="item">
          <i
            class="el-icon-close"
            @click.prevent="deleteSpecification(index)"
          ></i>
        </InputTable>
      </el-form-item>
      <!--      增加商品规格-->
      <el-form-item label="" v-show="productsShow">
        <InputButton
          span="增加商品规格"
          @click.native="addSpecification"
        ></InputButton>
      </el-form-item>
      <!--      商品规格表-->
      <el-form-item label="规格表" v-if="productsShow">
        <OptionsTable
          :options-table="goods.goods_products"
          :options-title="goods.goods_specifications"
        ></OptionsTable>
      </el-form-item>
      <el-form-item label="多件优惠">
        <InputButton>
          <i class="el-icon-circle-plus-outline"></i>
          <span>新增优惠区间</span>
        </InputButton>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="finishCommit(isEdit)"
          >完成，提交商品</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import PictureUpload from "@/components/UploadComponents/PictureUpload"; //上传文件组件
import InputButton from "./InputButton"; //表格按钮组件
import InputTable from "./InputTable"; //规格列表组件
import OptionsTable from "./OptionsTable"; //规格表格组件
// 处理商品规格的工具
import {
  getSpecifications,
  setSpecifications,
  arrMultiply,
  multiply,
} from "@/utils/multiply";
import _ from "lodash";
// 商品增删查改相关API
import { postGoods, updateGoods, getGoods } from "@/api/product";
// 商品分类列表相关API
import { fetchTreeList } from "@/api/productCate";

// 商品数据参数
const defaultProductParam = {
  name: "", //商品名称
  category_id: "", //分类id
  gallery: [], //图片URL地址数组
  keywords: "", //商品关键字
  brief: "", //简单描述
  is_on_sale: false, //是否在售
  sort_order: "", //商品排序
  pic_url: "", //商品展示图片 默认为商品轮播图的第一个
  share_url: "", //分享链接
  is_new: true, //是否新
  is_hot: false, //是否热
  unit: "", //商品单位
  counter_price: 0, //柜台价格
  retail_price: 0, //零售价格
  detail: "", //商品详情
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
  ], //商品规格表
  goods_attributes: [
    // {
    //   attribute: '',     //属性名称
    //   value: []           //属性值
    // }
  ], //商品属性
  goods_specifications: [
    // {
    //   specification: '',     //规格名
    //   value: [''],           //规格值
    //   pic_url: '',           //规格图片
    // }
  ], //产品规格
  shop: 0, //店铺id
};
export default {
  name: "ProductDetail",
  components: {
    PictureUpload,
    InputButton,
    InputTable,
    OptionsTable,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    // 监听商品分类数组,取数组最后一项赋值给商品信息的分类id
    category_id: {
      deep: true,
      handler() {
        this.goods.category_id = this.category_id.slice(-1)[0];
      },
    },
    // 监听商品规格列表 并动态生成商品规格表格
    "goods.goods_specifications": {
      deep: true,
      handler() {
        const { goods_specifications } = this.goods;
        if (_.isEmpty(goods_specifications)) return;
        const primarySpec = goods_specifications[0]; // 第一个 规格 [{key:'',value:}]
        const secondSpec = goods_specifications[1]; // 第二个 规格
        // 如
        const specValues = _.isNil(secondSpec)
          ? primarySpec.value
          : multiply(primarySpec.value, secondSpec.value);
        let arrobj = specValues.map((values) => ({
          specifications: _.castArray(values),
          number: "",
          pic_url: "",
        })) || [];
        // 聚合 产品表中的数据，规格表中的字段
        arrobj = arrMultiply(arrobj, this.goods.goods_products);
        this.goods.goods_products = arrobj;
      },
    },
  },
  computed: {
    // 商品开放规格
    productsShow() {
      if (this.goods.goods_specifications.length === 0) {
        return false;
      }
      return true;
    },
  },
  data() {
    return {
      // 商品分类id数组 用于联级选择器
      category_id: "",
      // 商品分类列表
      options: [],
      // 商品信息表
      goods: Object.assign({}, defaultProductParam),
      goodsRules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        category_id: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.reqTreeClass();
    if (this.isEdit) {
      getGoods(this.$route.query.id).then((response) => {
        this.productParam = response.data;
      });
    }
  },
  methods: {
    // 获取商品分类列表
    async reqTreeClass() {
      const res = await fetchTreeList();
      this.options = res;
    },
    // 商品添加规格项
    addSpecification() {
      this.goods.goods_specifications.push({
        specification: "", //规格名
        value: [""], //规格值 数组类型 上传时需要重新组合
        pic_url: "", //规格图片
      });
    },
    // 商品删除规格项
    deleteSpecification(index) {
      this.goods.goods_specifications.splice(index, 1);
    },
    // 提交数据
    finishCommit(isEdit) {
      this.$refs["goodsForm"].validate((isValid) => {
        // 验证表单
        if (!isValid) {
          console.log("error submit!!");
          return false;
        }
        this.$confirm("是否要提交该产品", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          if (isEdit) {
            // 修改商品
            updateGoods(this.$route.query.id, this.productParam).then(
              (response) => {
                this.$message({
                  type: "success",
                  message: "修改成功",
                  duration: 1000,
                });
                this.$router.back();
              }
            );
          } else {
            let data = _.cloneDeep(this.goods);
            console.log('goods_specifications',data.goods_specifications);
            data.goods_specifications = getSpecifications(
              data.goods_specifications
            );
            postGoods(data).then((response) => {
              this.$message({
                type: "success",
                message: "添加成功",
                duration: 1000,
              });
              this.$router.back();
            });
          }
        });
      });
    },
  },
};
</script>
<style>
.form-container {
  width: 800px;
}
</style>


