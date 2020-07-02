
import {routeErrorCallback} from '@/libs/common'

let article = r => require.ensure([], () => r(require('@/view/article/index')), routeErrorCallback, 'article')
let story = r => require.ensure([], () => r(require('@/view/story/index')), routeErrorCallback, 'story')
let thus = r => require.ensure([], () => r(require('@/view/thus/index')), routeErrorCallback, 'thus')

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
		meta: {title: '大块文章', level: 0, auth: 0, sidebar: false}
	},
	{
		path: '/story',
		name: 'story',
		component: story,
		meta: {title: '事务分发', level: 0, auth: 0, sidebar: false}
	},
	{
		path: '/thus',
		name: 'thus',
		component: thus,
		meta: {title: '兴趣使然的模块', level: 0, auth: 0, sidebar: false}
	}
]

export default routes
