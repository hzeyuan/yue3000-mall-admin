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
      class=""
      :visible.sync="infoDrawerVisible"
      :size="400"
      direction="rtl">

      <div style="padding: 0 40px; width: 100%">
        <div class="el-descriptions__title">会员信息：</div>
        <el-row class="row row1" :gutter="20">
          <el-col :span="10">
            <el-avatar :size="80" shape="square" :src="memberInfo.avatar" alt=""/>
            <div>分销状态:
              <el-tag :text="freeze_distribution === 0? 'success':'danger'">
                {{ freeze_distribution === 0 ? '正常' : '冻结' }}
              </el-tag>
            </div>
          </el-col>
          <el-col :span="12">
            <div>会员编号：{{ memberInfo.user_id }}</div>
            <div>用户名：{{ memberInfo.username }}</div>
            <div>手机号：{{ memberInfo.phone }}</div>
            <div>会员等级：
              <el-tag>黄金会员</el-tag>
            </div>
            <div>地址:{{ '江苏省苏州市' }}</div>
          </el-col>
        </el-row>

        <div class="el-descriptions__title">分销信息：</div>
        <el-row class="row row2" :gutter="20">
          <el-col :span="12">
            <div>分销编码：{{ memberInfo.distribution_code }}</div>
            <div>分销商品编号：{{ memberInfo.order_goods_id }}</div>
            <div>分销商品数量：{{ memberInfo.goods_num }}</div>
            <div>分销订单数量：{{ memberInfo.distribution_order_num }}</div>
            <div>分销总金额：{{ memberInfo.money }}</div>
            <div>分销收益：{{ memberInfo.earnings }}</div>
          </el-col>
        </el-row>
      </div>
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
  components: {strapiTable},
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
          key: 'sn',
          label: '记录编号',
          width: '100px',
          type: String,
          componentType: 'text',
        },
        {
          key: 'order_goods_id',
          label: '订单编号',
          width: '100px',
          type: String,
          componentType: 'text',
        },
        {
          key: 'userInfo',
          label: '购买人信息',
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
        {label: '等级1', value: 1},
        {label: '等级2', value: 2},
        {label: '等级3', value: 3},
      ],
      memberInfo: {
        avatar: "http://yue300-mall.oss-cn-hongkong.aliyuncs.com/thumbnail_Wechat_IMG_166_42c7f10616.jpeg",
        distribution_code: "ABCDEF",
        distribution_money: 0,
        distribution_order_num: 0,
        earnings: 22,
        freeze_distribution: 0,
        goods_num: 1,
        id: 13,
        level: 2,
        money: 399,
        order_amount: 0,
        order_goods_id: 21,
        phone: "11111111111",
        real_name: null,
        sn: "",
        status: 1,
        user_id: "21",
        username: "小黄同学",
      }
    }
  },
  methods: {
    queryReset() {
      this.querys = {level: ''}
    },
    // 冻结用户资格
    async freezeUserDistribution(row) {
      await freezeDistribution(row.user_id)
      this.$refs.strapiTable.getList()
      this.$message.success({title: '冻结成功'})
    },
    async unfreezeUserDistribution(row) {
      await unfreezeDistribution(row.user_id)
      this.$refs.strapiTable.getList()
      this.$message.success({title: '解冻成功'})
    },
    async memberInfo(row) {
      const data = await memberInfo(row.user_id)
      this.memberDetails = data
      this.drawer = true
    },
    // 分销详情
    async userDistributionInfo(row) {
      const data = await memberInfo(row.user_id)
      this.memberInfo = data[0]
      this.infoDrawerVisible = true
    },
  },
}
</script>

<style lang="scss">
.el-descriptions__title {
  margin: 30px 0 10px 0;
}

.el-avatar {
  margin-left: 10px;
}

.row {
  margin: 5px;
}
</style>
