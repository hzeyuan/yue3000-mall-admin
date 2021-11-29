import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {Message} from 'element-ui'
import {getToken} from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 判断token是否为空
  if (getToken()) {
    // 不为空 若跳转到登陆页 换到首页
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // 若跳转到非登陆页
      // 判断角色列表的长度 为0的话需要网络拉取该用户的角色列表
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then( () => {
          console.log('获取用户信息')
        })
        const menus = [
          {
            createTime: "2020-02-02T06:50:36.000+00:00",
            hidden: 0,
            icon: "product",
            id: 1,
            level: 0,
            name: "pms",
            parentId: 0,
            sort: 0,
            title: "商品"
          },
          {
            createTime: "2020-02-02T06:51:50.000+00:00",
            hidden: 0,
            icon: "product-list",
            id: 2,
            level: 1,
            name: "product",
            parentId: 1,
            sort: 0,
            title: "商品列表"
          },
          {
            createTime: "2020-02-02T06:52:44.000+00:00",
            hidden: 0,
            icon: "product-add",
            id: 3,
            level: 1,
            name: "addProduct",
            parentId: 1,
            sort: 0,
            title: "添加商品"
          },
          {
            createTime: "2020-02-02T06:53:51.000+00:00",
            hidden: 0,
            icon: "product-cate",
            id: 4,
            level: 1,
            name: "productCate",
            parentId: 1,
            sort: 0,
            title: "商品分类"
          },
          {
            createTime: "2020-02-02T06:54:51.000+00:00",
            hidden: 0,
            icon: "product-attr",
            id: 5,
            level: 1,
            name: "productAttr",
            parentId: 1,
            sort: 0,
            title: "商品类型"
          },
          {
            createTime: "2020-02-02T06:56:29.000+00:00",
            hidden: 0,
            icon: "product-brand",
            id: 6,
            level: 1,
            name: "brand",
            parentId: 1,
            sort: 0,
            title: "品牌管理"
          },
          {
            createTime: "2020-02-02T08:54:07.000+00:00",
            hidden: 0,
            icon: "order",
            id: 7,
            level: 0,
            name: "oms",
            parentId: 0,
            sort: 0,
            title: "订单"
          },
          {
            createTime: "2020-02-02T08:55:18.000+00:00",
            hidden: 0,
            icon: "product-list",
            id: 8,
            name: "order",
            parentId: 7,
            sort: 0,
            title: "订单列表"
          },
          {
            createTime: "2020-02-02T08:56:46.000+00:00",
            hidden: 0,
            icon: "order-setting",
            id: 9,
            level: 1,
            name: "orderSetting",
            parentId: 7,
            sort: 0,
            title: "订单设置"
          },
          {
            createTime: "2020-02-02T08:57:39.000+00:00",
            hidden: 0,
            icon: "order-return",
            id: 10,
            level: 1,
            name: "returnApply",
            parentId: 7,
            sort: 0,
            title: "退货申请处理"
          },
          {
            createTime: "2020-02-02T08:59:40.000+00:00",
            hidden: 0,
            icon: "order-return-reason",
            id: 11,
            level: 1,
            name: "returnReason",
            parentId: 7,
            sort: 0,
            title: "退货原因设置"
          },
          {
            createTime: "2020-02-04T08:18:00.000+00:00",
            hidden: 0,
            icon: "sms",
            id: 12,
            level: 0,
            name: "sms",
            parentId: 0,
            sort: 0,
            title: "营销"
          },
          {
            createTime: "2020-02-04T08:19:22.000+00:00",
            hidden: 0,
            icon: "sms-flash",
            id: 100,
            level: 1,
            name: "order-reward",
            parentId: 12,
            sort: 0,
            title: "下单奖励"
          },
          {
            createTime: "2020-02-04T08:19:22.000+00:00",
            hidden: 0,
            icon: "sms-flash",
            id: 101,
            level: 1,
            name: "register-reward",
            parentId: 12,
            sort: 0,
            title: "注册奖励"
          },
          {
            createTime: "2020-02-04T08:19:22.000+00:00",
            hidden: 0,
            icon: "sms-flash",
            id: 102,
            level: 1,
            name: "invite-reward",
            parentId: 12,
            sort: 0,
            title: "邀请奖励"
          },
          {
            createTime: "2020-02-04T08:19:22.000+00:00",
            hidden: 0,
            icon: "sms-flash",
            id: 103,
            level: 1,
            name: "sign-daily",
            parentId: 12,
            sort: 0,
            title: "会员签到"
          },
          {
            createTime: "2020-02-04T08:19:22.000+00:00",
            hidden: 0,
            icon: "sms-flash",
            id: 13,
            level: 1,
            name: "flash",
            parentId: 12,
            sort: 0,
            title: "秒杀活动列表"
          },
          {
            createTime: "2020-02-04T08:20:16.000+00:00",
            hidden: 0,
            icon: "sms-coupon",
            id: 14,
            level: 1,
            name: "coupon",
            parentId: 12,
            sort: 0,
            title: "优惠券列表"
          },
          {
            createTime: "2020-02-07T08:22:38.000+00:00",
            hidden: 0,
            icon: "product-brand",
            id: 16,
            level: 1,
            name: "homeBrand",
            parentId: 12,
            sort: 0,
            title: "品牌推荐"
          },
          {
            createTime: "2020-02-07T08:23:14.000+00:00",
            hidden: 0,
            icon: "sms-new",
            id: 17,
            level: 1,
            name: "homeNew",
            parentId: 12,
            sort: 0,
            title: "新品推荐"
          },
          {
            createTime: "2020-02-07T08:26:38.000+00:00",
            hidden: 0,
            icon: "sms-hot",
            id: 18,
            level: 1,
            name: "homeHot",
            parentId: 12,
            sort: 0,
            title: "人气推荐"
          },
          {
            createTime: "2020-02-07T08:28:16.000+00:00",
            hidden: 0,
            icon: "sms-subject",
            id: 19,
            level: 1,
            name: "homeSubject",
            parentId: 12,
            sort: 0,
            title: "专题推荐"
          },
          {
            createTime: "2020-02-07T08:28:42.000+00:00",
            hidden: 0,
            icon: "sms-ad",
            id: 20,
            level: 1,
            name: "homeAdvertise",
            parentId: 12,
            sort: 0,
            title: "广告列表"
          },
          {
            createTime: "2020-02-07T08:29:13.000+00:00",
            hidden: 0,
            icon: "ums",
            id: 21,
            level: 0,
            name: "ums",
            parentId: 0,
            sort: 0,
            title: "权限"
          },
          {
            createTime: "2020-02-07T08:29:51.000+00:00",
            hidden: 0,
            icon: "ums-admin",
            id: 22,
            level: 1,
            name: "admin",
            parentId: 21,
            sort: 0,
            title: "用户列表"
          },
          {
            createTime: "2020-02-07T08:30:13.000+00:00",
            hidden: 0,
            icon: "ums-role",
            id: 23,
            level: 1,
            name: "role",
            parentId: 21,
            sort: 0,
            title: "角色列表"
          },
          {
            createTime: "2020-02-07T08:30:53.000+00:00",
            hidden: 0,
            icon: "ums-menu",
            id: 24,
            name: "menu",
            parentId: 21,
            sort: 0,
            title: "菜单列表"
          },
          {
            createTime: "2020-02-07T08:31:13.000+00:00",
            hidden: 0,
            icon: "ums-resource",
            id: 25,
            level: 1,
            name: "resource",
            parentId: 21,
            sort: 0,
            title: "资源列表"
          },
          {
            createTime: "2020-02-02T06:50:36.000+00:00",
            hidden: 0,
            icon: "sms",
            id: 30,
            level: 0,
            name: "decorate",
            parentId: 31,
            sort: 1,
            title: "装修"
          },
          {
            createTime: "2020-02-07T08:31:13.000+00:00",
            hidden: 0,
            icon: "sms",
            id: 31,
            name: "appMy",
            parentId: 0,
            sort: 1,
            title: "个人中心"
          },
        ]
        const username = 'admin'
        store.dispatch('GenerateRoutes', { menus,username }).then(() => { // 生成可访问的路由表
          router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
          next({ ...to, replace: true })
        })


        // store.dispatch('GetInfo').then(res => { // 拉取用户信息
        //   let menus = res.data.menus;
        //   let username = res.data.username;
        //   store.dispatch('GenerateRoutes', { menus,username }).then(() => { // 生成可访问的路由表
        //     router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
        //     next({ ...to, replace: true })
        //   })
        // }).catch((err) => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err || 'Verification failed, please login again')
        //     next({ path: '/' })
        //   })
        // })


      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
