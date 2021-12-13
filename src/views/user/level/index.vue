<template>
  <div>
    <strapi-table
      :model="model"
      :columns="columns"
    />
  </div>
</template>
<script>
import strapiTable from '@/components/strapi-table'
import {getUserPrivilegeList} from "@/api/user";

export default {
  name: 'userLevel',
  components: {strapiTable},
  data() {
    return {
      model: 'user_level',
      // 字段配置信息
      columns: [
        {
          key: 'id',
          label: '序号',
          type: Number,
          componentType: 'text',
          hidden: true,
        },
        {
          key: 'name',
          label: '等级名称',
          type: String,
          componentType: 'input',
        },
        {
          key: 'image',
          label: '图标',
          componentType: 'upload-image',
          type: String,
          customAttrs: {},
        },
        {
          key: 'background_image',
          label: '等级背景图',
          type: String,
          componentType: 'upload-image',
          customAttrs: {},
        },
        {
          key: 'growth_value',
          label: '成长值',
          type: Number,
          componentType: 'input',
          hidden: false,
        },
        {
          key: 'privileges',
          label: '权益列表',
          type: Array,
          componentType: 'select',
          customAttrs: {
            multiple: true,
          },
          options: [''],
          hidden: false,
        },
        {
          key: 'userCount',
          label: '用户数',
          type: Number,
          componentType: 'input',
          hidden: false,
        },
      ],

      arr: [],

      privilegeList: [
        {
          text: '购物折扣',
          value: 1
        },
        {
          text: '全场免邮',
          value: 2
        },
        {
          text: '会员优惠卷',
          value: 3
        },
        {
          text: '专属客服',
          value: 4
        },
      ],
    }
  },
  methods: {
    async getPrivilegeList() {
      const res = await getUserPrivilegeList()
      let options = []
      console.log('用户权益', res)
      res.list.forEach(item => {
        options.push({
          text: item.name,
          value: item.id
        })
      })
      this.columns[5].options = options
    },
  },
  mounted() {
    this.getPrivilegeList()
  }
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
