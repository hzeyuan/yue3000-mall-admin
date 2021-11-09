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
                v-loading = "listLoading">
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
import {fetchList, deleteProductCate, updateShowStatus, updateNavStatus} from '@/api/productCate'

export default {
  name: "productCateList",
  data() {
    return {
      // 分类列表
      list: [
        {
          description: null,
          icon: null,
          id: 1,
          keywords: "服装",
          level: 0,
          name: "服装",
          navStatus: 1,
          parentId: 0,
          productCount: 100,
          productUnit: "件",
          showStatus: 1,
          sort: 1
        },
        {
          description: null,
          icon: null,
          id: 2,
          keywords: "手机数码",
          level: 0,
          name: "手机数码",
          navStatus: 1,
          parentId: 0,
          productCount: 100,
          productUnit: "件",
          showStatus: 1,
          sort: 1
        },
        {
          description: null,
          icon: null,
          id: 3,
          keywords: "家用电器",
          level: 0,
          name: "家用电器",
          navStatus: 1,
          parentId: 0,
          productCount: 100,
          productUnit: "件",
          showStatus: 1,
          sort: 1
        },
        {
          description: null,
          icon: null,
          id: 4,
          keywords: "家具家装",
          level: 0,
          name: "家具家装",
          navStatus: 1,
          parentId: 0,
          productCount: 100,
          productUnit: "件",
          showStatus: 1,
          sort: 1
        },
        {
          description: null,
          icon: null,
          id: 5,
          keywords: "汽车用品",
          level: 0,
          name: "汽车用品",
          navStatus: 1,
          parentId: 0,
          productCount: 100,
          productUnit: "件",
          showStatus: 1,
          sort: 1
        },
      ],
      // 一级菜单个数 已弃用
      total: null,
      // 请求加载动画
      listLoading: true,
      // 分页菜单  已弃用
      listQuery: {
        // 页码
        pageNum: 1,
        // 每页条数
        pageSize: 5
      },
      // 请求参数 父类菜单id 已弃用
      parentId: 0
    }
  },
  created() {
    this.reqGetList()
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    }
  },
  methods: {
    // 分类数据请求
    async reqGetList () {
      const res = await fetchList('')
      this.initList(res)
    },
    // 分类菜单初始化树形结构
    initList (List) {
      const map = {};
      const val = [];
      List.forEach ((item) => {
        map[item.id] = item;
      })
      List.forEach((item) => {
        const parent = map[item.pid];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          val.push(item);
        }
      });
      console.log(val)
      this.list = val
      this.total = val.length
      this.listLoading = false
    },


    resetParentId() {
      this.listQuery.pageNum = 1;
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    handleAddProductCate() {
      this.$router.push('/pms/addProductCate');
    },
    getList() {
      this.listLoading = true;
      fetchList(this.parentId, this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleNavStatusChange(index, row) {
      let data = new URLSearchParams();
      let ids = [];
      ids.push(row.id)
      data.append('ids', ids);
      data.append('navStatus', row.navStatus);
      updateNavStatus(data).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
    },
    // 修改分类
    handleUpdate(index, row) {
      this.$router.push({path: '/pms/updateProductCate', query: {id: row.id}});
    },
    // 删除分类
    handleDelete(index, row) {
      this.$confirm('是否要删除该品牌', '提示', {
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
          this.getList();
        });
      });
    },
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
    disableNextLevel(value) {
      if (value === 0) {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>

<style scoped>

</style>
