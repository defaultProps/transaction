export default {
  namespaced: true,
  state: {
    axiosErrorList: [] // 所有接口返回的错误信息收集
  },
  mutations: {
    PUSH_AXIOS_ERRORLIST: (state, val) => {
      state.axiosErrorList.push(val)
    }
  },
  actions: {

  }
}
