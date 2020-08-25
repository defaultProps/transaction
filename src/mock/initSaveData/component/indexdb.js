import Mock from 'mockjs-async'
import localforage from 'localforage';
import { localforageStore } from './indexdb/index'
import { headerNav } from './indexdb/data'

// 设置响应时间， 与实操更加接近
Mock.setup({
  timeout: '100-500'
})

const sprints = localforage.createInstance({
  name: 'todo',
  storeName: 'sprints'
})

const moduleSprintStore = localforage.createInstance({
  name: 'todo',
  storeName: 'modules'
})

const progressStateStore = localforage.createInstance({
  name: 'todo',
  storeName: 'progressState'
})

export default function (keys, params) {
  // axios请求接口归档
  switch (keys) {
    case 'activeSprintList':
      return getactiveSprintList(params);
    case 'sprintIssueDetail':
      return getsprintIssueDetail(params);
    case 'backlogSprintList':
      return getbacklogSprintList(params);
    case 'getheaderMenu':
      return getheaderMenu(params);
    case 'closeActiveSprintIssue':
      return closeActiveSprintIssue(params);
    case 'updateSptintmoduleState':
      return updateSptintmoduleState(params);
    case 'getModuleList':
      return getModuleList(params);
      case 'getProgressStateList':
        return getProgressStateList(params);
    case 'storeSprint':
      return localforageStore(params);
      case 'getdashboardList':
        return getdashboardList(params);
    default:
      return ''
  }

  function getdashboardList(params) {
    return {
      data: [],
      status: 200
    }
  }

  function getProgressStateList() {
    return new Promise(async resolve => {
      let keys = [];
      let progressStateList = [];

      await progressStateStore.keys().then(key => {
        keys = key;
      })

      for (let i = 0; i < keys.length; i++) {
        await progressStateStore.getItem(keys[i]).then(value => {
          progressStateList.push(value)
        })
      }

      resolve({
        status: 200,
        data: {
          progressStateList
        }
      })
    })
  }

  function getModuleList() {
    return new Promise(async resolve => {
      let keys = [];
      let moduleList = [];

      await moduleSprintStore.keys().then(key => {
        keys = key;
      })

      for (let i = 0; i < keys.length; i++) {
        await moduleSprintStore.getItem(keys[i]).then(value => {
          moduleList.push(value)
        })
      }

      resolve({
        status: 200,
        data: {
          moduleList
        }
      })
    })
  }

  function updateSptintmoduleState(params) {
    if (params.type == "module") {
      return new Promise(async resolve => {
        await moduleSprintStore.getItem(params.link).then(async modulelist => {
          if (modulelist) {
            await sprints.getItem(params.issueLink).then(async issue => {
              let item = issue.find(v => !!v);

              if (item) {
                item.tag = modulelist;
                await sprints.setItem(params.issueLink, item);
              }
            })
            resolve({
              status: 200,
              data: {
                hasUpdateSptintmoduleState: 'success'
              }
            })
          }
        })
      })
    } else if (params.type == "progressState") {
      return new Promise(async resolve => {
        await progressStateStore.getItem(params.link).then(async list => {
          if (list) {
            await sprints.getItem(params.issueLink).then(async issue => {
              let item = issue.find(v => !!v);

              if (item) {
                item.moduleState = list;
                await sprints.setItem(params.issueLink, item);
              }
            })
            resolve({
              status: 200,
              data: {
                hasUpdateSptintmoduleState: 'success'
              }
            })
          }
        })
      })
    }
  }

  function getheaderMenu(params) {
    return {
      status: 200,
      data: headerNav.slice(0, 2)
    }
  }

  function closeActiveSprintIssue(params) {
    return new Promise(async resolve => {
      await sprints.getItem(params.link).then(async issue => {
        let item = issue.find(v => !!v);

        if (item) {
          item.moduleState = {link: 'close', name: '关闭'}
          await sprints.setItem(params.link, item);
        }
        resolve({
          status: 200,
          data: {
            hasCloseActiveSprintIssue: 'success'
          }
        })
      })
    })
  }

  function getsprintIssueDetail(params) {
    return new Promise(async resolve => {
      await sprints.getItem(params.link).then(v => {
        resolve({
          status: 200,
          data: {
            issueDetail: v
          }
        })
      })
    })
  }

  // 当前活跃sprint列表
  function getactiveSprintList(params) {
    return new Promise(async resolve => {
      let issueList = [];
      let keys = [];

      await sprints.keys().then(key => {
        keys = key;
      })

      for (let i = 0; i < keys.length; i++) {
        await sprints.getItem(keys[i]).then(value => {
          if (value.type === 'active' && value.moduleState && value.moduleState.link !== 'close') {
            issueList.push(value)
          }
        })
      }

      resolve({
        status: 200,
        data: {
          id: Mock.mock('@guid'),
          title: Mock.mock('@cword(4, 9)'),
          createTime: Mock.mock('@date("yyyy/MM/dd")'),
          endTime: Mock.mock('@date("yyyy/MM/dd")'),
          issueList
        }
      })
    })
  }

  function getbacklogSprintList(params) {
    return new Promise(async resolve => {
      let issueList = [];
      let keys = [];

      await sprints.keys().then(key => {
        keys = key;
      })
      for (let i = 0; i < keys.length; i++) {
        await sprints.getItem(keys[i]).then(value => {
          if (value.type === 'backlog') {
            issueList.push(value)
          }
        })
      }

      resolve({
        status: 200,
        data: {
          issueList
        }
      })
    })
  }
}
