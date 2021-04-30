import Vue from 'vue'
import COOKIES from 'js-cookie'
import Contextmenu from "vue-contextmenujs"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import home from '@/view/home/index'
import router from './router'
import Mock from '@/mock/index'
import '@/style/reset.css'
import store from '@/store/index'

Vue.config.productionTip = false

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
