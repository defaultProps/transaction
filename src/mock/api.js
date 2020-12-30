import controller from './initSaveData'
import COOKIES from 'js-cookie'
const env = 'indexdb' || COOKIES.get('saveType')

export default {
	thus: {
		list: obj => {
			let result = [
				{name: '世界之妖，带你走进妖怪的世界', link: 'https://www.cbaigui.com/'},
				{name: '雪花之美，领略另一种风域', link: 'http://www.snowcrystals.com/guide/guide.html'},
				{name: 'CSS绚丽，创造五彩斑斓的黑', link: 'https://codepen.io/'},
				{name: 'Vue技术内幕，走进源码世界', link: 'http://caibaojian.com/vue-design/art/'},
				{name: '知乎之前端饭碗，日常学习平台', link: 'https://www.zhihu.com/collection/286882025'},
				{name: 'js拖动，有趣拖动库', link: 'https://github.com/Jexordexan/vue-slicksort'},
				{name: 'vuedraggable，大型拖动库', link: 'https://github.com/SortableJS/Vue.Draggable'},
				{name: '数据库基础， 扫盲', link: 'https://wujun234.github.io/2018/12/18/07'},
				{name: '煎蛋-最新有趣头条，无聊去处', link: 'http://jandan.net/'},
				{name: '紫云飞博客，日常膜拜大佬', link: 'https://www.cnblogs.com/ziyunfei/'},
				{name: 'postimage，免费图片托管工具', link: 'https://postimages.org/'},
				{name: 'cssgradient 渐变颜色选取工具', link: 'https://cssgradient.io/'},
				{name: 'DWB - 简单理解的文章', link: 'https://davidwalsh.name/'},
				{name: 'David Walsh 博客', link: 'https://davidwalsh.name/'},
				{name: 'stylint，css样式校验工具', link: 'https://stylelint.io/'},
				{name: '掘金 - 文章浏览网站', link: 'https://juejin.im/'},
				{name: 'webpack 源码分析', link: 'https://webpack.wuhaolin.cn/'},
				{name: 'codepen - 引力', link: 'https://codepen.io/akm2/pen/rHIsa'},
				{name: 'CSS灵感', link: 'https://chokcoco.github.io/CSS-Inspiration'},
				{name: 'axios源码分析', link: 'https://github.com/ronffy/axios-tutorial'},
				{name: 'vode canvas', link: 'http://voidcanvas.com/?s='},
				{name: 'leetCode', link: 'https://leetcode-cn.com/'},
				{name: '牛客网', link: 'https://www.nowcoder.com/'},
				{name: '看目录就行', link: 'https://devopen.club/course/chromedevtools'},
				{name: 'survivejs 文章浏览', link: 'https://survivejs.com/react/introduction/'},
				{name: '材料设计，UI和前端首选的样式', link: 'https://www.mdui.org/design/patterns/data-formats.html#data-formats-date-time'},
				{name: 'markyun博客', link: 'https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions'},
				{name: 'lifesinger博客', link: 'https://github.com/lifesinger/blog'},
				{name: 'techfoco博客', link: 'https://techfoco.com/'},
				{name: '大前端面试题', link: 'http://bigerfe.com/'},
				{name: 'FE-Interview博客', link: 'https://blog.poetries.top/FE-Interview-Questions/docs/base.html'},
				{name: 'Advanced博客', link: 'https://github.com/Advanced-Frontend/Daily-Interview-Question/issues'},
				{name: 'mqyqingfeng博客', link: 'https://github.com/mqyqingfeng/Blog/issues'},
				{name: 'ly2011博客', link: 'https://github.com/ly2011/blog/issues'},
				{name: 'yygmind博客', link: 'https://github.com/yygmind/blog/issues'},
				{name: '算法网', link: 'http://ddrv.cn/'},
				{name: 'react学习', link: 'https://github.com/reactnativecn/react-native-guide'},
				{name: '人人FED', link: 'https://www.rrfed.com/'},
				{name: '码农头条', link: 'http://hao.caibaojian.com.cn/'}
			]

			return {
				status: 200,
				data: result
			}
		}
	},
	dashboard: {
		getdashboardList: params => controller[env]('getdashboardList', params)
	},
	sprints: {
		sprintIssueDetail: params => controller[env]('sprintIssueDetail', params),
		activeSprintList: params => controller[env]('activeSprintList', params),
		closeActiveSprintIssue: params => controller[env]('closeActiveSprintIssue', params),
		getModuleList: params => controller[env]('getModuleList', params),
		getProgressStateList: params => controller[env]('getProgressStateList', params),
		updateSptintmoduleState: params => controller[env]('updateSptintmoduleState', params),
		backlogSprintList: params => controller[env]('backlogSprintList', params),
		storeSprint: params => controller[env]('storeSprint', params)
	}
}
