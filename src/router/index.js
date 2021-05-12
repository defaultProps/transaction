import Vue from "vue"
import Router from "vue-router"
import NProgress from "nprogress"
import routes from "./route"
import { BASE_ROUTER_FRONTEND } from '@/libs/constant.js'

Vue.use(Router)

let router = new Router({
  routes,
  base: BASE_ROUTER_FRONTEND,
  linkActiveClass: "active",
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
