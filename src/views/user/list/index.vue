<template>
  <div>
    <strapi-table
      model="users"
      :router="router"
      showSearch
      :columns="columns"
      :diyBars="diyBars"
    >
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
            hidden: true,
          },
          {
            key: 'username',
            label: '名称',
            editable: false,
            type: String,
          },
          {
            key: 'avatar',
            label: '头像',
            editable: false,
            type: String,
          },
          {
            key: 'email',
            label: '邮箱',
            editable: false,
            width: '180px',
            type: Date,
          },
          {
            key: 'phone',
            label: '手机号',
            width: '180px',
            editable: false,
            type: String,
          },
          {
            key: 'last_login_time',
            label: '最近登录时间',
            editable: false,
            filter: (field) => {
              return formatDate(new Date(field), 'yyyy-MM-dd hh:mm:ss')
            },
            editable: false,
            type: String,
          },
          {
            key: 'earnings',
            label: '佣金',
            editableComponent: 'el-input',
            filter: (field) => {
              return `￥${field || 0.0}`
            },
            type: String,
          },
          {
            key: 'money',
            label: '余额',
            filter: (field) => {
              return `￥${field || 0.0}`
            },
            editableComponent: 'el-input',
            editable: false,
            type: String,
          },
          {
            key: 'user_integral',
            label: '积分',
            editableComponent: 'el-input',
            editable: false,
            type: String,
          },
          {
            key: 'level',
            label: '当前等级',
            editableComponent: 'el-input',
            editable: false,
            type: String,
          },
          {
            key: 'user_growth',
            label: '成长值',
            editableComponent: 'el-input',
            editable: false,
            type: String,
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
      }
    },
  }
</script>

<style></style>
