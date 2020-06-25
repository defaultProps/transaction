export default {
	state: {
		attentionedCount: 0, // ／关注我的人数
		attentionCount: 0, // 我关注的人数
		uid: null, // 用户ID
		name: '剑南道刺史',  // 用户名
		level: 0 // 用户等级
	},
	getters: {
		uid: state => state.uid,
		islogin: state => !!state.uid,
		attentionedCount: state => state.attentionedCount,
		attentionCount: state => state.attentionCount
	},
	mutations: {
		attentionedCount: (state, data) => {
			state.attentionedCount = data
		},
		attentionCount: (state, data) => {
			state.attentionCount = data
		},
		uid: (state, data) => {
			state.uid = data
		}
	}
}
