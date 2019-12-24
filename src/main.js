import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import storeIndex from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  // 用于刷新时检测，如果刷新则状态会为空，那么重新从sessionStorage中读取出来
  if (
    storeIndex.state.userType == undefined &&
    sessionStorage.getItem('store')
  ) {
    storeIndex.replaceState(
      Object.assign(
        {},
        storeIndex.state,
        JSON.parse(sessionStorage.getItem('store'))
      )
    )
  }

  if (
    to.matched.some(record => record.meta.some(meta => meta.requireAuth == 1))
  ) {
    if (storeIndex.state['userType'] == 1) {
      next()
      return
    } else {
      next({
        path: '/adminLogin'
      })
    }
  } else if (
    to.matched.some(record => record.meta.some(meta => meta.requireAuth == 0))
  ) {
    if (storeIndex.state['userType'] == 0) {
      next()
      return
    } else {
      next({
        path: '/mainPage'
      })
    }
  }
  next()
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
