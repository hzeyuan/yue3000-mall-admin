<template>
  <div id="menuDetails">
    <el-card>
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
          size="mini" style="margin-left: 20px"
          class="btn-add float-right" @click="onOpenDialog()">
        添加
      </el-button>
    </el-card>
    <el-card>
      <div class="flex-box flex justify-center">
        <div class="table-box" style="">
          <el-table v-loading="tableLoading" border
                    :data="ListData" style="width: 100%">
            <el-table-column label="编号" width="50" align="center"
                             type="index">
            </el-table-column>
            <el-table-column label="名称" width="100" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="图标" width="50" align="center">
              <template slot-scope="scope" class="text-center">
                <img :src="scope.row.image" alt="" width="30px"/>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button size="small" @click="onOpenDialog(scope.row)">
                  修改
                </el-button>
                <el-button size="small" @click="onDelete(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div ref="phone" class="phone">
          <div class="my-menu">
            <div class="menu-item" draggable="true"
                 @dragenter="handleDragenter($event, index)"
                 @dragover="handleDragover($event, index)"
                 @dragstart="handleDragstart(index)"
                 v-for="(item, index) in ListData" :key="index">
              <img :src="item.image" alt="" draggable="false">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog
        title="提示"
        :visible.sync="dialogShow"
        width="30%">
      <div class="dialog-main">
        <el-form :model="menuData" :rules="menuRules" label-width="100px" ref="myForm">
          <el-form-item label="功能名称" prop="name">
            <el-input v-model="menuData.name"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <icon-upload v-if="dialogShow" :icon="menuData.image" ref="uploadIcon"></icon-upload>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="menuData.sort"></el-input>
          </el-form-item>
          <el-form-item label="路由" prop="link_address">
            <el-input v-model="menuData.link_address"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="onDialogBtn()">{{ is_Edge ? '修 改' : '添 加' }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getAppMy, deleteAppMyById, updateAppMy, addAppMy} from '@/api/furnish/myMenu'
import IconUpload from "@/components/Upload/IconUpload"
import _ from 'lodash'

export default {
  name: 'MenuDetails',
  components: {IconUpload},
  filters: {
    conversionUse(value) {
      return value === 1
    },
  },
  data() {
    return {
      // 用于刷新页面手机窗口
      iframeShow: false,
      // 数据列表
      ListData: [],
      // 表格数据刷新遮罩层的显示
      tableLoading: false,
      // 菜单数据
      menuData: {
        name: '',
        image: '',
        link_address: '',
      },
      // 菜单数据校验
      menuRules: {
        name: {},
      },
      // 对话框的显示与隐藏
      dialogShow: false,
      // 对话框的状态
      is_Edge: '',
      // 被拖动元素的index
      dragIndex: '',
      // 被替换元素的index
      enterIndex: '',
    }
  },
  mounted() {
    this.reqGetAppMy()
  },
  methods: {
    // 获取数据列表
    async reqGetAppMy() {
      this.iframeShow = false
      const res = await getAppMy()
      this.ListData = res.menu_list
      this.iframeShow = true
    },
    // 打开对话框
    onOpenDialog(menuData = {
      name: '',
      image: '',
      link_address: '',
    }) {
      this.menuData = _.cloneDeep(menuData)
      this.is_Edge = Boolean(menuData.image)
      this.dialogShow = true
    },
    // 点击删除某项
    onDelete(id) {
      this.$confirm('是否要删除该项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteAppMyById(id).then((response) => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000,
          })
          this.reqGetAppMy()
        })
      })
    },
    // 对话框按钮点击
    onDialogBtn() {
      this.$refs['myForm'].validate((valid) => {
        if (!valid) return false
        let data = _.cloneDeep(this.menuData)
        data.image = this.$refs.uploadIcon.gallery
        if (this.is_Edge) {
          updateAppMy(data.id, data).then((res) => {
            this.$message({
              type: "success",
              message: "修改成功",
              duration: 1000,
            })
            this.reqGetAppMy()
            this.dialogShow = false
          })
        } else {
          addAppMy(data).then((res) => {
            this.$message({
              type: "success",
              message: "添加成功",
              duration: 1000,
            })
            this.reqGetAppMy()
            this.dialogShow = false
          })
        }
      })
    },
    handleDragstart(index) {
      this.dragIndex = index;
    },
    handleDragenter(e, index) {
      e.preventDefault()
      if (this.dragIndex !== index) {
        const source = this.ListData[this.dragIndex];
        this.ListData.splice(this.dragIndex, 1);
        this.ListData.splice(index, 0, source);
        // 排序变化后目标对象的索引变成源对象的索引
        this.dragIndex = index;
      }
    },
    handleDragover(e, index) {
      // console.log('拖动', index)
      e.preventDefault()
    },
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 5px;
}

.table-box {
  margin: 20px;
}

.phone {
  margin: 20px;
  width: 350px;
  background-color: #F8F8F8;

  .my-menu {
    overflow: hidden;
    padding: 10px 20px;
    margin: 10px auto;
    width: 335px;
    border-radius: 10px;
    background-color: #FFFFFF;

    .menu-item {
      float: left;
      width: 25%;
      height: 50px;
      margin-bottom: 15px;
      text-align: center;
      font-size: 12px;
      line-height: 16px;

      img {
        margin: 0px auto 10px;
        width: 26px;
      }
    }
  }
}
</style>
