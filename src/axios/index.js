import Axios from '@/service/http.js'

let protocol = document.location.protocol === 'https:' ? 'https://' : 'http://'

protocol += process.env.NODE_ENV === 'development' ? 'dev.uxo.com.cn/' : 'uxo.com.cn/'

export default {
	article: {
		// 首页文章列表
		list: params => Axios({method: 'post', url: protocol + 'article/list', data: params}),
		// 文章详情
		detail: params => Axios({method: 'post', url: protocol + 'article/detail', data: params}),
		// 新建/编辑 - 文章
		edit: params => Axios({method: 'post', url: protocol + 'article/edit', data: params}),
		// 首页文章菜单栏
		menu: params => Axios({method: 'post', url: protocol + 'article/menu', data: params})
	},
	header: {
		getheaderMenu: params => Axios({method: 'post', url: protocol + 'header/menu', data: params})
	},
	sprints: {
		sprintIssueDetail: params => Axios({method: 'post', url: protocol + 'sprints/sprintIssueDetail', data: params}),
		backlogSprintList: params => Axios({method: 'post', url: protocol + 'sprints/backlogSprintList', data: params}),
		activeSprintList: params => Axios({method: 'post', url: protocol + 'sprints/activeSprintList', data: params}),
		// activeSprint执行状态设置为close
		closeActiveSprintIssue: params => Axios({method: 'post', url: protocol + 'sprints/closeActiveSprintIssue', data: params}),
		// issue设置模块类型、执行状态（除了close）
		updateSptintmoduleState: params => Axios({method: 'post', url: protocol + 'sprints/updateSptintmoduleState', data: params}),
		// 获取模块类型列表
		getModuleList: params => Axios({method: 'post', url: protocol + 'sprints/getModuleList', data: params}),
		// 获取执行状态列表
		getProgressStateList: params => Axios({method: 'post', url: protocol + 'sprints/getProgressStateList', data: params}),
		storeSprint: params => Axios({method: 'post', url: protocol + 'sprints/storeSprint', data: params})
	},
	thus: {
		list: params => Axios({method: 'post', url: protocol + 'thus/list', data: params})
	},
	// 仪表盘
	dashboard: {
		// 仪表盘列表
		getdashboardList: params => Axios({method: 'post', url: protocol + 'dashboard/getdashboardList', data: params})
	}
}
