import Axios from '@/service/http.js'

let protocol = document.location.protocol === 'https:' ? 'https:' : 'http:'

export default {
	article: {
		// 首页文章列表
		list: params => Axios({method: 'GET', url: protocol + '/article/list', data: params}),
		// 文章详情
		detail: params => Axios({method: 'GET', url: protocol + '/article/detail', data: params}),
		// 新建/编辑 - 文章
		edit: params => Axios({method: 'GET', url: protocol + '/article/edit', data: params})
	}
}
