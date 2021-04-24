import Axios from './http.js'

let protocol = document.location.protocol === 'https:' ? 'https://' : 'http://'

protocol += process.env.NODE_ENV === 'development' ? 'dev.uxo.com.cn/' : 'uxo.com.cn/'

// 仪表盘axios
export const dashboardAxios = {
  // 获取仪表盘列表信息
  getdashboardList: data => Axios({ method: 'post', url: protocol + 'dashboard/getdashboardList', data })
}

export const sprintAxios = {
  // 获取附加链接
  thridPartyLinks: data => Axios({ method: 'post', url: protocol + 'sprints/thridPartyLinks', data }),

  // 获取sprint详情
  sprintIssueDetail: data => Axios({ method: 'post', url: protocol + 'sprints/sprintIssueDetail', data }),

  // 获取缓存中sprint
  backlogSprintList: data => Axios({ method: 'post', url: protocol + 'sprints/backlogSprintList', data }),

  // 获取工作台列表
  activeSprintList: data => Axios({ method: 'post', url: protocol + 'sprints/activeSprintList', data }),

  // activeSprint执行状态设置为close
  closeActiveSprintIssue: data => Axios({ method: 'post', url: protocol + 'sprints/closeActiveSprintIssue', data }),

  // issue设置模块类型、执行状态（除了close）
  updateSptintmoduleState: data => Axios({ method: 'post', url: protocol + 'sprints/updateSptintmoduleState', data }),

  // 排序
  updateIssueSort: data => Axios({ method: 'post', url: protocol + 'sprints/updateIssueSort', data }),

  // 修改issue数据
  updateIssueData: data => Axios({ method: 'post', url: protocol + 'sprints/updateIssueData', data }),

  // 获取模块类型列表
  getModuleList: data => Axios({ method: 'post', url: protocol + 'sprints/getModuleList', data }),

  // 获取执行状态列表
  getProgressStateList: data => Axios({ method: 'post', url: protocol + 'sprints/getProgressStateList', data }),

  // 初始化项目数据
  initLocalForageStore: data => Axios({ method: 'post', url: protocol + 'sprints/initLocalForageStore', data })
}

export default {
  dashboardAxios,
  sprintAxios
}
