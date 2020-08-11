import { modulesList } from '@/view/story/component/storyConstant.js'
import Mock from "mockjs"
import { intersects } from 'semver';

let tags = [
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

const backlogSprints = [
  {title: '#健身运动 | 针对个人体型和身体素质进行合理的筛选健身运动、指导视频以及设计一套基础健身计划方案', point: '3', level: 3, type: 'life'},
  {title: '#日常学习 | 写作 | 一篇爬虫文章刊登到github博客中', point: '3', level: 3, type: 'life'},
  {title: '#农贸市场 | 针对农贸市场的蔬菜行情设计一个在线实时查询网站', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 设计家庭房屋设计图稿(autoCAD)', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 准备写实绘画的工具及其学习教程', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 根据国内外养殖业的行情设计一套在线查询网站', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 搜集各类有趣生物信息', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 初始一项兴趣项目 | 心理学、哲学', point: '3', level: 3, type: 'life'},
  {title: '#开源项目 | 任务管理器 | 删除文章模块，并修改为面板模块', point: '3', level: 3, type: 'life'},
  {title: '#开源项目 | 任务管理器 | 新增汇编模块，文章模块中收集导航栏移动到汇编模块', point: '3', level: 3, type: 'life'},
  {title: '#日常学习 | 选购100本学习书籍， 存入管理器项目中', point: '1', level: 3, type: 'life'},
  {title: '#开源项目 | npm | 编写一个npm包并发布', point: '1', level: 3, type: 'work'},
  {title: '#开源项目 | todo | 事务模块增加右键功能', point: '1', level: 3, type: 'work'},
  {title: '#日常学习 | 写作 | #JS | 类型转换和如何防错', point: '1', level: 3, type: 'life'},
  {title: '#日常学习 | 写作 | CSS电池充电', point: '1', level: 3, type: 'life'},
  {title: '#日常学习 | 写作 | 爬虫实现和防爬', point: '1', level: 3, type: 'life'},
  {title: '#日常学习 | 写作 | Git基本操作和常用插件及其配置', point: '1', level: 3, type: 'life'},
  {title: '#日常学习 | 写作 | babel编译class的过程和技巧展示', point: '1', level: 3, type: 'life'},
  {title: '#日常学习 | 写作 | JS异步操作 | 发展历程、区别以及优缺点', point: '1', level: 3, type: 'life'},
  {title: '#日常学习 | 写作 | CSS常用函数', point: '1', level: 3, type: 'life'},
  {title: '#日常学习 | 写作 | JS内存泄露', point: '1', level: 3, type: 'life'}
]

const activeSprints = [
  {title: '#健身运动 | 针对个人体型和身体素质进行合理的筛选健身运动、指导视频以及设计一套基础健身计划方案', point: '3', level: 3, type: 'life'},
  {title: '#日常学习 | 写作 | 一篇爬虫文章刊登到github博客中', point: '3', level: 3, type: 'life'},
  {title: '#农贸市场 | 针对农贸市场的蔬菜行情设计一个在线实时查询网站', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 设计家庭房屋设计图稿(autoCAD)', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 准备写实绘画的工具及其学习教程', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 根据国内外养殖业的行情设计一套在线查询网站', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 搜集各类有趣生物信息', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 初始一项兴趣项目 | 心理学、哲学', point: '3', level: 3, type: 'life'},
  {title: '#开源项目 | 任务管理器 | 删除文章模块，并修改为面板模块', point: '3', level: 3, type: 'life'},
  {title: '#开源项目 | 任务管理器 | 新增汇编模块，文章模块中收集导航栏移动到汇编模块', point: '3', level: 3, type: 'life'},
  {title: '#日常学习 | 选购100本学习书籍， 存入管理器项目中', point: '1', level: 3, type: 'life'}
]

export default function (keys, params) {
  // axios请求接口归档
  switch (keys) {
    case 'activeSprintList':
      return getactiveSprintList(params);
    case 'backlogSprintList':
      return getbacklogSprintList(params);
    case 'getMenu':
      return getMenu(params);
    default:
      return ''
  }

  function getMenu(params) {

  }

  function backlogSprintList(index) {
    return {
      link: `INHOPE-${Math.ceil(Math.random() * 8000) + 1000}`, // 链接
      level: Math.ceil(Math.random() * 6), // 紧急度
      type: Math.random() > 0.5 ? 'job' : 'life', // issus类型 生活、工作
      title: backlogSprints[index].title, // 标题
      desc: Mock.mock('@csentence(100, 200)'), // 描述
      remark: Mock.mock('@csentence(100, 200)'),
      createTime: Mock.mock('@datetime("yyyy年MM月dd日 HH:mm:ss")'),
      updateTime: Mock.mock('@datetime("yyyy年MM月dd日 HH:mm:ss")'),
      tag: modulesList[Math.floor(Math.random() * modulesList.length)], // 模块
      moduleState: modulesList[Math.floor(modulesList.length * Math.random())] // 模块
    }
  }
  function activeSprint(index) {
    return {
      name: Mock.mock('@cname'),
      level: Math.ceil(Math.random() * 5),
      link: `INHOPE-${Math.ceil(Math.random() * 9000)}`,
      type: Math.random() > 0.5 ? 'job' : 'life',
      title: Mock.mock('@csentence(15, 40)'),
      fixed: Math.random() > 0.5,
      desc: Mock.mock('@csentence(100, 200)'),
      remark: Mock.mock('@csentence(100, 200)'),
      createTime: Mock.mock('@datetime("yyyy年MM月dd日 HH:mm:ss")'),
      updateTime: Mock.mock('@datetime("yyyy年MM月dd日 HH:mm:ss")'),
      tag: modulesList[Math.floor(Math.random() * modulesList.length)], // 模块
      progressState: ['doing', 'not-start', 'finish'][Math.floor(Math.random() * 3)], // 执行状态
      moduleState: modulesList[Math.floor(modulesList.length * Math.random())] // 模块
    }
  }

  // 当前活跃sprint列表
  function getactiveSprintList(params) {
    let issueList = [];
    let i = 0;

    while (i < backlogSprints.length) {
      issueList.push(activeSprint(i))
      i++
    }

    return {
      status: 200,
      data: {
        id: Mock.mock('@guid'),
        title: Mock.mock('@cword(4, 9)'),
        createTime: Mock.mock('@date("yyyy/MM/dd")'),
        endTime: Mock.mock('@date("yyyy/MM/dd")'),
        status: 'active',
        issueList
      }
    }
  }
  // backlog中sprint列表
  function getbacklogSprintList(params) {
    let issueList = [];
    let i = 0;
    let total = backlogSprints.length;

    while (i < total) {
      issueList.push(backlogSprintList(i))
      i++
    }

    return {
      status: 200,
      data: {
        id: Mock.mock('@guid'),
        title: Mock.mock('@cword(4, 9)'),
        createTime: Mock.mock('@date("yyyy/MM/dd")'),
        endTime: Mock.mock('@date("yyyy/MM/dd")'),
        status: 'active',
        issueList
      }
    }
  }
}
