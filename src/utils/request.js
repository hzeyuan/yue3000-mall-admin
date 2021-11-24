import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 让每个请求携带自定义token 请根据实际情况自行修改
  if (store.getters.token) {
    const token = getToken()
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

//响应拦截 对相应的状态码进行操作
service.interceptors.response.use(res => {
// 响应成功 返回结果中的数据项data
  console.log('Promise',res.data)
  return res.data
}, err => {
//  响应失败 根据返回是否有结果进行判定
  let {response} = err
  if (response) {
    // 有结果根据返回结果的状态码进行判定 做相应的处理 这里只是判断 不做相应的处理
    switch (response.status) {
      case 401:
        //    设定401为没有登录 相应的操作可以向下写
        break;
      case 403:
        //    设定403为没有权限或者Taken过期 相应的操作如下
        break;
    }
    return Promise.reject(err)
  } else {
    //没有结果 一般是服务器奔溃或者断网
    if (!window.navigator.onLine) {
      // 判断是否断网 进行断网处理 此处可以用路由跳转到断网页面
      return Promise.reject(err)
    } else {
      //  服务器出现问题
      return Promise.reject(err)
    }

  }
});
// service.interceptors.response.use(
//   response => {
//   /**
//   * code为非200是抛错 可结合自己业务进行修改
//   */
//     const res = response.data
//     if (res.status !== 200) {
//       Message({
//         message: res.message,
//         type: 'error',
//         duration: 3 * 1000
//       })
//
//       // 401:未登录;
//       if (res.status === 401) {
//         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('FedLogOut').then(() => {
//             location.reload()// 为了重新实例化vue-router对象 避免bug
//           })
//         })
//       }
//       return Promise.reject('error')
//     } else {
//       return response.data
//     }
//   },
//   error => {
//     console.log('err' + error)// for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 3 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default service
