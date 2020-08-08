
function routeErrorCallback() {

}

let article = r => require.ensure([], () => r(require('@/view/article/index')), routeErrorCallback, 'article')
let story = r => require.ensure([], () => r(require('@/view/story/index')), routeErrorCallback, 'story')
let thus = r => require.ensure([], () => r(require('@/view/thus/index')), routeErrorCallback, 'thus')
let dashboard = r => require.ensure([], () => r(require('@/view/thus/index')), routeErrorCallback, 'thus')
let manage = r => require.ensure([], () => r(require('@/view/manage/index')), routeErrorCallback, 'manage')
let initStore = r => require.ensure([], () => r(require('@/view/initStore/index')), routeErrorCallback, 'initStore')
let routes = [
	{
		path: '/',
		redirect: '/initStore'
	},
	{
		path: '/initStore',
		name: 'initStore',
		component: initStore,
		meta: {title: '初始配置', level: 0, auth: 0, sidebar: false}
	},
	{
		path: '/uxo',
		name: 'uxo',
		component: story,
		meta: {title: '事务分发', level: 0, auth: 0, sidebar: false}
	},
	{
		path: '/story',
		name: 'story',
		component: story,
		meta: {title: '事务分发', level: 0, auth: 0, sidebar: false}
	},
	{
		path: '/story:link',
		name: 'story',
		component: story,
		meta: {title: '事务分发', level: 0, auth: 0, sidebar: false}
	},
	{
		path: '/article',
		name: 'article',
		component: article,
		meta: {title: '大块文章', level: 0, auth: 0, sidebar: false}
	},
	{
		path: '/thus',
		name: 'thus',
		component: thus,
		meta: {title: '兴趣使然的模块', level: 0, auth: 0, sidebar: false}
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: dashboard,
		meta: {title: '仪表盘', level: 0, auth: 0, sidebar: false}
	},
	{
		path: '/manage',
		name: 'manage',
		component: manage,
		meta: {title: '用户管理', level: 0, auth: 0, sidebar: false}
	}
]

export default routes
