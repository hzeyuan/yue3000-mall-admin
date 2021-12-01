<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddProductCate()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productCateTable" style="width: 100%" :data="list" row-key="id" border
                v-loading = "listLoading"  :tree-props="{children: 'child', hasChildren: 'hasChildren'}">
        <el-table-column label="编号"
                         width="50" align="center" type="index"
                         :index="indexMethod">
        </el-table-column>
        <el-table-column label="级别"
                         width="100" align="left">
          <template slot-scope="scope">{{ scope.row.level | levelFilter }}</template>
        </el-table-column>
        <el-table-column label="分类名称"
                         prop="name" align="center">
        </el-table-column>
        <el-table-column label="类目图标"
                         width="100" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.icon_url" alt="" width="20px" height="20px">
          </template>
        </el-table-column>
        <el-table-column label="类目图片"
                         width="150" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic_url" alt="" width="30px">
          </template>
        </el-table-column>
        <el-table-column label="类别描述"
                         prop="desc" width="200" align="center">
        </el-table-column>
        <el-table-column label="排序"
                         prop="sort_order" width="100" align="center">
        </el-table-column>
        <el-table-column label="操作"
                         width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {fetchList, fetchTreeList, deleteProductCate, updateShowStatus, updateNavStatus} from '@/api/productCate'

export default {
  name: "productCateList",
  data() {
    return {
      // 分类列表
      list: [],
      // 请求加载动画
      listLoading: true,
    }
  },
  created() {
    this.reqGetTreeList()
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    }
  },
  methods: {
    // 树形分类数据请求
    async reqGetTreeList () {
      const res = await fetchTreeList()
      this.list = res
      this.listLoading = false
    },
    // 跳转到添加分类
    handleAddProductCate() {
      this.$router.push('/pms/addProductCate');
    },
    // 修改分类
    handleUpdate(index, row) {
      this.$router.push({path: '/pms/updateProductCate', query: {id: row.id}});
    },
    // 删除分类
    handleDelete(index, row) {
      this.$confirm('是否要删除该分类', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProductCate(row.id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
          this.reqGetTreeList();
        });
      });
    },
    // 列表序号生成
    indexMethod (index) {
      return index + 1
    }
  },
  filters: {
    levelFilter(value) {
      if (value === 'L1') {
        return '一级';
      } else if (value === 'L2') {
        return '二级';
      }
    },
  }
}
</script>

<style scoped>

</style>
