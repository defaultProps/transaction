import Vue from 'vue'
import COOKIES from 'js-cookie'
import VueTinymce from "@packy-tang/vue-tinymce"
import echarts from 'echarts'
import Contextmenu from "vue-contextmenujs"
import localforage from 'localforage'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import draggable from 'vuedraggable'

import home from '@/view/home/index'
import router from './router'
import Mock from '@/mock/index'
import axios from '@/axios/index.js'
import '@/style/reset.css'
import edit from '@/components/common/edit'
import common from '@/libs'
import store from '@/store/index'
import image from '@/images/index'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$dayjs = dayjs
Vue.prototype.$image = image
Vue.prototype.$common = common
Vue.prototype.$echarts = echarts
Vue.prototype.$common = common

window.localforage = localforage

Vue.component('uxo-draggable', draggable)
Vue.component('uxo-edit', edit)
Vue.use(VueTinymce)
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
