<template>
<div class="appMyList">
  <el-card class="operate-container" shadow="never">
    <i class="el-icon-tickets"></i>
    <span>数据列表</span>
    <el-button size="mini" class="btn-add" @click="ontoAdd" style="margin-left: 20px">添加</el-button>
  </el-card>
  <el-card class="filter-container" shadow="never">
    <div class="flex-box">
      <div class="table-box" style="">
        <el-table :data="ListData" style="width: 100%" border v-loading="tableLoading">
          <el-table-column label="编号" width="100" align="center">
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column label="名称" align="center">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="图标" width="100" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.image" alt="" width="30px">
            </template>
          </el-table-column>
          <el-table-column label="排序" width="100" align="center">
            <template slot-scope="scope">{{scope.row.sort}}</template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="small" @click="ontoUpdate(scope.row.id)">修改</el-button>
              <el-button size="small" @click="onDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="phone" style="">
        <iframe src="http://localhost:8080/mobile/pages/user/user" style="width: 100%; height: 100%"></iframe>
      </div>
    </div>
  </el-card>
</div>
</template>

<script>
import {getAppMy, deleteAppMyById} from "@/api/decorate";

export default {
  name: "appMyList",
  components: {

  },
  data () {
    return {
      ListData: [],
      tableLoading: false
    }
  },
  methods: {
    // 获取数据列表
    async reqGetAppMy () {
      const res = await getAppMy()
      this.ListData = res.menu_list
    },
    // 点击跳转到添加页面
    ontoAdd () {
      this.$router.push({
        path: 'addAppMy',
      })
    },
    // 点击跳转到修改页面
    ontoUpdate (id) {
      this.$router.push({
        path: `updateAppMy${id}`,
      })
    },
    // 点击删除某项
    onDelete (id) {
      this.$confirm('是否要删除该项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAppMyById(id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
          this.reqGetAppMy();
        })
      })
    }
  },
  mounted () {
    this.reqGetAppMy ()
  },
  filters: {
    conversionUse (value) {
      if(value == 1) {
        return true
      }
      return false
    }
  },
}
</script>

<style lang="scss" scoped>
.el-card{
  margin: 5px;
}
.flex-box{
  overflow: hidden;
  .table-box{
    float: left;
    width: 65%;
  }
  .phone{
    float: right;
    width: 360px;
    height: 600px;
  }
}
</style>
