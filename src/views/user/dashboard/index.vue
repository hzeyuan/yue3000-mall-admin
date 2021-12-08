<template>
  <div>
    <strapi-table
      model="user_level"
      showSearch
      :columns="[
        {
          key: 'id',
          label: '名称',
          type: Number,
          editable: false,
          hidden: true,
        },
        {
          key: 'name',
          label: '名称',
          type: String,
        },
        {
          key: 'remark',
          label: '备注',
          editableComponent: 'el-input',
          type: String,
        },
      ]"
    >
      <!-- <template slot="id" slot-scope="row">123</template> -->
    </strapi-table>
  </div>
</template>

<script>
  import strapiTable from '@/components/strapi-table' //上传文件组件
  export default {
    components: { strapiTable },
  }
</script>

<style></style>
