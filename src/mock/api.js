import Mock from "mockjs"

export default {
	article: {
		menu: obj => {
			return {
				status: 200,
				data: [
					{
						name: '技术',
						link: '',
						children: [
							{
								name: 'javaScript',
								link: '/javaScript'
							},
							{
								name: '协议',
								link: '/agreement'
							},
							{
								name: 'leetCode',
								link: '/leetCode'
							},
							{
								name: '浏览器',
								link: '/browser'
							},
							{
								name: 'webpack',
								link: '/webpack'
							},
							{
								name: '小程序',
								link: '/applet'
							},
							{
								name: 'MVVM库',
								link: '/frame'
							}
						]
					},
					{
						name: '生活',
						link: ''
					}
				]
			}
		},
		list: obj => {
			let result = []
			let len = obj.pageSize

			while (len > 0) {
				result.push({
					'img': Math.random() > 0.5 ? Mock.Random.image('100x100') : null,	// logo
					'level': Math.ceil(Math.random() * 6),	// 文章阅读level
					'title': Mock.mock('@ctitle(10, 40)'),	// 文章标题
					'author': Mock.mock('@cname'),	// 文章作者
					'authorID': Mock.mock('@guid(10)'),	// 作者ID
					'content': Mock.mock('@cparagraph(5, 7)'),	// 简短内容
					'articleID': Mock.mock('@id'),	// 文章唯一ID
					'praise|1-100': 100, // 文章点赞数量
					'publish': Mock.mock('@date()')	// 文章发布时间
				})
				-- len
			}

			return {
				status: 200,
				data: {
					list: result,
					total: 1000,
					sortBy: obj.sortBy,
					pageSize: obj.pageSize,
					currentPage: obj.currentPage
				}
			}
		}
	},
	header: {
		getMenu: obj => {
			let result = [
				{name: '文章', link: 'article'},
				{name: '故事', link: 'story'},
				{name: '仪表盘', link: 'dashboard'},
				{name: '项目', link: 'projects'},
				{name: '社区', link: 'community'},
				{name: '求知', link: 'seekKnowledge'},
				{name: '使然', link: 'thus'},
				{name: '问题', link: 'question'},
				{name: '市场', link: 'market'},
				{name: '生活', link: 'life'}
			]

			return {
				status: 200,
				data: result
			}
		}
	}
}
