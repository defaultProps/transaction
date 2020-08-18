export default {
	state: {
		sprintType: '', // 区分activeSprint还是backlogSprint
		progressStateList: [], // 执行状态
		moduleList: [], // 模块类型
		hasDraggle: false // 是否拖动
	},
	mutations: {
		hasDraggle: (state, data) => {
			state.hasDraggle = data
		},
		sprintType: (state, data) => {
			state.sprintType = data
		},
		progressStateList: (state, data) => {
			state.progressStateList = data
		},
		moduleList: (state, data) => {
			state.moduleList = data
		}
	}
}
