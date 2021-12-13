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
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    meta: { title: '商品管理', icon: 'home' },
    children: [
      {
        path: 'list',
        name: 'List',
        hidden: false,
        component: () => import('@/views/goods/list'),
        meta: {
          title: '商品列表',
          icon: 'home',
          affix: false,
          noKeepAlive: false,
        },
      },
      {
        path: 'add',
        name: 'add',
        hidden: true,
        component: () => import('@/views/goods/add'),
        meta: {
          title: '添加商品',
          icon: 'home',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'update',
        name: 'update',
        hidden: true,
        component: () => import('@/views/goods/update'),
        meta: {
          title: '更新商品',
          icon: 'home',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'category',
        name: 'Category',
        hidden: false,
        component: () => import('@/views/goods/category'),
        meta: {
          title: '商城类目',
          icon: 'home',
          noKeepAlive: false,
        },
      },
      {
        path: 'category/add',
        name: 'categoryAdd',
        hidden: true,
        component: () => import('@/views/goods/category/add'),
        meta: {
          title: '添加分类',
          icon: 'home',
          affix: false,
          noKeepAlive: false,
        },
      },
      {
        hidden: true,
        path: 'category/update',
        name: 'categoryUpdate',
        component: () => import('@/views/goods/category/update'),
        meta: {
          title: '修改分类',
          icon: 'home',
          affix: false,
          noKeepAlive: false,
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/dashboard',
    meta: { title: '用户', icon: 'user' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        hidden: false,
        component: () => import('@/views/user/dashboard'),
        meta: {
          title: '用户概况',
          icon: 'user',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'list',
        name: 'list',
        hidden: false,
        component: () => import('@/views/user/list'),
        meta: {
          title: '用户列表',
          icon: 'user',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'level',
        name: 'level',
        hidden: false,
        component: () => import('@/views/user/level'),
        meta: {
          title: '用户等级',
          icon: 'user',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'level/add',
        name: 'levelAdd',
        hidden: true,
        component: () => import('@/views/user/level/detail'),
        meta: {
          title: '新增会员等级',
          icon: 'user',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'level/edit',
        name: 'levelEdit',
        hidden: true,
        component: () => import('@/views/user/level/detail'),
        meta: {
          title: '修改会员等级',
          icon: 'user',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'privilege',
        name: 'privilege',
        hidden: false,
        component: () => import('@/views/user/privilege'),
        meta: {
          title: '等级权益',
          icon: 'user',
          affix: false,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    meta: { title: '订单管理', icon: 'order' },
    children: [
      {
        path: 'order',
        name: 'Order',
        hidden: false,
        component: () => import('@/views/oms/order'),
        meta: {
          title: '订单列表',
          icon: 'order',
          affix: false,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/index/order',
    meta: { title: '系统配置', icon: 'home' },
    children: [
      {
        path: 'order',
        name: 'Order',
        hidden: false,
        component: () => import('@/views/config/orderConfig'),
        meta: {
          title: '订单配置',
          icon: 'home',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'recharge',
        name: 'Recharge',
        hidden: false,
        component: () => import('@/views/config/rechargeConfig'),
        meta: {
          title: '充值配置',
          icon: 'home',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'withdraw',
        name: 'Withdraw',
        hidden: false,
        component: () => import('@/views/config/withdrawConfig'),
        meta: {
          title: '提现配置',
          icon: 'home',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'sell',
        name: 'Sell',
        hidden: false,
        component: () => import('@/views/config/sellConfig'),
        meta: {
          title: '奖励配置',
          icon: 'home',
          affix: false,
          noKeepAlive: false,
        },
      },
      {
        path: 'sign',
        name: 'Sign',
        hidden: false,
        component: () => import('@/views/config/signConfig'),
        meta: {
          title: '签到配置',
          icon: 'home',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: '/other',
        name: 'Other',
        hidden: false,
        component: () => import('@/views/config/otherConfig'),
        meta: {
          title: '其他配置',
          icon: 'home',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: '/lottery',
        name: 'Lottery',
        hidden: false,
        component: () => import('@/views/config/lotteryConfig'),
        meta: {
          title: '抽奖配置',
          icon: 'home',
          affix: false,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/furnish',
    component: Layout,
    alwaysShow: true,
    redirect: '/furnish/my-menu',
    meta: { title: '商城装修', icon: 'home' },
    children: [
      {
        path: 'my-menu',
        name: 'MyMenu',
        hidden: false,
        component: () => import('@/views/furnish/myMenu'),
        meta: {
          title: '个人中心',
          icon: 'home',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'add-my-menu',
        name: 'AddMyMenu',
        hidden: true,
        component: () => import('@/views/furnish/myMenu/add'),
        meta: {
          title: '添加个人中心菜单',
          icon: 'home',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'update-my-menu:id',
        name: 'UpdateMyMenu',
        hidden: true,
        component: () => import('@/views/furnish/myMenu/update'),
        meta: {
          title: '修改个人中心菜单',
          icon: 'home',
          affix: false,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/dashboard',
    meta: { title: '财务', icon: 'money' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        hidden: false,
        component: () => import('@/views/finance/dashboard'),
        meta: {
          title: '财务概况',
          icon: 'user',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'withdraw',
        name: 'withdraw',
        hidden: false,
        component: () => import('@/views/finance/withdraw'),
        meta: {
          title: '佣金提现',
          icon: 'money',
          affix: false,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/marketing',
    component: Layout,
    redirect: '/marketing/dashboard',
    meta: { title: '营销', icon: 'money' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        hidden: false,
        component: () => import('@/views/marketing/dashboard'),
        meta: {
          title: '营销概况',
          icon: 'user',
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: 'coupon',
        name: 'coupon',
        hidden: false,
        component: () => import('@/views/marketing/coupon'),
        meta: {
          title: '优惠券',
          icon: 'money',
          affix: false,
          noKeepAlive: true,
        },
      },
    ],
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
