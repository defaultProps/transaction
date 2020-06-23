
import {routeErrorCallback} from '@/libs/common'
let article = r => require.ensure([], () => r(require('@/view/article/index')), routeErrorCallback, 'article')

let routes = [
	{
		path: '/',
		redirect: '/uxo'
	},
	{
		path: '/article',
		redirect: '/uxo'
	},
	{
		path: '/uxo',
		name: 'article',
		component: article,
		meta: {title: '文章', level: 0, auth: 0, sidebar: false}
	}
]

export default routes
