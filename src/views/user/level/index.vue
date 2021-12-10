<template>
  <div>
    <strapi-table
      model="users"
      :router="router"
      :columns="columns"
      :rowBars="rowBars"
      :diyBars="diyBars"
    />
  </div>
</template>

<script>
  import { userLevelList as fetchList, deleteUserLevel } from '@/api/user'
  import { formatDate } from '@/utils/date'
  import strapiTable from '@/components/strapi-table'

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
    components: { strapiTable },
    data() {
      return {
        router: {
          find: {
            url: '/mall-admin/user_levels',
            method: 'get',
          },
          add: {
            url: '/mall-admin/user_levels',
            method: 'post',
          },
          update: {
            url: '/mall-admin/user_level/:id',
            method: 'put',
          },
          delete: {
            url: '/mall-admin/user_level/:id',
            method: 'delete',
          },
        },
        // 字段配置信息
        columns: [
          {
            key: 'id',
            label: '序号',
            type: Number,
            componentType: 'text',
            hidden: false,
          },
          {
            key: 'name',
            label: '等级名称',
            type: String,
            componentType: 'input',
            hidden: false,
          },
          {
            key: 'image',
            label: '等级图标',
            componentType: 'upload-image',
            type: String,
            customAttrs: {},
            hidden: false,
          },
          {
            key: 'background_image',
            label: '等级背景图',
            type: Number,
            componentType: 'image',
            hidden: false,
          },
          {
            key: 'growth_value',
            label: '成长值',
            type: Number,
            componentType: 'text',
            hidden: false,
          },
          {
            key: 'userCount',
            label: '用户数',
            type: Number,
            componentType: 'text',
            hidden: false,
          },
        ],
        // 每行操作栏
        rowBars: ['detail', 'delete'],

        querys: {},

        diyBars: [],
      }
    },
    methods: {},
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
