import Mock from "mockjs-async"
import localforage from 'localforage';

export const HEADER_NAV = [
    {name: '事务分发', link: 'story', color: '#5243aa', icon: ''},
    {name: '仪表盘', link: 'dashboard', color: '#ffab00', icon: ''},
    {name: '大块文章', link: 'article', color: '#598ed4', icon: ''},
    {name: '旅游指南', link: 'dashboard', color: '#598ed4', icon: ''},
    {name: '农贸市场', link: 'existence', color: '#5243aa', icon: ''},
    {name: '健身运动', link: 'Sketch', color: '#ffab00', icon: ''},
    {name: '厨房日记', link: 'check', color: '#598ed4', icon: ''},
    {name: '宇宙探索', link: 'universe', color: '#5243aa', icon: ''},
    {name: '游戏人生', link: 'games', color: '#598ed4', icon: ''}
  ].map((v, i) => ({...v, id: `module-${i}`}))

const tags = [
  {name: '大块文章', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
  {name: '日常学习', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
	{name: '工作上班', guid: Mock.mock('@guid'), color: '#5243aa', icon: ''},
	{name: '生活乐趣', guid: Mock.mock('@guid'), color: '#ffab00', icon: ''},
	{name: '旅游指南', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
	{name: '个人开源', guid: Mock.mock('@guid'), color: '#5243aa', icon: ''},
	{name: '健身运动', guid: Mock.mock('@guid'), color: '#ffab00', icon: ''},
	{name: '厨房日记', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
	{name: '宇宙探索', guid: Mock.mock('@guid'), color: '#5243aa', icon: ''},
  {name: '游戏人生', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
  {name: '绘画兴趣', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
  {name: '思考意义', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
  {name: '情感心事', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
  {name: '其他模块', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''}
]

const progressStateList = [
  {name: "未开始", link: "not-start"},
  {name: "处理中", link: "doing"},
  {name: "已完成", link: "finish"}
]

const activeSprints = [
  {
    title: '针对个人体型和身体素质合理筛选健身运动、指导视频并设计一套长期的基础健身计划方案',
    urgencyLevel: 3, // 紧急度
    issueDesc: Mock.mock('@cparagraph(3, 10)'), // 描述
    issueType: 'work', // 类型
    issueRemark: Mock.mock('@cparagraph(3, 10)'), // 备注
    createTime: Mock.mock('@date("yyyy/MM/dd")'), // 创建时间
    updateTime: Mock.mock('@date("yyyy/MM/dd")'), // 最近更新
    tag: tags[6], // 模块
    moduleState: progressStateList[0],
    guid: Mock.mock('@guid') // 唯一id
  },
  {
    title: '搜集国内外的各类蔬菜并运用于厨房营养搭配中',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[5],
    moduleState: progressStateList[1],
    guid: Mock.mock('@guid')
  },
  {
    title: '购买腾讯云服务器并搭建完成',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'work',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[5],
    moduleState: progressStateList[2],
    guid: Mock.mock('@guid')
  },
  {
    title: '购买域名并进行备案',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[5],
    moduleState: progressStateList[2],
    guid: Mock.mock('@guid')
  },
  {
    title: 'todo项目中所有数据迁移至远程服务器',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'work',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[5],
    moduleState: progressStateList[1],
    guid: Mock.mock('@guid')
  },
  {
    title: 'todo项目增加node后端处理数据',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'work',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[5],
    moduleState: progressStateList[0],
    guid: Mock.mock('@guid')
  },
  {
    title: '使用react搭建项目 - 世界植物录',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[5],
    moduleState: progressStateList[0],
    guid: Mock.mock('@guid')
  }
]

export const backlogSprints = [
  {
    title: '初始一个项目hourse，设计家庭房屋设计图',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '根据国内外养殖业的行情设计一套在线查询网站',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '准备素描工具和选取学习教程',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#生活乐趣 | 根据国内外养殖业的行情设计一套在线查询网站',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#初始一个项目animals， 搜集各类有趣生物信息',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'work',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '选购100本学习书籍， 存入管理器项目中',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '初始一个项目， 搜集心理学、哲学',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'work',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '初始一个项目， 收集世界范围有趣新闻娱乐',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'work',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#开源项目 | npm | 编写一个npm包并发布',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'work',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#日常学习 | 写作 | #JS | 类型转换和如何防错',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'work',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#日常学习 | 写作 | CSS电池充电',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'work',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#日常学习 | 写作 | 爬虫实现和防爬',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'work',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#日常学习 | 写作 | Git基本操作和常用插件及其配置',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#日常学习 | 写作 | babel编译class的过程和技巧展示',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#日常学习 | 写作 | JS异步操作 | 发展历程、区别以及优缺点',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#日常学习 | 写作 | CSS常用函数',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#日常学习 | 写作 | JS内存泄露',
    urgencyLevel: 3,
    issueDesc: Mock.mock('@cparagraph(3, 10)'),
    issueType: 'life',
    issueRemark: Mock.mock('@cparagraph(3, 10)'),
    createTime: Mock.mock('@date("yyyy/MM/dd")'),
    updateTime: Mock.mock('@date("yyyy/MM/dd")'),
    tag: tags[6],
    guid: Mock.mock('@guid')
  }
]

export function localforageStore() {
  localforage.clear()
  localforage.dropInstance();

  let backlogSprintStore = localforage.createInstance({
    name: 'todo',
    storeName: 'backlogSprint'
  })

  let activeSprintStore = localforage.createInstance({
    name: 'todo',
    storeName: 'activeSprint'
  })

  let backlogSprintPromise = [];
  let activesprintPromise = [];

  backlogSprints.forEach(sprint => {
    backlogSprintPromise.push(backlogSprintStore.setItem(sprint.guid, sprint))
  })
  activeSprints.forEach(sprint => {
    activesprintPromise.push(activeSprintStore.setItem(sprint.guid, sprint))
  })

  Promise.all([...backlogSprintPromise, ...activesprintPromise]).then(() => {
    return {
      data: {},
      status: 200
    }
  })
}
