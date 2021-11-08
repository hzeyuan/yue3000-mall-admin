import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    async Login({ commit }, userInfo) {
      console.log(userInfo)
      const username = userInfo.username.trim()
      const res = await login(username, userInfo.password)
      setToken(res.token)

      // 储存token
      commit('SET_TOKEN', res.token)
      return
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {

        const username = 'admin'
        // 储存用户名
        commit('SET_NAME', username)

        const icon = 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg.jpg'
        // 储存用户图标
        commit('SET_AVATAR', icon)

        const roles = ['超级管理员']
        // 储存角色列表
        commit('SET_ROLES', roles)

        return
        // getInfo().then(response => {
        //   const data = response.data
        //
        //   if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }
        //   commit('SET_NAME', data.username)
        //   commit('SET_AVATAR', data.icon)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
