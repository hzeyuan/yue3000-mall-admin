<template>
  <div>
    <strapi-table :model="model" :columns="columns"></strapi-table>
  </div>
</template>

<script>
import {formatDate} from '@/utils/date'
import strapiTable from '@/components/strapi-table'

export default {
  components: {strapiTable},
  data() {
    return {
      model: 'user-privilege',
      columns: [
        {
          key: 'id',
          label: '序号',
          type: Number,
          hidden: false,
        },
        {
          key: 'name',
          label: '名称',
          type: String,
          componentType: 'input',
        },
        {
          key: 'image',
          label: '权益图标',
          componentType: 'upload-image',
          type: String,
          customAttrs: {},
        },
        {
          key: 'remark',
          label: '权益说明',
          width: '180px',
          componentType: 'textarea',
          type: String,
          defaultValue: '暂无',
        },
      ],
    }
  },
  methods: {},
}
</script>

<style></style>
