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
  if (
    to.matched.some(record => record.meta.some(meta => meta.requireAuth == 1))
  ) {
    if (storeIndex.userType == 1) {
      console.log(this.$store.state.userType)
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
    if (storeIndex.userType == 0) {
      console.log(this.$store.state.userType)
      next()
      return
    } else {
      next({
        path: '/'
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
