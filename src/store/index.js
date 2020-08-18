import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import conf from './modules/conf'
import story from './modules/story'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    conf,
    story
  }
})

export default store
