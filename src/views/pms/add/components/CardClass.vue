<template>
<!--  设置分类-->
  <el-card class="card" shadow="never">
    <div class="text">
      <div class="title">
        新增商品
      </div>
      <div class="describe">
        为你的商品选择一个合适的分类
      </div>
    </div>
    <el-divider></el-divider>
    <div class="input-box">
      <span>商品名称：</span>
      <el-input style="width: 630px"
        type="text" placeholder="请输入内容" v-model="text"
        maxlength="60" show-word-limit>
      </el-input>
    </div>
    <div class="nev">
      <div class="input-box">
        <el-input prefix-icon="el-icon-search" style="width: 200px"
                  placeholder="搜索分类" round>
        </el-input>
      </div>
      <el-cascader-panel :options="options" :value="option"
                         style="width: 500px; margin: auto"
                         :props="{value:'id',label:'name',children: 'child'}">
      </el-cascader-panel>
    </div>
    <div class="option">商品分类为{{ option }}</div>
    <el-button type="danger" size="medium">下一步</el-button>
  </el-card>
</template>

<script>
import {fetchTreeList} from '@/api/productCate'

export default {
  name: "card",
  props: {
  },
  data () {
    return {
      text: '',
      options: [],
      option:''
    }
  },
  methods: {
    async reqTreeClass() {
      const res = await fetchTreeList()
      console.log(res)
      this.options = res
    },
  },
  created() {
    this.reqTreeClass()
  }
}
</script>

<style scoped>
.input-box{
  margin-bottom: 30px;
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
