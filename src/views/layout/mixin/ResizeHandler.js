// 页面主体布局的响应式处理

import store from '@/store'

const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('CloseSideBar', { withoutAnimation: false })
      }
    }
  },
  // 页面载入前生命周期 事件捕获  页面大小被调整了 响应式布局
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  // 页面载入后
  mounted () {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('ToggleDevice', 'mobile')
      store.dispatch('CloseSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // 获取页面body元素的属性 如果宽度 大于 1024 + 3 则返回 false
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')
        if (isMobile) {
          store.dispatch('CloseSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
