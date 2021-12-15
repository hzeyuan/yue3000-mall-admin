<template>
  <div>
    <strapi-table
      ref="strapi-table"
      :rowBars="rowBars"
      showSearch
      showIndex
      :model="model"
      :columns="columns"
    >
      <template slot="discount" slot-scope="{ row }">
        <el-descriptions>
          <el-descriptions-item label="折扣" v-if="row.discount_type === 0 ">
            {{ row.discount * 10 }} 折
          </el-descriptions-item>
          <el-descriptions-item label="面额" v-else>
            ¥ {{ row.discount }}
          </el-descriptions-item>
        </el-descriptions>
      </template>
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
          <el-descriptions-item label="优惠码">
            {{ row.code }}
          </el-descriptions-item>
        </el-descriptions>
      </template>
      <div slot="add">
        <el-form ref="coupon-form" :model="couponFormData" label-width="100px" :rules="rules">
          <el-form-item label="名称" prop="name">
            <el-input v-model="couponFormData.name"></el-input>
          </el-form-item>
          <el-form-item label="优惠卷描述" prop="desc">
            <el-input type="textarea" v-model="couponFormData.desc"></el-input>
          </el-form-item>
          <el-form-item label="优惠卷数量" prop="total">
            <el-input-number v-model="couponFormData.total" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="couponFormData.begin_time.date"
                              style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间"
                              v-model="couponFormData.begin_time.time"
                              style="width: 100%;">
              </el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="失效时间">
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="couponFormData.end_time.date"
                              style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间"
                              v-model="couponFormData.end_time.time"
                              style="width: 100%;">
              </el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="领取方式">
            <el-switch
              v-model="couponFormData.display_type"
              :active-value="0"
              :inactive-value="1"
              active-text="首页或店铺"
              inactive-text="优惠码">
            </el-switch>
          </el-form-item>
          <el-form-item label="优惠码" prop="code">
            <el-input v-model="couponFormData.code"></el-input>
          </el-form-item>
          <el-form-item label="最少消费" prop="min">
            <el-input-number v-model="couponFormData.min" :precision="2" :controls="false">
            </el-input-number>
          </el-form-item>
          <el-form-item label="减免类型">
            <el-switch
              v-model="couponFormData.discount_type"
              :active-value="0"
              :inactive-value="1"
              active-text="折扣减免"
              inactive-text="金额减免">
            </el-switch>
          </el-form-item>
          <el-form-item :label="couponFormData.discount_type===0?'折扣':'金额'" prop="discount">
            <el-input-number v-if="couponFormData.discount_type === 1"
                             v-model="couponFormData.discount" :precision="2"
                             :controls="false">
            </el-input-number>
            <el-input-number v-else
                             v-model="couponFormData.discount" :precision="2" :max="1"
                             :controls="false">
            </el-input-number>
          </el-form-item>
        </el-form>
        <div style="text-align: right">
          <span class="dialog-footer">
            <el-button @click="$refs['strapi-table'].modal.visible= false">取 消</el-button>
            <el-button type="primary" @click="addCouponData('coupon-form')">确 定</el-button>
          </span>
        </div>
      </div>
    </strapi-table>
  </div>
</template>

<script>
import strapiTable from '@/components/strapi-table'
import {updateCoupon} from "@/api/marketing/coupon"
import _ from 'lodash'

export default {
  components: {strapiTable},
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
          label: '面额/折扣',
          width: '100px',
          componentType: 'text',
          // displayFormatter: (value) => `￥${value}`,
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
      rowBars: {delete: {name: '结束活动', type: 'danger'}},
      dialogShow: true,
      couponFormData: {
        name: '',    //优惠卷名字
        begin_time: {
          date: '',
          time: '',
        }, // 开始时间
        end_time: {
          date: '',
          time: '',
        },  // 结束时间
        desc: '',      //描述
        total: '',     //优惠卷数量
        display_type: 0, // 领取方式
        code: '',  //优惠码
        min: 0, //最低消费
        discount_type: 0,  //折扣类型
        discount: '',  //优惠卷金额 或者折扣类型
      },
      rules: {
        name: {required: true, message: '请输入优惠卷名称', trigger: 'blur'},
        desc: {required: true, message: '请输入优惠卷描述', trigger: 'blur'},
        total: {required: true, message: '请输入优惠数量', trigger: 'blur'},
        code: [
          {required: true, message: '请输入优惠卷领取码', trigger: 'blur'},
          {min: 6, max: 6, message: '长度在6个字符', trigger: 'blur'}
        ],
        min: {required: true, message: '请输入该卷最低使用金额', trigger: 'blur'},
        discount: {required: true, message: '请输入优惠优惠', trigger: 'blur'},
      }
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
    addCouponData(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        let data = _.cloneDeep(this.couponFormData)
        data.begin_time = this.funDate(data.begin_time.date, data.begin_time.time)
        console.log('上传时间', data.begin_time)
        data.end_time = this.funDate(data.end_time.date, data.end_time.time)
        updateCoupon(data)
          .then((res) => {
            console.log('成功信息', res.code)
            if (res.code !== 1) {
              this.$message({
                message: '优惠码重复，',
                type: 'warning',
              })
              this.couponFormData.code = ''
            } else {
              this.$message({
                message: '添加成功',
                type: 'success',
              })
              this.$refs['strapi-table'].getList()
              this.$refs['strapi-table'].modal.visible = false
              this.$refs[formName].resetFields();
              this.couponFormData.begin_time = {
                date: '',
                time: '',
              }
              this.couponFormData.end_time = {
                date: '',
                time: '',
              }
            }
          })
          .catch((err) => {
            console.log('错误信息', err)
            this.$message({
              message: '创建失败，稍后再试',
              type: 'error',
            })
          })
      })
    },
    funDate(date, time) {
      date = new Date(date)
      // console.log('日期', date)
      time = new Date(time)
      date = (date.valueOf()) / (1000 * 60 * 60 * 24)
      // console.log('时间', time)
      time = (time.valueOf()) % (1000 * 60 * 60 * 24)
      return (new Date((date * 1000 * 60 * 60 * 24) + time))
    },
    handleChange(value) {
      if (value === 1)
        this.couponFormData.code = ''
    }
  },
}
</script>

<style></style>
