import { sprintAxios } from '@/axios'

export default {
  namespaced: true,
  state: {
    activeIssue: null, // 当前选中的issue
    backlogSprint: [], // backlog数据列表
    activeSprintList: [], // 工作区数据列表
    visibleSideBarLeft: true, // 显示左侧列表
    visibleSidebarRightDetail: false, // 显示右侧issue详情

    draggableObj: null // 正在拖拽的issue
  },
  mutations: {
    BACKLOG_SPRINT_LIST: (state, val) => {
      state.backlogSprint = val
    },
    ACTIVE_SPRINT_LIST: (state, val) => {
      state.activeSprintList = val
    },
    SET_VISIBLESIDEBARLEFT: (state, val) => {
      state.visibleSideBarLeft = val
    },
    SET_VISIBLESIDEBARRIGHTDETAIL: (state, val) => {
      state.visibleSidebarRightDetail = val
    },
    SET_ACTICEISSUE: (state, val) => {
      state.activeIssue = val
    },
    hasDraggle: (state, data) => {
      state.hasDraggle = data
    },
    progressStateList: (state, data) => {
      state.progressStateList = data
    },
    moduleList: (state, data) => {
      state.moduleList = data
    },
    DRAGGABLEOBJ: (state, val) => {
      state.draggableObj = val
    }
  },
  actions: {
    // 获取所有sprintList
    getAllSprintList({ commit }) {
      sprintAxios.backlogSprintList({ type: 'backlog' }).then(obj => {
        obj.issueList.sort((prev, next) => prev.position - next.position)
        commit('BACKLOG_SPRINT_LIST', obj.issueList)
      })
      sprintAxios.activeSprintList({ type: 'sprint' }).then(obj => {
        obj.issueList.sort((prev, next) => prev.position - next.position)
        commit('ACTIVE_SPRINT_LIST', obj.issueList)
      })
    },
    // 更新本地issue数据，减少一次请求列表
    updateIssueLocal({ commit, state }, issue) {
      let targetSprintList = issue.type === 'active' ? state.activeSprintList : state.backlogSprint
      let newSprintList = targetSprintList.map(item => item.id === issue.id ? issue : item)

      commit(
        issue.type === 'active' ? 'ACTIVE_SPRINT_LIST' : 'BACKLOG_SPRINT_LIST',
        newSprintList
      )
    },
    removeIssueItem({ commit, state }, issue) {
      let targetSprintList = JSON.parse(JSON.stringify(issue.type === 'active' ? state.activeSprintList : state.backlogSprint))
      let index = targetSprintList.findIndex(item => item.id === issue.id)

      if (index >= 0) {
        targetSprintList.splice(index, 1)

        commit(
          issue.type === 'active' ? 'ACTIVE_SPRINT_LIST' : 'BACKLOG_SPRINT_LIST',
          targetSprintList
        )
      }
    },
    // 更新编辑后的issue数据
    updateIssueData({ commit, state }, obj) {
      let issueList = obj.type === 'active' ? state.activeSprintList : state.backlogSprint
      commit(
        obj.type === 'active' ? 'ACTIVE_SPRINT_LIST' : 'BACKLOG_SPRINT_LIST',
        issueList.map(item => item.id === obj.id ? obj : item)
      )
      commit('SET_ACTICEISSUE', obj)
    },
    selectActiveIssue({ commit }, obj) {
      let allDraggableList = document.querySelectorAll(`.drag-item[data-key]`) || []

      allDraggableList.forEach(el => {
        el.classList.remove('light')
      })

      if (obj) {
        let dom = document.querySelector(`.drag-item[data-key="${obj.id}"]`)

        if (dom) {
          dom.classList.add('light')
        }
      }

      commit('SET_ACTICEISSUE', obj)
      commit('SET_VISIBLESIDEBARRIGHTDETAIL', !!obj)
    }
  }
}
