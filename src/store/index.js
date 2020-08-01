import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import conf from './modules/conf'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    conf
  }
})

export default store
