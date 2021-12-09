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
        >
          <el-form-item
            :key="col.key"
            v-for="col in searchQueryList"
            :label="`${col.label}:`"
          >
            <slot :name="`search_${col.key}`">
              <component
                v-bind="col.searchCompoent.attr"
                :is="col.searchCompoent.name"
                v-model="listQuery[col.key]"
              ></component>
            </slot>
          </el-form-item>
        </el-form>
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
        ref="table"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
      >
        <el-table-column
          v-for="column in showColumns"
          :width="column.width"
          :key="column.key"
          :prop="column.key"
          :label="column.label"
          align="center"
        >
          <template slot-scope="scope">
            <ele-editable
              :request-fn="handleChange"
              :custom-attrs="column.customAttrs"
              :default-value="column.defaultValue"
              :display-formatter="column.displayFormatter"
              :empty-text="column.emptyText"
              :field="column.key"
              :title="column.label"
              :options="column.options"
              :type="column.componentType"
              v-model="scope.row[column.key]"
            />
          </template>
          <!-- <editable-cell
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
          </editable-cell> -->
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
              v-if="rowbarsMaps.delete"
              type="danger"
              @click="delRow(row, $index)"
            >
              <el-divider direction="vertical"></el-divider>
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
    <!-- 模态 -->
    <el-dialog :title="modal.title" :visible.sync="modal.visible" width="30%">
      <div class="ml-10">
        <div
          v-for="column in showColumns"
          :key="column.key"
          class="flex items-start pb-1"
        >
          <span class="w-20">{{ column.label }}:</span>
          <div>
            <component
              :is="`${componentName(column.componentType)}`"
              :customAttrs="column.customAttrs"
              :displayValue="column.displayValue"
              :field="column.key"
              :noWrapper="true"
              :options="column.options"
              :title="column.label"
              :type="column.componentType"
              ref="com"
            ></component>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modal.visible = false">取 消</el-button>
        <el-button type="primary" @click="modal.visible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import request from '@/utils/request'
  import qs from 'qs'
  import EleEditableUrl from 'vue-ele-editable/src/components/EleEditableUrl'
  import EleEditableText from 'vue-ele-editable/src/components/EleEditableText'
  import EleEditableTime from 'vue-ele-editable/src/components/EleEditableTime'
  import EleEditableDate from 'vue-ele-editable/src/components/EleEditableDate'
  import EleEditableInput from 'vue-ele-editable/src/components/EleEditableInput'
  import EleEditableImage from 'vue-ele-editable/src/components/EleEditableImage'
  import EleEditableColor from 'vue-ele-editable/src/components/EleEditableColor'
  import EleEditableRadio from 'vue-ele-editable/src/components/EleEditableRadio'
  import EleEditableStatus from 'vue-ele-editable/src/components/EleEditableStatus'
  import EleEditableSelect from 'vue-ele-editable/src/components/EleEditableSelect'
  import EleEditableNumber from 'vue-ele-editable/src/components/EleEditableNumber'
  import EleEditableSwitch from 'vue-ele-editable/src/components/EleEditableSwitch'
  import EleEditableTimeText from 'vue-ele-editable/src/components/EleEditableTimeText'
  import EleEditableDateText from 'vue-ele-editable/src/components/EleEditableDateText'
  import EleEditableTextarea from 'vue-ele-editable/src/components/EleEditableTextarea'
  import EleEditableDatetime from 'vue-ele-editable/src/components/EleEditableDatetime'
  import EleEditableCheckbox from 'vue-ele-editable/src/components/EleEditableCheckbox'
  import EleEditableUploadImage from 'vue-ele-editable/src/components/EleEditableUploadImage'
  import EleEditableDatetimeText from 'vue-ele-editable/src/components/EleEditableDatetimeText'
  const defaultListQuery = {
    page: 1,
    pageSize: 10,
  }
  export default {
    name: 'strapi-table',
    components: {
      EleEditableUrl,
      EleEditableText,
      EleEditableDate,
      EleEditableTime,
      EleEditableImage,
      EleEditableInput,
      EleEditableColor,
      EleEditableRadio,
      EleEditableSelect,
      EleEditableSwitch,
      EleEditableNumber,
      EleEditableStatus,
      EleEditableTimeText,
      EleEditableDateText,
      EleEditableTextarea,
      EleEditableDatetime,
      EleEditableCheckbox,
      EleEditableUploadImage,
      EleEditableDatetimeText,
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
      // 列表查询字段
      querys: {
        type: Object,
        default: () => ({}),
      },
    },
    watch: {
      querys: {
        deep: true,
        handler(querys) {
          console.log('listquery', querys)
          const listQuery = { ...this.listQuery, ...querys }
          _.map(listQuery, (v, k) => {
            this.$set(this.listQuery, k, v)
          })
        },
      },
    },
    created() {
      const model = this.model
      //找到所有search:true
      const searchQueryList = _.filter(this.columns, { search: true })
      this.searchQueryList = searchQueryList
      _.map(searchQueryList, 'key').map((key) => {
        this.$set(this.listQuery, key, '')
      })
      const { find, findOne, update, del } = this.router
      this.apis = {
        find: ({ page, pageSize, ...fields }) => {
          console.log('fields', fields)
          let { url = `${this.prefix}/${model}s`, method = 'get' } = find
          const filters = { _where: [] }
          const validFields = {}
          for (const key in fields) {
            if (fields[key] !== '') {
              validFields[key] = fields[key]
            }
          }
          const fieldsQs = _.keyBy(searchQueryList, 'key')
          _.map(validFields, (value, key) => {
            let opeator = `${key}_eq` || fieldsQs[key]['qs']
            filters[`_where`].push({
              [opeator]: _.trim(value),
            })
          })
          if (!_.isEmpty(filters)) {
            url += `?${qs.stringify(filters)}`
          }
          return request({
            url,
            method,
            params: { page, pageSize },
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
        searchQueryList: [],
        modal: { visible: false, title: '' },
        payload: {},
      }
    },
    methods: {
      handleChange(data) {
        console.log(data)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 100)
        })
      },
      decorateOpeator(row, $index, callback) {
        callback(row, $index)
      },
      // 重置查询条件
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery)
        // this.queryReset()
        this.$emit('queryReset')
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
        }
      },
      // 获取model列表
      async getList() {
        this.listLoading = true
        try {
          const resp = await this.apis.find(this.covertQuery())
          const { list, pagination } = resp
          this.list = list
          this.total = pagination.rowCount
          console.log('list', list)
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
        this.columns.map((col) => {
          const { key } = col
          let value = col.defaultValue || col.type()
          // if (col.displayFormatter) {
          //   value = col.displayFormatter(col.defaultValue)
          // }
          this.$set(this.payload, key, value)
        })
        // this.newdata = newdata
        console.log('newData', this.payload)
        // this.list.push({
        //   editMode: true,
        //   ...data,
        //   inline: true,
        //   rowMode: 'new',
        // })
        this.modal['title'] = '新增'
        this.modal['visible'] = true
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
        this.$confirm('此操作将删除此记录, 是否继续?', '提示', {
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
      // 添加模态，组件名称转换
      componentName(type) {
        let name = 'ele-editable-' + type
        switch (type) {
          case 'text':
            name = 'ele-editable-input'
            break
          case 'image':
            name = 'ele-editable-upload-image'
            break
          default:
        }
        return name
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
