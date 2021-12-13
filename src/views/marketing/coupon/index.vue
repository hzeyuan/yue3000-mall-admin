<template>
  <div>
    <strapi-table
      :rowBars="rowBars"
      showSearch
      showIndex
      :model="model"
      :columns="columns"
    >
      <template slot="total" slot-scope="{ row }">
        <el-descriptions direction="vertical">
          <el-descriptions-item label="已领取">
            {{ row.receive || '未知' }}
          </el-descriptions-item>
          <el-descriptions-item label="已使用">
            {{ row.used || '未知' }}
          </el-descriptions-item>
          <el-descriptions-item label="总量">
            {{ row.total }}
          </el-descriptions-item>
        </el-descriptions>
      </template>
      <template slot="rules" slot-scope="{ row }">
        <el-descriptions :column="1">
          <el-descriptions-item label="使用门槛">
            {{ threshold(row) }}
          </el-descriptions-item>
          <el-descriptions-item label="领取方式">
            {{
              row.display_type === 0 ? '首页和店铺领取' : '优惠码领取' || '无'
            }}
          </el-descriptions-item>
          <el-descriptions-item v-if="row.display_type === 1" label="优惠码">
            {{ row.code }}
          </el-descriptions-item>
        </el-descriptions>
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
            displayFormatter: (value) => `￥${value}`,
            type: String,
            customAttrs: {},
          },
          {
            key: 'use_time',
            label: '有效期',
            componentType: 'datetime-range',
            width: '240px',
            type: String,
            isNoWrapper: true,
            defaultValue: '暂无',

            customAttrs: {
              disabled: true,
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
            key: 'code',
            label: '优惠码',
            hidden: true,
            search: true,
            qs: 'code_eq',
            searchCompoent: {
              name: 'el-input',
              attr: {
                placeholder: '请输入折扣码',
              },
            },
            type: String,
          },
          {
            key: 'rules',
            label: '使用规则',
            width: '180px',
            componentType: 'text',
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
            componentType: 'datetime-text',
            type: String,
            defaultValue: '暂无',
          },
        ],
        rowBars: { delete: { name: '结束活动' } },
      }
    },
    methods: {
      threshold(row) {
        if (row.discount < 1) {
          return `满 ${row.min} 打 ${row.discount}折`
        } else {
          return `满 ${row.min}元 减 ${row.discount}元`
        }
      },
    },
  }
</script>

<style></style>
