import Mock from 'mockjs'
import api from './api'

let protocol = document.location.protocol === 'https:' ? 'https://' : 'http://'

protocol += process.env.NODE_ENV === 'development' ? 'dev.uxo.com.cn/' : 'prouction.uxo.com.cn/'

export default {
	mockData () {
		Mock.mock(protocol + 'article/list', 'post', req => api.article.list(JSON.parse(req.body)))
		Mock.mock(protocol + 'article/menu', 'post', req => api.article.menu(JSON.parse(req.body)))
		Mock.mock(protocol + 'header/menu', 'post', req => api.header.getMenu(JSON.parse(req.body)))
	}
}
