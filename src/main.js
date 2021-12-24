import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'
import 'tailwindcss/tailwind.css'

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 生产环境默认都使用mock，如果正式用于生产环境时，记得去掉
 */

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('@/utils/static')
//   mockXHR()
// }

Vue.config.productionTip = false
// import EleEditable from 'vue-ele-editable'
// import DatetimeRange from '@/components/DatetimeRange'
// Vue.component(DatetimeRange.name, DatetimeRange)
// Vue.use(EleEditable, {
//   image: {
//     lazy: true,
//     alt: '加载失败',
//   },
//   number: {
//     step: 1,
//   },
// })
import { formatDate } from '@/utils/date'

Vue.filter('formatDatetime', function (value) {
  console.log(
    'formatDatetime',
    value,
    new Date(value),
    formatDate(new Date(value), 'yyyy-MM-dd hh:mm:ss')
  )
  return formatDate(new Date(value), 'yyyy-MM-dd hh:mm:ss')
})

new Vue({
  el: '#vue-admin-beautiful',
  router,
  store,
  render: (h) => h(App),
})
