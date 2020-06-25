import Vue from 'vue'
import home from '@/view/home/index'
import router from './router'
import Mock from '@/mock/index'
import axios from '@/axios/index.js'
import dayjs from 'dayjs'
import store from '@/store/index'
import image from '@/images/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/reset.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$dayjs = dayjs
Vue.prototype.$image = image

Vue.use(ElementUI)

Mock.mockData()

/* eslint-disable no-new */
new Vue({
  el: '#cai',
  router,
  store,
  components: { home },
  template: '<home/>'
})
