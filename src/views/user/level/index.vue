<template>
  <div class="app-container">
    <el-card shadow="never">
      <div class="flex items-center justify-between">
        <span class="pr-1">数据列表</span>
        <el-button type="primary" @click="goAddPage">新增用户等级</el-button>
      </div>
    </el-card>
    <div class="table-container">
      <el-table
        ref="orderTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
      >
        <!-- <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column> -->
        <el-table-column label="等级级别" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="等级名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="等级图标" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.image" fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="用户数" align="center">
          <template slot-scope="scope">
            {{ `${scope.row.userCount || 0}` }}
          </template>
        </el-table-column>
        <el-table-column label="等级折扣" align="center">
          <template slot-scope="scope">
            {{ scope.row.discount || '无' }}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link class="pr-1" type="primary" :underline="false">
              详情
            </el-link>
            <el-link
              class="pr-1"
              type="primary"
              :underline="false"
              @click="goEditPage(scope.row.id)"
            >
              编辑
            </el-link>
            <el-link
              type="danger"
              :underline="false"
              @click="deleteUserLevel(scope.row.id)"
            >
              删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 15]"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
  import { userLevelList as fetchList, deleteUserLevel } from '@/api/user'
  import { formatDate } from '@/utils/date'
  const defaultListQuery = {
    page: 1,
    pageSize: 10,
    orderSn: null,
    receiverKeyword: null,
    status: null,
    orderType: null,
    sourceType: null,
    createTime: null,
  }
  export default {
    name: 'userLevel',
    components: {},
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: true,
        list: null,
        total: null,
        operateType: null,
      }
    },
    created() {
      this.getList()
    },
    filters: {
      formatCreateTime(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
    methods: {
      // 重置查询条件
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery)
      },
      // 修改分页pageSzie
      handleSizeChange(val) {
        this.listQuery.page = 1
        this.listQuery.pageSize = val
        this.getList()
      },
      //修改页码
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },

      covertQuery() {
        const { keyword, ...query } = this.listQuery
        return {
          ...query,
          phone: keyword,
          username: keyword,
        }
      },
      getList() {
        this.listLoading = true
        fetchList(this.covertQuery()).then((response) => {
          this.listLoading = false
          const { list, pagination } = response
          this.list = list
          this.total = pagination.rowCount
        })
      },
      // 新增用户等级
      goAddPage() {
        this.$router.push('/user/level/add')
      },
      goEditPage(id) {
        this.$router.push({ path: '/user/level/edit', query: { id } })
      },
      //删除用户等级
      async deleteUserLevel(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
        })
          .then(() => {
            deleteUserLevel(id).then((res) => {
              this.getList()
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      },
    },
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
  body {
    margin: 0;
  }
</style>
