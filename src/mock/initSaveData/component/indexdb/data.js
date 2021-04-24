import Mock from "mockjs-async"

export const links = [
  { name: '世界之妖，带你走进妖怪的世界', link: 'https://www.cbaigui.com/' },
  { name: '雪花之美，领略另一种风域', link: 'http://www.snowcrystals.com/guide/guide.html' },
  { name: 'CSS绚丽，创造五彩斑斓的黑', link: 'https://codepen.io/' },
  { name: 'Vue技术内幕，走进源码世界', link: 'http://caibaojian.com/vue-design/art/' },
  { name: '知乎之前端饭碗，日常学习平台', link: 'https://www.zhihu.com/collection/286882025' },
  { name: 'js拖动，有趣拖动库', link: 'https://github.com/Jexordexan/vue-slicksort' },
  { name: 'vuedraggable，大型拖动库', link: 'https://github.com/SortableJS/Vue.Draggable' },
  { name: '数据库基础， 扫盲', link: 'https://wujun234.github.io/2018/12/18/07' },
  { name: '煎蛋-最新有趣头条，无聊去处', link: 'http://jandan.net/' },
  { name: '紫云飞博客，日常膜拜大佬', link: 'https://www.cnblogs.com/ziyunfei/' },
  { name: 'postimage，免费图片托管工具', link: 'https://postimages.org/' },
  { name: 'cssgradient 渐变颜色选取工具', link: 'https://cssgradient.io/' },
  { name: 'DWB - 简单理解的文章', link: 'https://davidwalsh.name/' },
  { name: 'David Walsh 博客', link: 'https://davidwalsh.name/' },
  { name: 'stylint，css样式校验工具', link: 'https://stylelint.io/' },
  { name: '掘金 - 文章浏览网站', link: 'https://juejin.im/' },
  { name: 'webpack 源码分析', link: 'https://webpack.wuhaolin.cn/' },
  { name: 'codepen - 引力', link: 'https://codepen.io/akm2/pen/rHIsa' },
  { name: 'CSS灵感', link: 'https://chokcoco.github.io/CSS-Inspiration' },
  { name: 'axios源码分析', link: 'https://github.com/ronffy/axios-tutorial' },
  { name: 'vode canvas', link: 'http://voidcanvas.com/?s=' },
  { name: 'leetCode', link: 'https://leetcode-cn.com/' },
  { name: '牛客网', link: 'https://www.nowcoder.com/' },
  { name: '看目录就行', link: 'https://devopen.club/course/chromedevtools' },
  { name: 'survivejs 文章浏览', link: 'https://survivejs.com/react/introduction/' },
  { name: '材料设计，UI和前端首选的样式', link: 'https://www.mdui.org/design/patterns/data-formats.html#data-formats-date-time' },
  { name: 'markyun博客', link: 'https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions' },
  { name: 'lifesinger博客', link: 'https://github.com/lifesinger/blog' },
  { name: 'techfoco博客', link: 'https://techfoco.com/' },
  { name: '大前端面试题', link: 'http://bigerfe.com/' },
  { name: 'FE-Interview博客', link: 'https://blog.poetries.top/FE-Interview-Questions/docs/base.html' },
  { name: 'Advanced博客', link: 'https://github.com/Advanced-Frontend/Daily-Interview-Question/issues' },
  { name: 'mqyqingfeng博客', link: 'https://github.com/mqyqingfeng/Blog/issues' },
  { name: 'ly2011博客', link: 'https://github.com/ly2011/blog/issues' },
  { name: 'yygmind博客', link: 'https://github.com/yygmind/blog/issues' },
  { name: '算法网', link: 'http://ddrv.cn/' },
  { name: 'react学习', link: 'https://github.com/reactnativecn/react-native-guide' },
  { name: '人人FED', link: 'https://www.rrfed.com/' },
  { name: '码农头条', link: 'http://hao.caibaojian.com.cn/' }
]

export const tags = [
  // 工作
  { name: '日常琐事', id: Mock.mock('@guid'), color: '#5243aa', icon: '' },
  { name: '大块文章', id: Mock.mock('@guid'), color: '#598ed4', icon: '' },
  // 生活
  { name: '生活杂事', id: Mock.mock('@guid'), color: '#598ed4', icon: '' },
  { name: '其他模块', id: Mock.mock('@guid'), color: '#598ed4', icon: '' }
]
export const issueTypeList = [
  {
    id: Mock.mock('@guid'),
    icon: 'icon-shujuzhongjian',
    color: '#0065ff',
    label: '工作',
    value: 'work',
    moreIcon: ['icon-gongzuo', 'icon-code', 'icon-all-fill', 'icon-all', 'icon-auto', 'icon-raw', 'icon-discounts-fill', 'icon-tuishui']
  },
  {
    id: Mock.mock('@guid'),
    icon: 'icon-shenghuo',
    color: '#E6A23C',
    label: '生活',
    value: 'life',
    moreIcon: ['icon-process', 'icon-waihuishuju', 'icon-read2', 'icon-pic-fill', 'icon-landtransportation']
  }
]

export const progressStateList = [
  {
    name: "未开始",
    link: "not-start",
    id: Mock.mock('@guid')
  },
  {
    name: "处理中",
    link: "doing",
    id: Mock.mock('@guid')
  },
  {
    name: "已完成",
    link: "finish",
    id: Mock.mock('@guid')
  },
  {
    name: "关闭",
    link: "close",
    id: Mock.mock('@guid')
  }
]

export const sprints = [
  {
    title: '针对个人体型和身体素质合理筛选健身运动、指导视频并设计一套长期的基础健身计划方案',
    urgencyLevel: 5, // 紧急度
    issueDesc: '', // 描述
    issueType: 'life', // 类型
    issueRemark: '', // 备注
    createTime: 1618874612605, // 创建时间
    updateTime: 1618874612605, // 最近更新
    tag: tags[2], // 模块
    moduleState: progressStateList[1],
    type: 'active',
    id: Mock.mock('@guid') // 唯一id
  },
  {
    title: '正则表达式的常用校验',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: 'javaScript | 函数柯里化',
    urgencyLevel: 4,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: 'javaScript | 节流和防抖的实现',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: 'Vue | Vue中template与render的渲染方式',
    urgencyLevel: 6,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: progressStateList[1],
    type: 'active',
    id: Mock.mock('@guid')
  },
  {
    title: '实现chrome扩展',
    urgencyLevel: 5,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: '设计原则 | 单一职责原则',
    urgencyLevel: 2,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: 'popoer.js源码分析',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: '设计原则 | 开闭原则',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: progressStateList[0],
    type: 'active',
    id: Mock.mock('@guid')
  },
  {
    title: 'GIT | GIT FLS如何管理二进制大文件',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: 'babel | babel编译class',
    urgencyLevel: 4,
    issueDesc: '',
    issueType: 'life',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: '兴趣 | 素描 | 准备素描工具和bilibili选取学习教程',
    urgencyLevel: 4,
    issueDesc: '',
    issueType: 'life',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[2],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: 'Babel | babel编译var let const',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: progressStateList[1],
    type: 'active',
    id: Mock.mock('@guid')
  },
  {
    title: '选购100本学习书籍， 存入管理器项目中',
    urgencyLevel: 5,
    issueDesc: '',
    issueType: 'life',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[2],
    moduleState: progressStateList[2],
    type: 'active',
    id: Mock.mock('@guid')
  },
  {
    title: '#css | css-loader源码分析',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[2],
    moduleState: progressStateList[0],
    type: 'active',
    id: Mock.mock('@guid')
  },
  {
    title: '模块化 | CMD AMD ESM UMD的区别',
    urgencyLevel: 6,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: progressStateList[0],
    type: 'active',
    id: Mock.mock('@guid')
  },
  {
    title: '#开源项目 | npm | 编写一个npm包并发布',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: 'javaScript | 类型转换和如何防错',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: progressStateList[2],
    type: 'active',
    id: Mock.mock('@guid')
  },
  {
    title: '#大块文章 | #CSS 电池充电',
    urgencyLevel: 6,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: progressStateList[2],
    type: 'active',
    id: Mock.mock('@guid')
  },
  {
    title: 'Nodejs | 爬虫实现和防爬',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: progressStateList[1],
    type: 'active',
    id: Mock.mock('@guid')
  },
  {
    title: 'Git基本操作和常用插件及其配置',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: progressStateList[3],
    type: 'active',
    id: Mock.mock('@guid')
  },
  {
    title: '#源码分析 | serve源码分析',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: '埃及阿斯旺大坝建造的隐患',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'life',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[2],
    moduleState: progressStateList[1],
    type: 'active',
    id: Mock.mock('@guid')
  },
  {
    title: 'Promise解析',
    urgencyLevel: 4,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[3],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: 'JavaScript | 内存泄露',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: 'css | box-shadow分析',
    urgencyLevel: 6,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: '前端存储问题',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: '网络 | 概述前端的一些安全问题以及解决方案',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: 'javaScript | 位运算的使用场景',
    urgencyLevel: 1,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: '设计未来十年内的工作时间线',
    urgencyLevel: 6,
    issueDesc: '',
    issueType: 'life',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[2],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: '#开源项目 | 发布npm包',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: '浏览器渲染机制',
    urgencyLevel: 6,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  },
  {
    title: '浏览器输入url后的过程',
    urgencyLevel: 2,
    issueDesc: '',
    issueType: 'work',
    issueRemark: '',
    createTime: 1618874612605,
    updateTime: 1618874612605,
    tag: tags[1],
    moduleState: null,
    type: 'backlog',
    id: Mock.mock('@guid')
  }
]
