<template>
  <el-card class="goods-detail-container" shadow="never">
    <el-form
        ref="goodsForm"
        :model="goods"
        :rules="goodsRules"
        label-width="120px"
        style="width: 600px"
        size="small"
    >
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="goods.name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类：" prop="category_id">
        <!-- <div>{{ categoryName }}</div> -->
        <el-cascader-panel
            v-model="goods.category_id"
            :options="options"
            :props="{ value: 'id', label: 'name', children: 'child' }"
        ></el-cascader-panel>
      </el-form-item>
      <el-form-item label="商品图片：">
        <picture-upload
            ref="goodsPic"
            :is-edit="isEdit"
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
            :auto-size="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品上架：">
        <el-switch :value="goods.is_on_sale"
                   :active-value="1"
                   :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="商品排序：">
        <el-input
            v-model.number="goods.sort_order"
            oninput="value=value.replace(/[^0-9]/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品推荐：">
        <span style="margin-right: 10px">新品</span>
        <el-switch v-model="goods.is_new"
                   :active-value="1"
                   :inactive-value="0"></el-switch>
        <span style="margin-left: 10px; margin-right: 10px">热销</span>
        <el-switch :value="goods.is_hot"
                   :active-value="1"
                   :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="商品单位：">
        <el-input v-model="goods.unit"></el-input>
      </el-form-item>
      <el-form-item label="柜台价格：">
        <el-input
            v-model.number="goods.counter_price"
            oninput="value=Number(value.replace(/[^0-9.]/g,''))"
            @change="(data) => (goods.counter_price = funFormatPrice(data))"
        ></el-input>
      </el-form-item>
      <el-form-item label="零售价格：">
        <el-input
            v-model.number="goods.retail_price"
            oninput="value=value.replace(/[^0-9.]/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品详情：">
        <vab-quill
            v-model="goods.detail"
            :min-height="400"
            :max-width="600"
            :options="quillOptions"
        ></vab-quill>
      </el-form-item>
      <el-divider></el-divider>
      <!--      增加商品规格-->
      <el-form-item v-show="!productsShow" label="规格">
        <div class="InputButton" @click="addSpecification">
          <i class="el-icon-circle-plus-outline"></i>
          <span>开放商品规格</span>
        </div>
        <!-- <InputButton
          span="开放商品规格"
          @click.native="addSpecification"
        ></InputButton> -->
      </el-form-item>
      <!--      商品规格项-->
      <el-form-item
          v-for="(item, index) in goods.goods_specifications"
          :key="index"
          :label="'规格' + (index + 1)"
      >
        <InputTable :options-data="item">
          <i
              class="el-icon-close"
              @click.prevent="deleteSpecification(index)"
          ></i>
        </InputTable>
      </el-form-item>
      <!--      增加商品规格-->
      <el-form-item v-show="goods.goods_specifications.length === 1" label="">
        <div class="InputButton" @click="addSpecification">
          <span>增加商品规格</span>
        </div>
        <!-- <InputButton
          span="增加商品规格"
          @click.native="addSpecification"
        ></InputButton> -->
      </el-form-item>
      <!--      商品规格表-->
      <el-form-item v-if="productsShow" label="规格表">
        <OptionsTable
            :options-table="goods.goods_products"
            :options-title="goods.goods_specifications"
        ></OptionsTable>
      </el-form-item>
      <!-- <el-form-item label="多件优惠">
        <InputButton>
          <i class="el-icon-circle-plus-outline"></i>
          <span>新增优惠区间</span>
        </InputButton>
      </el-form-item> -->
      <el-divider></el-divider>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="finishCommit(isEdit)">
          完成，提交商品
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import PictureUpload from '@/components/Upload/PictureUpload' //上传文件组件 多文件组件
import IconUpload from "@/components/Upload/IconUpload"; //上传文件组件 单文件上传
import InputTable from './InputTable' //规格列表组件
import OptionsTable from './OptionsTable' //规格表格组件
import vabQuill from '@/plugins/vabQuill'
// 处理商品规格的工具
import {
  getSpecifications,
  setSpecifications,
  arrMultiply,
  multiply,
} from '@/utils/multiply'
import _ from 'lodash'
// 商品增删查改相关API
import {postGoods, updateGoods, getGoods} from '@/api/product'
// 商品分类列表相关API
import {fetchTreeList} from '@/api/category'

// 商品数据参数
const defaultProductParam = {
  name: '', //商品名称
  gallery: [], //图片URL地址数组
  keywords: '', //商品关键字
  brief: '', //简单描述
  is_on_sale: 0, //是否在售
  sort_order: '', //商品排序
  pic_url: '', //商品展示图片 默认为商品轮播图的第一个
  is_new: 0, //是否新
  is_hot: 0, //是否热
  unit: '', //商品单位
  counter_price: 0, //柜台价格
  retail_price: 0, //零售价格
  detail: '', //商品详情
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
}
export default {
  name: 'ProductDetail',

  components: {
    PictureUpload,
    IconUpload,
    InputTable,
    OptionsTable,
    vabQuill,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      quillOptions: {
        theme: 'snow',
        bounds: document.body,
        debug: 'warn',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            [{size: ['small', false, 'large', 'huge']}],
            [{color: []}, {background: []}],
            ['blockquote', 'code-block'],
            [{list: 'ordered'}, {list: 'bullet'}],
            [{script: 'sub'}, {script: 'super'}],
            [{indent: '-1'}, {indent: '+1'}],
            [{align: []}],
            [{direction: 'rtl'}],
            [{font: []}],
            ['clean'],
            ['link', 'image'],
          ],
        },
        placeholder: '内容...',
        readOnly: false,
      },
      // 商品分类id数组 用于联级选择器
      category_id: [],
      // 商品分类列表
      options: [],
      // 商品信息表
      goods: Object.assign({}, defaultProductParam),
      goodsRules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {
            min: 5,
            max: 200,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur',
          },
        ],
        category_id: [
          {
            type: 'array',
            required: true,
            message: '请选择商品分类',
            trigger: 'blur',
          },
        ],
        number: [
          {required: true, message: '请输入正确的金额', trigger: 'blur'},
        ],
      },
    }
  },
  computed: {
    //类目名称
    // categoryName() {
    //   const categoryById = _.keyBy(this.options, 'id')
    //   if (!this.goods.category_id) return '暂无'
    //   const firstCateId = this.goods.category_id[0]
    //   const firstCate = categoryById[firstCateId]
    //   const secCateId = this.goods.category_id[1]
    //   const secCategoryById = _.keyBy(firstCate.child, 'id')
    //   return firstCate.name + '/' + secCategoryById[secCateId].name
    // },
    // 商品开放规格
    productsShow() {
      if (this.goods.goods_specifications.length === 0) {
        return false
      }
      return true
    },
  },
  watch: {
    // 监听商品规格列表 并动态生成商品规格表格
    'goods.goods_specifications': {
      deep: true,
      handler() {
        const {goods_specifications} = this.goods
        if (_.isEmpty(goods_specifications)) return
        const primarySpec = goods_specifications[0] // 第一个 规格 [{key:'',value:}]
        const secondSpec = goods_specifications[1] // 第二个 规格
        // 如
        const specValues = _.isNil(secondSpec)
            ? primarySpec.value
            : multiply(primarySpec.value, secondSpec.value)
        let arrobj =
            specValues.map((values) => ({
              specifications: _.castArray(values),
              number: '',
              pic_url: '',
            })) || []
        // 聚合 产品表中的数据，规格表中的字段
        arrobj = arrMultiply(arrobj, this.goods.goods_products)
        this.goods.goods_products = arrobj
      },
    },
  },
  created() {
    this.reqTreeClass()
    if (this.isEdit) {
      const id = this.$route.query.id
      this.reqGetGoods(id)
    }
  },
  methods: {
    // 获取商品分类列表
    async reqTreeClass() {
      const res = await fetchTreeList()
      this.options = res.list
    },

    // 修改商品页面的请求商品数据
    async reqGetGoods(id) {
      const data = await getGoods(id)
      // this.category_id = data.category_id
      const goods_specifications = []
      const specValues = _.groupBy(data.goods_specifications, 'specification')
      for (const key in specValues) {
        goods_specifications.push({
          specification: key,
          value: _.map(specValues[key], 'value'),
        })
      }
      console.log('specValues', specValues, goods_specifications)
      // specValues.map();
      // data.goods_specifications.map((o) => {
      //   const values = _.map(specValues[o.specification], 'value')
      //   goods_specifications.push({
      //     specification: o.specification,
      //     value: values,
      //     pic_url: '',
      //   })
      // })
      // {
      //   specifications:['红','小'],  //规格选项名
      //   number: '',        //商品库存
      //   price: '',         //商品价格
      //   pic_url: ''        //商品图片
      // },

      const goods_products = Object.values(data.specifications_products).map(
          (o) => ({
            ...o,
            specifications: JSON.parse(o.specifications),
          })
      )

      console.log('goods_specifications', goods_specifications)
      this.goods = {
        ...data,
        gallery: JSON.parse(data.gallery),
        goods_specifications: goods_specifications,
        goods_products,
      }
    },
    // 商品添加规格项
    addSpecification() {
      this.goods.goods_specifications.push({
        specification: '', //规格名
        value: [''], //规格值 数组类型 上传时需要重新组合
        pic_url: '', //规格图片
      })
    },
    // 商品删除规格项
    deleteSpecification(index) {
      this.goods.goods_specifications.splice(index, 1)
    },
    // 提交数据
    finishCommit(isEdit) {
      this.$refs['goodsForm'].validate((isValid) => {
        // 验证表单
        if (!isValid) {
          console.log('error submit!!')
          return false
        }
        this.$confirm('是否要提交该产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          let data = _.cloneDeep(this.goods)
          data.goods_specifications = getSpecifications(
              data.goods_specifications
          )
          const gallery = this.$refs['goodsPic'].fileList
          // console.log('fileList', this.$refs['goodsPic'].fileList)
          data.gallery = gallery.map(e => e.url)
          if (isEdit) {
            console.log('goods_specifications', data.goods_specifications)
            // 修改商品
            updateGoods(this.$route.query.id, data).then((response) => {
              this.$message({
                type: 'success',
                message: '修改成功',
                duration: 1000,
              })
              // this.$router.back()
            })
          } else {
            postGoods(data).then((response) => {
              this.$message({
                type: 'success',
                message: '添加成功',
                duration: 1000,
              })
              // this.$router.back()
            })
          }
        })
      })
    },
    // 价格保留2位小数
    funFormatPrice(value) {
      return value
    },
  },
}
</script>
<style lang="scss">
.goods-detail-container {
  /* width: 800px; */
  .InputButton {
    border-radius: 4px;
    border: 1px dashed #1791f2;
    text-align: center;
    color: #1791f2;
    cursor: pointer;
  }

  .InputButton:hover {
    background-color: #fafafa;
  }

  .InputButton:active {
    opacity: 90%;
  }
}

.ql-container {
  max-height: 500px;
  overflow: auto;
}
</style>
