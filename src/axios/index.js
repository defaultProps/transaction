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
		menu: params => Axios({method: 'post', url: protocol + 'header/menu', data: params})
	},
	sprints: {
		backlogList: params => Axios({method: 'post', url: protocol + 'sprints/backlogList', data: params}),
		sprintList: params => Axios({method: 'post', url: protocol + 'sprints/sprintList', data: params})
	}
}
