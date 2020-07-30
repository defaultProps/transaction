export default {
  state: {
		isMockMode: true, // 是否开启Mock模式
		theme: 'default', // 主题
    consequentFastClickSecond: 1000 // 防连点时间限制ms
  },
  mutations: {
    isMockMode: (state, data) => {
      state.isMockMode = data
		}
  }
}
