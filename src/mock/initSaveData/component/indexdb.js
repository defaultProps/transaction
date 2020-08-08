import { modulesList } from '@/view/story/component/storyConstant.js'
import Mock from "mockjs"

const SPRINTS = [
  {title: '#健身运动 | 针对个人体型和身体素质进行合理的筛选健身运动、指导视频以及设计一套基础健身计划方案', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 爬虫知乎文章中有趣故事、SCP官网等有趣网站数据', point: '3', level: 3, type: 'life'},
  {title: '#农贸市场 | 针对农贸市场的蔬菜行情设计一个在线实时查询网站', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 设计家庭房屋设计图稿(autoCAD)', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 准备写实绘画的工具及其学习教程', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 根据国内外养殖业的行情设计一套在线查询网站', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 搜集各类有趣生物信息', point: '3', level: 3, type: 'life'},
  {title: '#生活乐趣 | 初始一项心理学、哲学项目', point: '3', level: 3, type: 'life'},
  {title: '#开源项目 | 任务管理器 | 删除文章模块，并修改为面板模块', point: '3', level: 3, type: 'life'},
  {title: '#开源项目 | 任务管理器 | 新增汇编模块，文章模块中收集导航栏移动到汇编模块', point: '3', level: 3, type: 'life'},
  {title: '#日常学习 | 选购1000本学习书籍， 存入管理器项目中', point: '3', level: 3, type: 'life'}
]

export default function (keys, params) {
  // axios请求接口归档
  switch (keys) {
    case 'sprintList':
      return getactiveSprintList(params);
    case 'backlogList':
      return getBacklogSprint(params);
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
      title: SPRINTS[index].title, // 标题
      desc: Mock.mock('@csentence(100, 200)'), // 描述
      remark: Mock.mock('@csentence(100, 200)'),
      createTime: Mock.mock('@datetime("yyyy年MM月dd日 HH:mm:ss")'),
      updateTime: Mock.mock('@datetime("yyyy年MM月dd日 HH:mm:ss")'),
      tag: modulesList[Math.floor(Math.random() * modulesList.length)], // 模块
      moduleState: modulesList[Math.floor(modulesList.length * Math.random())] // 模块
    }
  }
  function sprintList(index) {
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

    while (i < SPRINTS.length) {
      issueList.push(sprintList(i))
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
  function getBacklogSprint(params) {
    let issueList = [];
    let i = 0;
    let total = SPRINTS.length;

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
