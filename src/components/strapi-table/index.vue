<template>
  <div class="app-container">
    <el-card v-show="showSearch" class="filter-container" shadow="never">
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
        ></el-form>
      </div>
    </el-card>
    <el-card shadow="never">
      <div class="flex items-center justify-between">
        <span class="pr-1">数据列表</span>
        <el-button type="primary" @click="addRow">新增</el-button>
      </div>
    </el-card>
    <div class="table-container">
      <el-table
        ref="orderTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
      >
        <el-table-column
          v-for="column in showColumns"
          :key="column.key"
          :label="column.label"
          :width="column.width"
          align="center"
        >
          <editable-cell
            :editable="column.editable"
            :show-input="column.editable === false ? false : row.editMode"
            :editable-component="column.editableComponent"
            slot-scope="{ row }"
            v-model="row[column.key]"
          >
            <span slot="content">
              <slot :name="column.key" :row="row">
                <span>
                  {{
                    column.filter
                      ? column.filter(row[column.key])
                      : row[column.key]
                  }}
                </span>
              </slot>
            </span>
          </editable-cell>
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="{ row, $index }">
            <el-link
              :underline="false"
              v-for="(opeator, i) in diyBars"
              :key="opeator.name"
              @click="decorateOpeator(row, $index, opeator.callback)"
            >
              {{ opeator.name }}
              <el-divider
                v-if="i !== diyBars.length - 1"
                direction="vertical"
              ></el-divider>
            </el-link>
            <el-link
              :underline="false"
              v-if="rowbarsMaps.edit"
              @click="setEditMode(row, $index)"
            >
              {{ row.rowMode === 'new' ? '保存' : '编辑' }}
              <el-divider direction="vertical"></el-divider>
            </el-link>

            <el-link
              :underline="false"
              v-if="rowbarsMaps.edit"
              type="success"
              @click="saveRow(row, $index)"
            >
              确认
              <el-divider direction="vertical"></el-divider>
            </el-link>

            <el-link
              :underline="false"
              v-if="rowbarsMaps.delete"
              type="danger"
              @click="delRow(row, $index)"
            >
              {{ row.rowMode === 'new' ? '取消' : '删除' }}
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
  import request from '@/utils/request'
  import EditableCell from './components/EditTableCell.vue'
  const defaultListQuery = {
    page: 1,
    pageSize: 10,
  }
  export default {
    name: 'strapi-table',
    components: {
      EditableCell,
    },
    props: {
      //model,绑定strapi模型
      model: {
        type: String,
      },
      router: {
        type: Object,
        default: () => ({}),
      },
      showSearch: {
        //是否显示搜索框
        type: Boolean,
        default: false,
      },
      // table: {
      //   type: Object,
      //   default: {},
      // },
      prefix: {
        type: String,
        default: 'mall-admin',
      },
      columns: [], // 所有列集合
      actionBars: [], //操作栏
      rowBars: {
        //每一行的操作栏
        type: Array,
        default: () => ['edit', 'delete'],
      },
      diyBars: {
        type: Array,
        default: () => [],
      },
    },

    created() {
      const model = this.model
      const { find, findOne, update, del } = this.router
      console.log('find', find)
      this.apis = {
        find: ({ page, pageSize, ...fields }) => {
          const { url = `${this.prefix}/${model}s`, method = 'get' } = find
          return request({
            url,
            method,
            data: { page, pageSize, ...fields },
          })
        },
        findOne: (id) => {
          const { url = `${this.prefix}/${model}/${id}`, method = 'get' } =
            findOne
          return request({
            url,
            method,
            data: { page, pageSize, ...fields },
          })
        },
        update: (id, data) => {
          const { url = `${this.prefix}/${model}/${id}`, method = 'put' } =
            update
          return request({
            url,
            method,
            data,
          })
        },
        delete: (id) => {
          const { url = `${this.prefix}/${model}/${id}`, method = 'delete' } =
            del

          return request({
            url,
            method,
          })
        },
      }
    },
    computed: {
      showColumns() {
        return this.columns.filter((col) => col.hidden !== true) // 过滤所有hidden属性的字段
      },
      rowbarsMaps() {
        const rowbars = {}
        console.log('this.rowbars', this.rowbars)
        this.rowBars.map((opeator) => {
          rowbars[opeator] = true
        })
        return rowbars
      },
    },

    mounted() {
      this.getList()
    },
    data() {
      return {
        apis: {},
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: true,
        list: null,
        total: null,
        operateType: null,
      }
    },
    methods: {
      decorateOpeator(row, $index, callback) {
        callback(row, $index)
      },
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
      // 获取model列表
      async getList() {
        this.listLoading = true
        try {
          const resp = await this.apis.find(this.covertQuery())
          const { list, pagination } = resp
          this.list = list.map((data) => ({ ...data, editMode: false }))
          this.total = pagination.rowCount
        } catch (error) {}
        this.listLoading = false
      },
      setEditMode(row, index) {
        row.editMode = true
      },
      async saveRow(row, index) {
        this.listLoading = true
        row.editMode = false
        const data = {}
        this.columns.map((col) => {
          const { key } = col
          if (key === 'id') return
          if (col.type === Array) {
            data[key] = _.castArray(row[key])
          } else {
            data[key] = col.type(row[key])
          }
        })
        await this.apis.update(row.id, data)
        this.listLoading = false
        this.$message({
          type: 'success',
          message: '修改成功!',
        })
      },
      // 新增
      addRow() {
        const data = {}
        this.columns.map((col) => {
          const { key } = col
          data[key] = col.type()
        })
        this.list.push({
          editMode: true,
          ...data,
          rowMode: 'new',
        })
      },
      //删除
      async delRow(row, index) {
        console.log('row', row, index)
        // 是新增的行
        if (row.rowMode === 'new') {
          console.log('index', index)
          this.list.splice(index, 1)
          return
        }
        this.listLoading = true
        const id = row.id
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
        })
          .then(() => {
            this.apis.delete(id).then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.getList()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
        this.listLoading = false
      },
      //详情
      rowDetail(row, index) {
        // this.dialogVisible = true
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
  .edit-cell {
    min-height: 35px;
    cursor: pointer;
  }
</style>
