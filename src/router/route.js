
import {routeErrorCallback} from '@/libs/common'

let article = r => require.ensure([], () => r(require('@/view/article/index')), routeErrorCallback, 'article')
let story = r => require.ensure([], () => r(require('@/view/story/index')), routeErrorCallback, 'story')
let dashboard = r => require.ensure([], () => r(require('@/view/dashboard/index')), routeErrorCallback, 'dashboard')

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
		name: 'uxo',
		component: article,
		meta: {title: '文章', level: 0, auth: 0, sidebar: false}
	},
	{
		path: '/story',
		name: 'story',
		component: story,
		meta: {title: '事务分发', level: 0, auth: 0, sidebar: false}
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: dashboard,
		meta: {title: '仪表盘', level: 0, auth: 0, sidebar: false}
	}
]

export default routes
