
import {routeErrorCallback} from '@/libs/common'

let article = r => require.ensure([], () => r(require('@/view/article/index')), routeErrorCallback, 'article')
let story = r => require.ensure([], () => r(require('@/view/story/index')), routeErrorCallback, 'story')

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
		meta: {title: '我有故事，你有酒么', level: 0, auth: 0, sidebar: false}
	}
]

export default routes