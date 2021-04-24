import Mock from 'mockjs-async'
import localforage from 'localforage';
import { initLocalForageStore } from './indexdb/index'

// 设置响应时间， 与实操更加接近
Mock.setup({
  timeout: '300-1500'
})

const sprints = localforage.createInstance({
  name: 'todo',
  storeName: 'sprints'
})

const moduleSprintStore = localforage.createInstance({
  name: 'todo',
  storeName: 'modules'
})

const linkStore = localforage.createInstance({
  name: 'todo',
  storeName: 'links'
})

// const issueTypeStore = localforage.createInstance({
//   name: 'todo',
//   storeName: 'issue-type'
// })

const progressStateStore = localforage.createInstance({
  name: 'todo',
  storeName: 'progressState'
})

const mapAxiosFieldToFunc = new Map([
  ['activeSprintList', getactiveSprintList],
  ['sprintIssueDetail', getsprintIssueDetail],
  ['thridPartyLinks', getthridPartyLinks],
  ['backlogSprintList', getbacklogSprintList],
  ['closeActiveSprintIssue', closeActiveSprintIssue],
  ['updateSptintmoduleState', updateSptintmoduleState],
  ['getModuleList', getModuleList],
  ['getProgressStateList', getProgressStateList],
  ['initLocalForageStore', initLocalForageStore],
  ['getdashboardList', getdashboardList]
])

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
  if (params.type === "module") {
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
  } else if (params.type === "progressState") {
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

function closeActiveSprintIssue(params) {
  return new Promise(async resolve => {
    await sprints.getItem(params.link).then(async issue => {
      let item = issue.find(v => !!v);

      if (item) {
        item.moduleState = { link: 'close', name: '关闭' }
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

function getthridPartyLinks() {
  return new Promise(async resolve => {
    let links = [];
    let keys = [];

    await linkStore.keys().then(key => {
      keys = key;
    })

    for (let i = 0; i < keys.length; i++) {
      await linkStore.getItem(keys[i]).then(value => {
        links.push(value)
      })
    }

    resolve({
      status: 200,
      data: {
        links
      }
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

export default function (keys, params) {
  return mapAxiosFieldToFunc.get(keys)(params)
}
