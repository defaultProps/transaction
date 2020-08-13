import Mock from 'mockjs-async'
import localforage from 'localforage';
import { localforageStore, HEADER_NAV } from './indexdb/index'

// 设置响应时间， 与实操更加接近
Mock.setup({
  timeout: '100-500'
})

const backlogSprintStore = localforage.createInstance({
  name: 'todo',
  storeName: 'backlogSprint'
})

const activeSprintStore = localforage.createInstance({
  name: 'todo',
  storeName: 'activeSprint'
})

const moduleSprintStore = localforage.createInstance({
  name: 'todo',
  storeName: 'moduleSprint'
})

const progressStateStore = localforage.createInstance({
  name: 'todo',
  storeName: 'progressStateSprint'
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
    case 'updateSprintIssueDetail':
      return updateSprintIssueDetail(params);
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
    default:
      return ''
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
            await Promise.all([backlogSprintStore.getItem(params.issueLink), activeSprintStore.getItem(params.issueLink)]).then(async issue => {
              let item = issue.find(v => !!v);
              let index = issue.findIndex(v => !!v);

              if (item) {
                item.tag = modulelist;
                if (index == 0) {
                  await backlogSprintStore.setItem(params.issueLink, item);
                } else {
                  await activeSprintStore.setItem(params.issueLink, item);
                }
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
            await Promise.all([backlogSprintStore.getItem(params.issueLink), activeSprintStore.getItem(params.issueLink)]).then(async issue => {
              let item = issue.find(v => !!v);
              let index = issue.findIndex(v => !!v);

              if (item) {
                item.moduleState = list;
                if (index == 0) {
                  await backlogSprintStore.setItem(params.issueLink, item);
                } else {
                  await activeSprintStore.setItem(params.issueLink, item);
                }
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
      data: HEADER_NAV.slice(0, 1)
    }
  }

  function closeActiveSprintIssue(params) {
    return new Promise(async resolve => {
      await Promise.all([activeSprintStore.getItem(params.link)]).then(async issueDetail => {
        let item = issueDetail.find(v => !!v);

        if (item) {
          item.moduleState = {link: 'close', name: '关闭'}
          await activeSprintStore.setItem(params.link, item);
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

  function updateSprintIssueDetail(params) {
    return new Promise(async resolve => {
      await Promise.all([backlogSprintStore.getItem(params.link), activeSprintStore.getItem(params.link)]).then(issueDetail => {
        let item = issueDetail.find(v => !!v);

        if (item) {
          if (params.type === 'module') {
            // item.tag.name = param.name;

          }
          if (params.type == '"progressState"') {
            // item.moduleState =
          }
        }
        resolve({
          status: 200,
          data: {
            issueDetail: issueDetail.find(v => !!v)
          }
        })
      })
    })
  }

  function getsprintIssueDetail(params) {
    return new Promise(async resolve => {
      await Promise.all([backlogSprintStore.getItem(params.link), activeSprintStore.getItem(params.link)]).then(issueDetail => {
        resolve({
          status: 200,
          data: {
            issueDetail: issueDetail.find(v => !!v)
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

      await activeSprintStore.keys().then(key => {
        keys = key;
      })
      for (let i = 0; i < keys.length; i++) {
        await activeSprintStore.getItem(keys[i]).then(value => {
          if (value.moduleState.link !== 'close') {
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

      await backlogSprintStore.keys().then(key => {
        keys = key;
      })
      for (let i = 0; i < keys.length; i++) {
        await backlogSprintStore.getItem(keys[i]).then(value => {
          issueList.push(value)
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
