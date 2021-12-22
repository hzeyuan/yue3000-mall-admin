<template>
  <div id="classGoods">
    <el-card>
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="float-right mr-5" type="primary" @click="handleAddProductCate()">
        添加
      </el-button>
    </el-card>
    <el-card class="table-container">
      <el-table
          ref="productCateTable"
          style="width: 100%"
          :data="list"
          row-key="id"
          @selection-change="handleSelectionChange"
          v-loading="listLoading"
          :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
      >
        <el-table-column
            type="selection"
            width="60"
            align="center"
        ></el-table-column>
        <el-table-column
            label="编号"
            width="50"
            align="center"
            type="index"
            :index="indexMethod"
        ></el-table-column>
        <el-table-column label="级别" width="100" align="left">
          <template slot-scope="scope">
            {{ scope.row.level | levelFilter }}
          </template>
        </el-table-column>
        <el-table-column
            label="分类名称"
            prop="name"
            align="center"
        ></el-table-column>
        <el-table-column label="类目图标" width="100" align="center">
          <template slot-scope="scope">
            <!--            {{ scope.row.icon_url }}-->
            <el-image
                style="width: 50px; height: 50px"
                fit="fill"
                :src="scope.row.icon_url"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="类目图片" width="150" align="center">
          <template slot-scope="scope">
            <el-image
                style="width: 50px; height: 50px"
                fit="cover"
                :src="scope.row.pic_url"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
            label="类别描述"
            prop="desc"
            width="200"
            align="center"
        ></el-table-column>
        <el-table-column
            label="排序"
            prop="sort_order"
            width="100"
            align="center"
        ></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleUpdate(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {fetchTreeList, deleteProductCate} from '@/api/category'

export default {
  name: 'goodsCategory',
  data() {
    return {
      // 分类列表
      list: [],
      // 请求加载动画
      listLoading: true,
      multipleSelection: [],
    }
  },
  created() {
    this.reqGetTreeList()
  },
  watch: {
    $route(route) {
      this.resetParentId()
      this.getList()
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 树形分类数据请求
    async reqGetTreeList() {
      const res = await fetchTreeList()
      this.list = res.list
      this.listLoading = false
    },
    // 跳转到添加分类
    handleAddProductCate() {
      this.$router.push('/goods/category/add')
    },
    // 修改分类
    handleUpdate(index, row) {
      this.$router.push({
        path: '/goods/category/update',
        query: {id: row.id},
      })
    },
    // 删除分类
    handleDelete(index, row) {
      this.$confirm('是否要删除该分类', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteProductCate(row.id).then((response) => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000,
          })
          this.reqGetTreeList()
        })
      })
    },
    // 列表序号生成
    indexMethod(index) {
      return index + 1
    },
  },
  filters: {
    levelFilter(value) {
      if (value === 'L1') {
        return '一级'
      } else if (value === 'L2') {
        return '二级'
      } else if (value === 'L3') {
        return '三级'
      }
    }
  },
}
</script>

<style scoped>
</style>
