import Mock from "mockjs"

export default {
	article: {
		list: obj => {
			let result = []
			let len = obj.pageSize

			while (len > 0) {
				result.push({
					'img': Math.random() > 0.5 ? Mock.Random.image('100x100') : null,	// logo
					'level': Math.ceil(Math.random() * 6),	// 文章阅读level
					'title': '@ctitle(10, 40)',	// 文章标题
					'author': '@cname',	// 文章作者
					'authorID': Mock.mock('@guid(10)'),	// 作者ID
					'content': Mock.mock('@cparagraph(1, 3)'),	// 简短内容
					'articleID': '@id',	// 文章唯一ID
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
	}
}
