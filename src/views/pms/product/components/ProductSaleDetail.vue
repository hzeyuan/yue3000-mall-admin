<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productSaleForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="商品关键字：">
        <el-input v-model="value.keywords"></el-input>
      </el-form-item>
      <el-form-item label="简单描述：">
        <el-input v-model="value.brief" type="textarea" :autoSize="true"></el-input>
      </el-form-item>
      <el-form-item label="商品上架：">
        <el-switch
          v-model="value.is_on_sale">
        </el-switch>
      </el-form-item>
      <el-form-item label="商品排序：">
        <el-input v-model="value.sort_order"></el-input>
      </el-form-item>
      <el-form-item label="商品推荐：">
        <span style="margin-right: 10px">新品</span>
        <el-switch
          v-model="value.is_new">
        </el-switch>
        <span style="margin-left: 10px;margin-right: 10px">热销</span>
        <el-switch
          v-model="value.is_hot">
        </el-switch>
      </el-form-item>
      <el-form-item label="商品单位：">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="柜台价格：">
        <el-input v-model="value.counter_price"></el-input>
      </el-form-item>
      <el-form-item label="零售价格：">
        <el-input v-model="value.retail_price"></el-input>
      </el-form-item>
      <el-form-item label="商品详情：">
        <el-input v-model="value.detail"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchList as fetchMemberLevelList} from '@/api/memberLevel'

  export default {
    name: "ProductSaleDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      }
    },
    created() {
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style scoped>
  .littleMargin {
    margin-top: 10px;
  }
</style>
