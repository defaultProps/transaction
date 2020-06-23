import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

import routes from './route'

Vue.use(Router)

let router = new Router({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
