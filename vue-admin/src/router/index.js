/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description router全局配置，如有必要可分文件抽离
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    meta: { title: '商品', icon: 'product' },
    children: [
      {
        path: 'product',
        name: 'List',
        component: () => import('@/views/pms/product'),
        meta: {
          title: '商品列表',
          icon: 'home',
          affix: true,
          noKeepAlive: true,
        },
      },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {
          title: '添加商品',
          icon: 'product-add',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {
          title: '修改商品',
          icon: 'product-add',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: {
          title: '商品分类',
          icon: 'product-cate',
          affix: false,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: { title: '营销', icon: 'sms' },
    children: [
      {
        path: 'order-reward',
        name: 'order-reward',
        component: () => import('@/views/sms/orderReward/index'),
        meta: { title: '下单奖励', icon: 'sms-flash' },
      },
      {
        path: 'register-reward',
        name: 'register-reward',
        component: () => import('@/views/sms/registerAward/index'),
        meta: {
          title: '注册奖励',
          icon: 'sms-flash',
          affix: true,
          noKeepAlive: true,
        },
      },
      {
        path: 'invite-reward',
        name: 'invite-reward',
        component: () => import('@/views/sms/inviteReward/index'),
        meta: {
          title: '邀请奖励',
          icon: 'sms-flash',
          affix: true,
          noKeepAlive: true,
        },
      },
      {
        path: 'sign-daily',
        name: 'sign-daily',
        component: () => import('@/views/sms/signDaily/index'),
        meta: {
          title: '会员签到',
          icon: 'sms-flash',
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/config',
    name: 'Config',
    component: Layout,
    redirect: '/config/order',
    meta: { title: '项目配置', icon: 'sms' },
    children: [
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/config/order'),
        meta: {title: '订单配置', icon: 'sms'}
      },
      {
        path: 'other',
        name: 'Order',
        component: () => import('@/views/config/otherConfig'),
        meta: {title: '其他配置', icon: 'sms'}
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: routerMode === 'history' ? publicPath : '',
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
/* const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
}; */

export function resetRouter() {
  router.matcher = new VueRouter({
    base: routerMode === 'history' ? publicPath : '',
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
