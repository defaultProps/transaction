import Mock from 'mockjs-async'
import api from './api'

let protocol = document.location.protocol === 'https:' ? 'https://' : 'http://'

protocol += process.env.NODE_ENV === 'development' ? 'dev.uxo.com.cn/' : 'uxo.com.cn/'

export default {
  mockData() {
    Mock.mock(protocol + 'sprints/thridPartyLinks', 'post', req => api.sprints.thridPartyLinks(JSON.parse(req.body)))
    Mock.mock(protocol + 'dashboard/getdashboardList', 'post', req => api.dashboard.getdashboardList(JSON.parse(req.body)))
    Mock.mock(protocol + 'sprints/backlogSprintList', 'post', req => api.sprints.backlogSprintList(JSON.parse(req.body)))
    Mock.mock(protocol + 'sprints/activeSprintList', 'post', req => api.sprints.activeSprintList(JSON.parse(req.body)))
    Mock.mock(protocol + 'sprints/closeActiveSprintIssue', 'post', req => api.sprints.closeActiveSprintIssue(JSON.parse(req.body)))
    Mock.mock(protocol + 'sprints/getModuleList', 'post', req => api.sprints.getModuleList(JSON.parse(req.body)))
    Mock.mock(protocol + 'sprints/getProgressStateList', 'post', req => api.sprints.getProgressStateList(JSON.parse(req.body)))
    Mock.mock(protocol + 'sprints/updateSptintmoduleState', 'post', req => api.sprints.updateSptintmoduleState(JSON.parse(req.body)))
    Mock.mock(protocol + 'sprints/updateIssueSort', 'post', req => api.sprints.updateIssueSort(JSON.parse(req.body)))
    Mock.mock(protocol + 'sprints/updateIssueData', 'post', req => api.sprints.updateIssueData(JSON.parse(req.body)))
    Mock.mock(protocol + 'sprints/sprintIssueDetail', 'post', req => api.sprints.sprintIssueDetail(JSON.parse(req.body)))
    Mock.mock(protocol + 'sprints/thridPartyLinks', 'post', req => api.sprints.thridPartyLinks(JSON.parse(req.body)))
    Mock.mock(protocol + 'sprints/initLocalForageStore', 'post', req => api.sprints.initLocalForageStore(JSON.parse(req.body)))
  }
}
