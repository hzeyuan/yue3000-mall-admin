<template>
  <div>
    <strapi-table
      model="users"
      :router="router"
      :querys="querys"
      v-on:queryReset="queryReset"
      showSearch
      :columns="columns"
      :rowBars="rowBars"
      :diyBars="diyBars"
    >
      <template slot="search_level">
        <el-select v-model="querys.level" placeholder="请选择">
          <el-option
            v-for="item in levelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
      <template slot="avatar" slot-scope="{ row }">
        <el-image :src="row.avatar" lazy></el-image>
      </template>
    </strapi-table>
  </div>
</template>

<script>
  import { formatDate } from '@/utils/date'
  import strapiTable from '@/components/strapi-table' //上传文件组件

  export default {
    components: { strapiTable },
    data() {
      return {
        model: 'users',
        router: {
          find: {
            url: '/users',
            method: 'get',
          },
          findOne: {
            url: 'users/me',
            method: 'get',
          },
        },
        columns: [
          {
            key: 'id',
            label: 'id',
            type: Number,
            componentType: 'text',
            hidden: true,
          },
          {
            key: 'username',
            label: '名称',
            type: String,
            componentType: 'input',
          },
          {
            key: 'avatar',
            label: '头像',
            editableComponent: 'icon-upload',
            componentType: 'image',
            type: String,
          },
          {
            key: 'email',
            label: '邮箱',
            width: '180px',
            componentType: 'text',
            type: String,
            search: true,
            defaultValue: '暂无',
            searchCompoent: {
              name: 'el-input',
              attr: {
                placeholder: '请输入邮箱',
              },
            },
          },
          {
            key: 'phone',
            label: '手机号',
            defaultValue: '暂无',
            componentType: 'text',
            width: '180px',
            search: true,
            qs: 'phone_starts_with',
            searchCompoent: {
              name: 'el-input',
              attr: {
                placeholder: '请输入手机号',
              },
            },
            type: String,
          },
          {
            key: 'last_login_time',
            label: '最近登录时间',
            componentType: 'datetime-text',
            displayFormatter(value) {
              if (_.isEmpty(value)) {
                return '暂无记录'
              }
              return formatDate(new Date(value), 'yyyy-MM-dd hh:mm:ss')
            },
            type: String,
          },
          {
            key: 'earnings',
            label: '佣金',
            componentType: 'number',
            displayFormatter(value) {
              return `￥${value || 0.0}`
            },
            type: Number,
          },
          {
            key: 'money',
            label: '余额',
            componentType: 'number',
            displayFormatter(value) {
              return `￥${value || 0.0}`
            },
            type: Number,
          },
          {
            key: 'user_integral',
            label: '积分',
            editableComponent: 'el-input',
            componentType: 'number',
            type: Number,
          },
          {
            key: 'level',
            label: '当前等级',
            componentType: 'select',

            options: [
              { text: '等级1', value: 1 },
              { text: '等级2', value: 2 },
              { text: '等级3', value: 3 },
            ],
            search: true,
            type: String,
          },
          {
            key: 'user_growth',
            label: '成长值',
            componentType: 'input',
            type: String,
            displayFormatter(value) {
              return value || 0
            },
          },
        ],
        diyBars: [
          {
            name: '详情',
            callback: (row, index) => {
              console.log('点击', row, index)
            },
          },
        ],
        rowBars: ['delete'],
        querys: {
          level: '',
        },

        levelOptions: [
          { label: '等级1', value: 1 },
          { label: '等级2', value: 2 },
          { label: '等级3', value: 3 },
        ],
      }
    },
    methods: {
      queryReset() {
        this.querys = { level: '' }
        console.log('重置')
      },
    },
  }
</script>

<style></style>
