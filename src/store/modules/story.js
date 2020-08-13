export default {
	state: {
		sprintType: ''
	},
	getters: {
		sprintType: state => state.sprintType
	},
	mutations: {
		sprintType: (state, data) => {
			state.sprintType = data
		}
	}
}
