export default {
  state: {
    saveType: '' // 存储类型
  },
  getters: {
    saveType: state => state.saveType
  },
  mutations: {
    saveType: (state, data) => {
      state.saveType = data
		}
  }
}
