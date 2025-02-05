<template>
  <div class="app-container">
    <!-- 查询 -->
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
    <!-- 操作栏 -->
    <el-card shadow="never">
      <div class="flex items-center justify-between">
        <span class="pr-1">数据列表</span>
        <div v-for="actionBar in showActionBars" :key="actionBar">
          <el-button
            v-show="actionBar === 'add'"
            type="primary"
            @click="addRow"
          >
            新增
          </el-button>
        </div>
      </div>
    </el-card>
    <!-- 表格 -->
    <div class="table-container">
      <el-table
        ref="table"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
      >
        <el-table-column
          align="center"
          width="60px"
          label="序号"
          v-if="showIndex"
        >
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          v-for="column in showColumns"
          :width="column.width"
          :key="column.key"
          :prop="column.key"
          :label="column.label"
          align="center"
        >
          <template slot-scope="scope">
            <slot :name="column.key" :row="scope.row">
              <ele-editable
                :request-fn="(data) => submit(scope.row.id, data)"
                :custom-attrs="column.customAttrs"
                :default-value="column.defaultValue"
                :display-formatter="column.displayFormatter"
                :isNoWrapper="column.isNoWrapper"
                :empty-text="column.emptyText"
                :field="column.key"
                :title="column.label"
                :options="column.options"
                :type="column.componentType"
                v-model="scope.row[column.key]"
              ></ele-editable>
            </slot>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          v-if="Object.keys(showRowBars).length > 0"
          min-width="120"
        >
          <template slot-scope="{ row, $index }">
            <el-link
              :underline="false"
              v-for="(opeator, i) in showRowBars"
              :type="opeator.type || 'info'"
              :key="opeator.name"
              @click="decorateOpeator(row, $index, opeator.callback)"
            >
              <el-divider
                v-if="i !== diyBars.length - 1"
                direction="vertical"
              ></el-divider>
              {{ opeator.name }}
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
    <!-- 添加模态 -->
    <el-dialog
      destroy-on-close
      :title="modal.title"
      :visible.sync="modal.visible"
      width="30%"
    >
      <slot name="add">
        <div v-if="modal.visible" class="ml-4">
          <el-form size="mini" label-position="right" label-width="80px">
            <el-form-item
              v-for="column in showColumns"
              :key="column.key"
              :label="`${column.label}:`"
            >
              <component
                :is="`${componentName(column.componentType)}`"
                :customAttrs="column.customAttrs"
                :displayValue="column.displayValue"
                :field="column.key"
                :value="payload[column.key]"
                :noWrapper="false"
                :options="column.options"
                :title="column.label"
                :type="column.componentType"
                :computedValue="column.type()"
                @change="handleChangePayload"
                @update="
                  (value) => {
                    handleUpdatePayload(column.key, value)
                  }
                "
              ></component>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="modal.visible = false">取 消</el-button>
          <el-button type="primary" @click="submitNewForm">确 定</el-button>
        </span>
      </slot>
    </el-dialog>
    <!-- 描述详情模态 -->
    <el-dialog
      destroy-on-close
      title="详情"
      :visible.sync="detailModal"
      width="30%"
    >
      <div v-if="detailModal" class="ml-4">
        <el-descriptions
          size="mini"
          label-position="left"
          direction="vertical"
          colon
          :column="2"
          label-width="80px"
        >
          <el-descriptions-item
            v-for="column in showColumns"
            :key="column.key"
            :label="`${column.label}`"
          >
            <ele-editable
              :field="column.key"
              :custom-attrs="column.customAttrs"
              :default-value="column.defaultValue"
              :display-formatter="column.displayFormatter"
              :empty-text="column.emptyText"
              :title="column.label"
              :type="componentName(column.componentType, 'desc')"
              v-model="list[currentRow][column.key]"
            />
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailModal = false">取 消</el-button>
        <el-button type="primary" @click="detailModal = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import qs from 'qs'
  import EleEditable from './EleEditable.vue'
  import EleEditableWrapperForm from './wrapper/EleEditableWrapperForm'
  import EleEditableUrl from './components/EleEditableUrl'
  import EleEditableText from './components/EleEditableText'
  import EleEditableTime from './components/EleEditableTime'
  import EleEditableDate from './components/EleEditableDate'
  import EleEditableInput from './components/EleEditableInput'
  import EleEditableImage from './components/EleEditableImage'
  import EleEditableColor from './components/EleEditableColor'
  import EleEditableRadio from './components/EleEditableRadio'
  import EleEditableStatus from './components/EleEditableStatus'
  import EleEditableSelect from './components/EleEditableSelect'
  import EleEditableNumber from './components/EleEditableNumber'
  import EleEditableSwitch from './components/EleEditableSwitch'
  import EleEditableTimeText from './components/EleEditableTimeText'
  import EleEditableDateText from './components/EleEditableDateText'
  import EleEditableTextarea from './components/EleEditableTextarea'
  import EleEditableDatetime from './components/EleEditableDatetime'
  import EleEditableCheckbox from './components/EleEditableCheckbox'
  import EleEditableUploadImage from './components/EleEditableUploadImage'
  import EleEditableDatetimeText from './components/EleEditableDatetimeText'
  import EleEditableDatetimeRange from './components/EleEditableDatetimeRange'
  import EleEditableMultipleSelect from './components/EleEditableMultipleSelect'

  const defaultListQuery = {
    page: 1,
    pageSize: 10,
  }

  export default {
    name: 'strapi-table',
    components: {
      EleEditable,
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
      EleEditableWrapperForm,
      EleEditableDatetimeRange,
      EleEditableMultipleSelect,
    },
    props: {
      //model,绑定strapi模型
      model: {
        type: String,
      },
      router: {
        type: Object,
        default: () => ({
          find: {},
          update: {},
          del: {},
          create: {},
        }),
      },
      showIndex: {
        type: Boolean,
        default: false,
      }, // 是否显示index列
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
      actionBars: ['add'], //操作栏
      rowBars: {
        //每一行的操作栏
        type: Object,
        default: () => ({ detail: { name: '详情' }, delete: { name: '删除' } }),
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
      // 查询字段，更新
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
      //加工colmns
      this.columns.map((col) => {
        const { search, key, componentType, customAttrs } = col
        console.log('type', componentType, customAttrs)
        if (componentType === 'image' || componentType === 'upload-image') {
          // col.customAttrs = {
          //   action: 'http://localhost:1337/upload',
          //   name: 'files',
          //   responseFn: (response, file, fileList) => {
          //     console.log('response', response, file, fileList)
          //     return response[0].url
          //   },
          // }
        }
        if (search) {
          this.$set(this.listQuery, key, '')
        }
        this.$set(this.payload, key, col.type())
      })
      const { find, findOne, update, del, create } = this.router
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
          console.log('fieldsQs', fieldsQs, validFields)
          _.map(validFields, (value, key) => {
            let opeator = fieldsQs[key]['qs'] || `${key}_eq`
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
          console.log('update')
          let { url = '', method = 'put' } = update
          if (!url) {
            url = `${this.prefix}/${model}/${id}`
          } else {
            url = _.replace(url, ':id', id)
          }
          console.log('url', url)
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
        create: (data) => {
          let { url = `${this.prefix}/${model}`, method = 'post' } = create
          return request({
            url,
            method,
            data,
          })
        },
      }
    },
    computed: {
      // 过滤所有hidden属性的列
      showColumns() {
        return this.columns.filter((col) => col.hidden !== true)
      },
      showActionBars() {
        return this.actionBars ? this.actionBars : ['add']
      },
      showRowBars() {
        if (this.rowBars.detail && !this.rowBars['detail'].callback) {
          this.rowBars['detail'].callback = this.rowDetail
        }
        if (this.rowBars.delete && !this.rowBars['delete'].callback) {
          console.log('111')
          this.rowBars['delete'].callback = this.delRow
        }
        return {
          // ...{ detail: { name: '详情' }, delete: { name: '删除' } },
          ...this.rowBars,
        }
      },
    },

    mounted() {
      this.getList()
    },
    data() {
      return {
        currentRow: 0, //当前选中行，
        apis: {}, // curd api
        listQuery: Object.assign({}, defaultListQuery), // 查询条件
        listLoading: true, // table loading
        list: null, // table data
        total: 10, // 数据总数
        modal: { visible: false, title: '' }, //模态开关，标题
        detailModal: false,
        payload: { username: '', avatar: '' }, // 添加数据payload
      }
    },
    methods: {
      // 提交 部分修改
      async submit(key, data) {
        console.log(key, data)
        return this.apis.update(key, data)
      },
      // 提交表单，新增
      async submitNewForm() {
        try {
          await this.apis.create(this.payload)
          this.$message({
            message: '创建成功',
            type: 'success',
          })
          this.getList()
        } catch (error) {
          this.$message({
            message: '创建失败，稍后再试',
            type: 'error',
          })
        }
        this.modal['visible'] = false
      },
      // 装饰 操作符方法
      decorateOpeator(row, $index, callback) {
        callback(row, $index)
      },
      // 重置查询条件
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery)
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
      // 获取model列表
      async getList() {
        this.listLoading = true
        try {
          const resp = await this.apis.find(this.listQuery)
          const { list, pagination } = resp
          this.list = list
          this.total = pagination.rowCount
          console.log('list', list)
        } catch (error) {}
        this.listLoading = false
      },
      // 新增
      addRow() {
        this.modal['title'] = '新增'
        this.modal['visible'] = true
      },
      //删除
      async delRow(row, index) {
        this.listLoading = true
        const id = row.id
        this.$confirm('此操作将删除此记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
        })
          .then(async () => {
            await this.apis.delete(id)
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.getList()
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
        this.currentRow = index
        this.detailModal = true
      },
      // 添加模态，组件名称转换
      componentName(type, action = 'form') {
        let toggleForm = {
          text: 'input',
          image: 'upload-image',
          'datetime-text': 'datetime',
        }
        if (action === 'desc') {
          toggleForm = _.invert(toggleForm)
          if (type === 'number') return 'text'
          return toggleForm[type] ? toggleForm[type] : type
        }

        return toggleForm[type]
          ? 'ele-editable-' + toggleForm[type]
          : 'ele-editable-' + type
      },
      // 更新payloadStatus
      handleUpdatePayload(key, value) {
        console.log('key', key, value)
        this.payload[key] = value
      },
      handleChangePayload() {
        console.log('key2', key, value)
        this.payload[key] = value
        //   console.log('key',key,value);
        // this.payload[key] = value
      },
    },
  }
</script>
<style lang="scss" scoped>
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

  .cell {
    a:first-child {
      .el-divider {
        width: 0 !important;
      }
    }
  }
</style>
