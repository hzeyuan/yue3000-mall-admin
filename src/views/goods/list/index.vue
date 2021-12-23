<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
            style="float: right"
            type="primary"
            size="small"
            @click="getList"
        >
          查询结果
        </el-button>
        <el-button
            style="float: right; margin-right: 15px"
            size="small"
            @click="handleResetSearch()"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
            :inline="true"
            :model="listQuery"
            size="small"
            label-width="140px"
        >
          <el-form-item label="输入搜索：">
            <el-input
                v-model="listQuery.keyword"
                style="width: 203px"
                placeholder="商品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品货号：">
            <el-input
                v-model="listQuery.goods_sn"
                style="width: 203px"
                placeholder="商品货号"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-cascader
                v-model="listQuery.productCategoryId"
                :props="{ value: 'id', label: 'name', children: 'child', checkStrictly: true }"
                clearable
                :options="productCateOptions"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="上架状态：">
            <el-select
                v-model="listQuery.is_on_sale"
                placeholder="全部"
                clearable
            >
              <el-option
                  v-for="item in publishStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card shadow="never">
      <div class="flex items-center justify-between">
        <span class="pr-1">数据列表</span>
        <el-button class="btn-add" type="primary" @click="goAddPage">
          添加商品
        </el-button>
      </div>
      <div class="flex items-center justify-between">
        <div class="pt-2">
          <span class="font-bold">批量：</span>
          <el-radio-group @change="batchOperation" v-model="batchOption">
            <el-radio-button label="batchSale">上架</el-radio-button>
            <el-radio-button label="batchNotSale">下架</el-radio-button>
            <el-radio-button label="batchRecommend">推荐</el-radio-button>
            <el-radio-button label="batchNotRecommend">
              取消推荐
            </el-radio-button>
            <el-radio-button label="batchNew">设为新品</el-radio-button>
            <el-radio-button label="batchNotNew">取消新品</el-radio-button>
            <el-radio-button label="batchDel">删除</el-radio-button>
          </el-radio-group>
        </div>
        <el-pagination
            background
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="listQuery.pageSize"
            :page-sizes="[5, 10, 15]"
            :current-page.sync="listQuery.page"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <div>
        <el-radio-group
            @change="changeGoodsType"
            class="pt-2"
            v-model="goodsTypeOption"
        >
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="is_sale">在售中</el-radio-button>
          <el-radio-button label="not_sale">未上架</el-radio-button>
        </el-radio-group>
      </div>
    </el-card>
    <div>
      <el-table
          ref="productTable"
          v-loading="listLoading"
          :data="list"
          :row-style="{ height: '80px' }"
          style="width: 100%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column
            type="selection"
            width="60"
            align="center"
        ></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="商品信息"
                         show-overflow-tooltip
                         width="420"
                         align="center"
        >
          <template #default="{ row }">
            <div style="display: flex">
              <el-image
                  style="width: 70px; height: 70px"
                  fit="cover"
                  :src="row.pic_url">
              </el-image>
              <div
                  style="
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  text-align: start;
                "
              >
                <div class="truncate w-60">{{ row.name }}</div>
                <el-row>
                  <el-col :span="16">
                    <div>
                      <span>商品ID：</span>
                      <span>{{ row.id }}</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div>
                      <span>状态：</span>
                      <span class="font-bold">
                        {{ row.is_on_sale ? '在售中' : '未上架' }}
                      </span>
                    </div>
                  </el-col>
                </el-row>
                <div>
                  <span>商品编号：{{ row.goods_sn }}</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="类目" width="120" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.categoryName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="数据" width="120" align="center">
          <template slot-scope="scope">
            <div style="font-size: 12px">
              <p>销售量：</p>
              <p>浏览量：</p>
              <p>收藏量：</p>
              <p>星级：</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="120" align="center">
          <template slot-scope="scope">
            <p>￥{{ getPriceRange(scope.row) }}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column> -->
        <el-table-column label="库存" width="100" align="center">
          <template slot-scope="scope">
            <p>{{ getStock(scope.row) }}</p>
            <!-- <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleShowSkuEditDialog(scope.$index, scope.row)"
              circle
            ></el-button> -->
          </template>
        </el-table-column>
        <el-table-column label="销量" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sale }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <div class="flex">
              <div
                  class="flex flex-col items-start"
                  style="border: 1px solid transparent; font-size: 13px"
              >
                <div>
                  上架：
                  <el-switch
                      v-model="scope.row.is_on_sale"
                      :active-value="1"
                      :inactive-value="0"
                      @change="handlePublishStatusChange(scope.$index, scope.row)"
                  ></el-switch>
                </div>
                <div>
                  新品：
                  <el-switch
                      v-model="scope.row.is_new"
                      :active-value="1"
                      :inactive-value="0"
                      @change="handleNewStatusChange(scope.$index, scope.row)"
                  ></el-switch>
                </div>
                <div>
                  推荐：
                  <el-switch
                      v-model="scope.row.is_best"
                      :active-value="1"
                      :inactive-value="0"
                      @change="
                      handleRecommendStatusChange(scope.$index, scope.row)
                    "
                  ></el-switch>
                </div>
              </div>
              <div>
                <div>
                  <el-divider direction="vertical"></el-divider>
                  <el-link
                      :underline="false"
                      @click="goUpdatePage(scope.$index, scope.row)"
                  >
                    编辑
                  </el-link>
                </div>
                <div>
                  <el-divider direction="vertical"></el-divider>
                  <el-link
                      :underline="false"
                      @click="handleDelete(scope.$index, scope.row)"
                  >
                    删除
                  </el-link>
                </div>
                <div>
                  <el-divider direction="vertical"></el-divider>
                  <el-link :underline="false">更多</el-link>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
          background
          layout="total, sizes,prev, pager, next,jumper"
          :page-size="listQuery.pageSize"
          :page-sizes="[5, 10, 15]"
          :current-page.sync="listQuery.page"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  fetchList,
  updateDeleteStatus,
  updateNewStatus,
  updateRecommendStatus,
  updatePublishStatus,
  DeleteGoods,
} from '@/api/product'
import {fetchTreeList} from "@/api/category";

const _ = require('lodash/core')
const defaultListQuery = {
  keyword: null,
  page: 1,
  pageSize: 5,
  is_on_sale: null,
  verifyStatus: null,
  product_sn: null,
  productCategoryId: [],
  brandId: null,
}
export default {
  name: 'ProductList',
  filters: {
    verifyStatusFilter(value) {
      if (value === 1) {
        return '审核通过'
      } else {
        return '未审核'
      }
    },
  },
  data() {
    return {
      goodsTypeOption: 'all', //商品类别
      batchOption: '', //批量选项
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      selectProductCateValue: null,
      multipleSelection: [],
      productCateOptions: [],
      brandOptions: [],
      publishStatusOptions: [
        {
          value: 1,
          label: '在售中',
        },
        {
          value: 0,
          label: '下架',
        },
      ],
    }
  },
  computed: {
    // 商品库存
  },
  watch: {
    selectProductCateValue: function (newValue) {
      if (newValue != null && newValue.length === 2) {
        this.listQuery.productCategoryId = newValue[1]
      } else {
        this.listQuery.productCategoryId = null
      }
    },
  },
  created() {
    this.getList()
    this.reqGetCategories()
  },
  methods: {
    // 全部，在售中，未上架
    changeGoodsType(v) {
      switch (v) {
        case 'all':
          this.listQuery = {
            ...defaultListQuery,
            page: this.listQuery.page,
            pageSize: this.listQuery.pageSize,
          }
          break
        case 'is_sale':
          this.listQuery.is_on_sale = 1
          break
        case 'not_sale':
          this.listQuery.is_on_sale = 0
          break
      }
      this.getList()
    },
    // 批量操作
    async batchOperation(operateType) {
      if (
          this.multipleSelection == null ||
          this.multipleSelection.length < 1
      ) {
        this.batchOption = ''
        this.$message({
          message: '请选择要操作的商品',
          type: 'warning',
          duration: 1000,
        })
        return
      }
      console.log('operateType', operateType)
      this.$confirm('是否要进行该批量操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        console.log('operateType2', operateType)
        let ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id)
        }
        switch (operateType) {
          case 'batchSale':
            await this.updatePublishStatus(1, ids)
            break
          case 'batchNotSale':
            await this.updatePublishStatus(0, ids)
            break
          case 'batchRecommend':
            await this.updateRecommendStatus(1, ids)
            break
          case 'batchNotRecommend':
            await this.updateRecommendStatus(0, ids)
            break
          case 'batchNew':
            await this.updateNewStatus(1, ids)
            break
          case 'batchNotNew':
            await this.updateNewStatus(0, ids)
            break
          case 'batchDel':
            await this.updateDeleteStatus(1, ids)
            break
          default:
            break
        }
        this.batchOption = ''
        this.getList()
      })
    },
    getProductSkuSp(row, index) {
      let spData = JSON.parse(row.spData)
      if (spData != null && index < spData.length) {
        return spData[index].value
      } else {
        return null
      }
    },
    //获取商品库存
    getStock(row) {
      const productsStock = _.map(row.goods_products, 'number')
      const stock = productsStock.reduce((a, b) => a + b, 0)
      return stock
    },
    // 获取商品价格区间
    getPriceRange(row) {
      const prices = _.map(row.goods_products, 'price')
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      if (minPrice === maxPrice) {
        return `${minPrice}`
      } else {
        return `${minPrice}-${maxPrice}`
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.funCovertQuery()).then((response) => {
        this.listLoading = false
        const {list, pagination} = response
        this.list = list
        this.total = pagination.pageCount * pagination.pageSize
      })
    },
    handleSizeChange(val) {
      this.listQuery.page = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async handlePublishStatusChange(index, row) {
      let ids = []
      ids.push(row.id)
      await this.updatePublishStatus(row.is_on_sale, ids)
    },
    async handleNewStatusChange(index, row) {
      let ids = []
      ids.push(row.id)
      await this.updateNewStatus(row.is_new, ids)
    },
    async handleRecommendStatusChange(index, row) {
      let ids = []
      ids.push(row.id)
      await this.updateRecommendStatus(row.is_best, ids)
    },
    // 重置搜索条件
    handleResetSearch() {
      this.selectProductCateValue = []
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    // 删除商品 单个
    handleDelete(index, row) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        DeleteGoods(row.id).then((res) => {
          this.goAddPage()
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000,
          })
        })
      })
    },
    // 添加商品页面
    goAddPage() {
      this.$router.push({path: '/goods/add'})
    },
    //更新商品页面
    goUpdatePage(index, row) {
      this.$router.push({path: '/goods/update', query: {id: row.id}})
    },
    handleShowProduct(index, row) {
      console.log('handleShowProduct', row)
    },
    //批量更新上下架
    async updatePublishStatus(publishStatus, ids) {
      await updatePublishStatus({status: publishStatus, ids}).then(
          (response) => {
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000,
            })
          }
      )
    },
    //批量更新新品状态
    async updateNewStatus(newStatus, ids) {
      await updateNewStatus({status: newStatus, ids}).then((response) => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000,
        })
      })
    },
    // 批量更新推荐状态
    async updateRecommendStatus(recommendStatus, ids) {
      await updateRecommendStatus({status: recommendStatus, ids}).then(
          (response) => {
            console.log('response123', response)
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000,
            })
          }
      )
    },
    // 删除商品
    async updateDeleteStatus(deleteStatus, ids) {
      await updateDeleteStatus({status: deleteStatus, ids}).then(
          (response) => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000,
            })
          }
      )
      this.getList()
    },
    // 获取分类数据
    async reqGetCategories() {
      const res = await fetchTreeList()
      this.productCateOptions = res.list
    },
    // 查询参数的处理
    funCovertQuery() {
      console.log('123456', this.listQuery)
      let {productCategoryId, ...query} = this.listQuery
      // console.log("分类", productCategoryId)
      let data = {
        ...query,
      }
      if (productCategoryId && productCategoryId.length > 0) {
        let level = productCategoryId.length
        let category_id = productCategoryId[level - 1]
        data = {
          ...data,
          level,
          category_id
        }
      }
      return data
    }
  },
}
</script>
<style lang="scss" scoped>

#app-container {
  p {
    margin: 0;
  }
}

.el-image {
  width: 70px;
  height: 70px;

  img {
    width: 70px;
    height: 70px;
  }
}
</style>
