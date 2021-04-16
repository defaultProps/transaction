import Vue from 'vue'
import COOKIES from 'js-cookie'
import echarts from 'echarts'
import Contextmenu from "vue-contextmenujs"
import localforage from 'localforage'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import home from '@/view/home/index'
import router from './router'
import Mock from '@/mock/index'
import axios from '@/axios/index.js'
import '@/style/reset.css'
import common from '@/libs'
import store from '@/store/index'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$dayjs = dayjs
Vue.prototype.$common = common
Vue.prototype.$echarts = echarts
Vue.prototype.$common = common

window.localforage = localforage

Vue.use(ElementUI)
Vue.use(Contextmenu)

Mock.mockData()
COOKIES.set('saveType', 'mock', { expires: 7, path: '' });

/* eslint-disable no-new */
new Vue({
  el: '#transaction',
  router,
  store,
  components: { home },
  template: '<home/>'
})
