import COOKIES from 'js-cookie'

export default {
  state: {
    saveType: '' // 存储类型
  },
  getters: {
    saveType: state => state.saveType
  },
  mutations: {
    saveType: (state, data) => {
      state.saveType = data;
		}
  },
  actions: {
    saveType ({ commit, state }, saveType) {
      commit('saveType', saveType);
      COOKIES.set('saveType', saveType, { expires: 7, path: '' });
    }
  }
}
