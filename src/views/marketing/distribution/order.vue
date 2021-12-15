<template>
  <div>
    <strapi-table
      ref="strapiTable"
      model="users"
      :router="router"
      :querys="querys"
      v-on:queryReset="queryReset"
      showSearch
      :columns="columns"
      :rowBars="{}"
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
      <template slot="userInfo" slot-scope="{ row }">
        <div class="flex text-xs items-start">
          <el-image :src="row.avatar" lazy></el-image>
          <div class="pl-2 text-left">
            <p>会员id:{{ row.user_id }}</p>
            <p>会员昵称:{{ row.username }}</p>
            <p>会员等级:{{ row.level }}</p>
          </div>
        </div>
      </template>
      membersRelated
      <template slot="membersRelated" slot-scope="{ row }">
        <div class="flex text-xs justify-center items-center">
          <div class="text-center">
            <p>粉丝数量:{{ row.fans || 0 }}</p>
            <p>邀请人Id:{{ row.first_leader || '无' }}</p>
          </div>
        </div>
      </template>
      <template slot="freeze_distribution" slot-scope="{ row }">
        {{ row.freeze_distribution === 0 ? '正常' : '冻结' }}
      </template>
      <template slot="distribution_order" slot-scope="{ row }">
        <div class="flex text-xs justify-center items-center">
          <div class="text-center">
            <p>分销订单金额:{{ row.order_amount || 0 }}</p>
            <p>分销订单数量:{{ row.distribution_order_num || 0 }}</p>
          </div>
        </div>
      </template>
      <template slot="opeator" slot-scope="{ row }">
        <el-link
          v-if="row.freeze_distribution === 0"
          type="danger"
          @click="freezeUserDistribution(row)"
        >
          冻结资格
        </el-link>
        <el-link v-else type="success" @click="unfreezeUserDistribution(row)">
          解除冻结
        </el-link>
        <el-link type="info" @click="userDistributionInfo(row)">
          分销资料
        </el-link>
      </template>
    </strapi-table>
    <el-drawer
      title="我是标题"
      :visible.sync="infoDrawerVisible"
      direction="rtl"
    >
      <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">
          江苏省苏州市吴中区吴中大道 1188 号
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script>
  import strapiTable from '@/components/strapi-table'
  import {
    freezeDistribution,
    unfreezeDistribution,
    memberInfo,
  } from '@/api/user'
  export default {
    components: { strapiTable },
    data() {
      return {
        model: 'distribution',
        infoDrawerVisible: false,
        router: {
          find: {
            url: '/mall-admin/distributions',
            method: 'get',
          },
          findOne: {
            url: 'users/me',
            method: 'get',
          },
          update: {
            url: '/users/:id',
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
            key: 'userInfo',
            label: '名称',
            width: '180px',
            type: String,
            componentType: 'text',
          },
          {
            key: 'phone',
            label: '手机号',
            defaultValue: '暂无',
            componentType: 'text',
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
            key: 'distribution_money',
            label: '分销佣金',
            componentType: 'text',
            displayFormatter(value) {
              return `￥${value || 0.0}`
            },
            type: Number,
          },
          {
            key: 'distribution_order',
            label: '分销订单数量',
            componentType: 'text',
            type: String,
          },
          {
            key: 'membersRelated',
            label: '分销关系',
            componentType: 'text',
            type: String,
          },
          {
            key: 'freeze_distribution',
            label: '分销状态',
            componentType: 'text',
            type: String,
          },
          {
            key: 'opeator',
            label: '操作',
            componentType: 'text',
            type: String,
          },
        ],
        querys: {
          level: '',
        },
        levelOptions: [
          { label: '等级1', value: 1 },
          { label: '等级2', value: 2 },
          { label: '等级3', value: 3 },
        ],
        memberInfo: {},
      }
    },
    methods: {
      queryReset() {
        this.querys = { level: '' }
      },
      // 冻结用户资格
      async freezeUserDistribution(row) {
        await freezeDistribution(row.user_id)
        this.$refs.strapiTable.getList()
        this.$message.success({ title: '冻结成功' })
      },
      async unfreezeUserDistribution(row) {
        await unfreezeDistribution(row.user_id)
        this.$refs.strapiTable.getList()
        this.$message.success({ title: '解冻成功' })
      },
      async memberInfo(row) {
        const data = await memberInfo(row.user_id)
        this.memberDetails = data
        this.drawer = true
      },
      // 分销详情
      async userDistributionInfo(row) {
        this.infoDrawerVisible = true
        const data = await memberInfo(row.user_id)
        console.log('data', data)
        this.memberInfo = data
      },
    },
  }
</script>

<style></style>
