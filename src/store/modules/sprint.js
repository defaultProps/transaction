export default {
  namespaced: true,
  state: {
    activeIssue: null, // 当前选中的issue
    backlogSprint: [], // backlog数据列表
    activeSprintList: [], // 工作区数据列表
    visibleSideBarLeft: true, // 显示左侧列表
    visibleSidebarRightDetail: false // 显示右侧issue详情
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
    sprintType: (state, data) => {
      state.sprintType = data
    },
    progressStateList: (state, data) => {
      state.progressStateList = data
    },
    moduleList: (state, data) => {
      state.moduleList = data
    }
  },
  actions: {
    selectActiveIssue ({ commit }, obj) {
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
