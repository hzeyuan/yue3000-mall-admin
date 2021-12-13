<template>
  <div>
    <strapi-table :model="model" :columns="columns">
      <template slot="valid_time" slot-scope="{ row }">
        <div>
          {{ row.begin_time | formatDatetime }}
          <p>至</p>
          {{ row.end_time | formatDatetime }}
        </div>
      </template>
    </strapi-table>
  </div>
</template>

<script>
  import strapiTable from '@/components/strapi-table'
  export default {
    components: { strapiTable },
    data() {
      return {
        model: 'coupon',
        columns: [
          {
            key: 'id',
            label: 'id',
            type: Number,
            hidden: true,
          },
          {
            key: 'name',
            label: '名称',
            type: String,
            componentType: 'input',
          },
          {
            key: 'discount',
            label: '面额',
            componentType: 'text',
            type: String,
            customAttrs: {},
          },
          {
            key: 'use_time',
            label: '有效期',
            componentType: 'datetime-range',
            width: '300px',
            type: String,
            isNoWrapper: true,
            defaultValue: '暂无',

            customAttrs: {
              'start-placeholder': '开始日期',
              'end-placeholder': '结束日期',
              size: 'mini',
              'range-separator': '至',
            },
          },
          {
            key: 'desc',
            label: '优惠券描述',
            componentType: 'textarea',
            type: String,
            customAttrs: {},
          },
          {
            key: 'total',
            label: '发行状况',
            componentType: 'text',
            type: String,
            defaultValue: '暂无',
          },

          {
            key: 'created_at',
            label: '创建日期',
            componentType: 'datetime',
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
