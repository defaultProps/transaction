import Mock from "mockjs"

export default {
	sprints: {
		sprintList: obj => {
			function sprintListFn() {
				let pointsTotal = 0;
				let total = Math.ceil(Math.random() * 10) + 20
				let issueList = [];
				let i = 0

				while (i < total) {
					let points = Math.ceil(Math.random() * 10)
					issueList.push({
						name: Mock.mock('@cname'),
						order: i,
						level: Math.ceil(Math.random() * 5),
						link: `INHOPE-${Math.ceil(Math.random() * 9000) + 1000}`,
						type: Math.random() > 0.5 ? 'needs' : 'bug',
						title: Mock.mock('@csentence(20, 40)'),
						fixed: Math.random() > 0.5,
						points
					})
					pointsTotal += points
					i++
				}

				return {
					issueList,
					pointsTotal,
					total
				}
			}

			let result = []

			for (let i = 0; i < 25; i++) {
				let v = sprintListFn()

				result.push({
					id: Mock.mock('@guid'),
					title: `sprint${i}`,
					createTime: Mock.mock('@datetime'),
					endTime: Mock.mock('@datetime'),
					status: i >= 23 ? 'doing' : 'done',
					count: v.total,
					issueList: v.issueList,
					pointsTotal: v.pointsTotal
				})
			}
			return {
				status: 200,
				data: {
					sprintList: result.reverse()
				}
			}
		},
		backlogList: obj => {
			let result = []
			let i = 0;
			let total = Math.ceil(Math.random() * 60) + 120

			while (i < total) {
				result.push({
					name: Mock.mock('@cname'),
					order: i,
					link: `INHOPE-${Math.ceil(Math.random() * 9000) + 1000}`,
					type: Math.random() > 0.5 ? 'needs' : 'bug',
					level: Math.ceil(Math.random() * 5),
					title: Mock.mock('@csentence(20, 40)'),
					fixed: Math.random() > 0.5,
					points: Math.random() > 0.7 ? Math.ceil(Math.random() * 10) : null
				})
				++i
			}
			return {
				status: 200,
				data: {
					total,
					sprintList: result
				}
			}
		}
	},
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
					'level': Math.ceil(Math.random() * 5),	// 文章阅读level
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
				{name: '事务', link: 'story'},
				{name: '使然', link: 'thus'},
				{name: '仪表盘', link: 'dashboard'},
				{name: '绘画', link: 'drawing'},
				{name: '求知', link: 'seekKnowledge'},
				{name: '生活', link: 'life'}
			]

			return {
				status: 200,
				data: result
			}
		}
	}
}
