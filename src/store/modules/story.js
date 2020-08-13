export default {
	state: {
		sprintType: '',
		progressStateList: [],
		moduleList: []
	},
	getters: {
		sprintType: state => state.sprintType
	},
	mutations: {
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
