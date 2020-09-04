
function routeErrorCallback() {

}

let article = r => require.ensure([], () => r(require('@/view/article/index')), routeErrorCallback, 'article')
let story = r => require.ensure([], () => r(require('@/view/story/index')), routeErrorCallback, 'story')
let thus = r => require.ensure([], () => r(require('@/view/thus/index')), routeErrorCallback, 'thus')
let dashboard = r => require.ensure([], () => r(require('@/view/dashboard/index')), routeErrorCallback, 'dashboard')
let manage = r => require.ensure([], () => r(require('@/view/manage/index')), routeErrorCallback, 'manage')
let login =  r => require.ensure([], () => r(require('@/view/login/index')), routeErrorCallback, 'login')
let initStore = r => require.ensure([], () => r(require('@/view/initStore/index')), routeErrorCallback, 'initStore')

/**
 * @meta: auth: 用户级别 0无需登录，1普通用户，2管理员， showheaderBar 是否显示左侧顶部栏
 */
let routes = [
	{
		path: '/',
		redirect: '/initStore'
	},
	{
		path: '/login',
		component: login,
		meta: {title: '事务管理 - 登录', auth: 0, showheaderBar: false}
	},
	{
		path: '/initStore',
		name: 'initStore',
		component: initStore,
		meta: {title: '初始配置', auth: 0, showheaderBar: false}
	},
	{
		path: '/uxo',
		name: 'uxo',
		component: story,
		meta: {title: '面板', auth: 0, showheaderBar: true}
	},
	{
		path: '/story',
		name: 'story',
		component: story,
		meta: {title: '面板', auth: 0, showheaderBar: true}
	},
	{
		path: '/article',
		name: 'article',
		component: article,
		meta: {title: '大块文章', auth: 0, showheaderBar: true}
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: dashboard,
		meta: {title: '仪表盘', auth: 0, showheaderBar: true}
	},
	{
		path: '/thus',
		name: 'thus',
		component: thus,
		meta: {title: '兴趣使然的模块', auth: 0, showheaderBar: true}
	},
	{
		path: '/manage',
		name: 'manage',
		component: manage,
		meta: {title: '用户管理', auth: 0, showheaderBar: true}
	}
]

export default routes;
