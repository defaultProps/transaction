import Mock from "mockjs"
import { modulesList } from '@/view/story/component/storyConstant.js'

export default function (keys, params) {
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
      point: Math.random() > 0.5 ? Math.ceil(Math.random() * 10) : '', // 预估
      level: Math.ceil(Math.random() * 6), // 紧急度
      type: Math.random() > 0.5 ? 'job' : 'life', // issus类型 生活、工作
      title: Mock.mock('@csentence(20, 60)'), // 标题
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
      title: Mock.mock('@csentence(20, 60)'),
      fixed: Math.random() > 0.5,
      point: Math.ceil(Math.random() * 10),
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

    while (i < 10) {
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
    let total = 40;

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
