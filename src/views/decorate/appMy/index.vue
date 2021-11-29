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
      <div class="phone" ref="phone">
        <div class="model-content" v-if="iframeShow">
          <iframe frameborder="no" src="http://localhost:8080/mobile/pages/user/user" style="width: 100%; height: 100%"></iframe>
        </div>
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
      // 用于刷新页面手机窗口
      iframeShow: false,
      // 数据列表
      ListData: [],
      // 表格数据刷新遮罩层的显示
      tableLoading: false
    }
  },
  methods: {
    // 获取数据列表
    async reqGetAppMy () {
      this.iframeShow = false
      const res = await getAppMy()
      this.ListData = res.menu_list
      this.iframeShow = true
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
      return value === 1;
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
    width: 350px;
    height: 709px;
    z-index: 10;
    padding: 8px 12.5px 9.5px  11.5px;
    border-radius: 30px;
    background-image: url("https://www.uviewui.com/common/iPhone13.png");
    background-repeat: no-repeat;
    background-size: 100%;
    .model-content{
      border-radius: 43px;
      height: 100%;
    }
    iframe{
      width: 100%;
      height: 100%;
      border-radius: 43px;
    }
  }
}
</style>
