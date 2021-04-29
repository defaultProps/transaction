import Mock from 'mockjs-async'
import localforage from 'localforage';
import { initLocalForageStore } from './indexdb/index'

// 设置响应时间， 与实操更加接近
// Mock.setup({
//   timeout: '10-20'
// })

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

const progressStateStore = localforage.createInstance({
  name: 'todo',
  storeName: 'progressState'
})

const issueTypeStore = localforage.createInstance({
  name: 'todo',
  storeName: 'issue-type'
})

const mapAxiosFieldToFunc = new Map([
  ['activeSprintList', getactiveSprintList],
  ['sprintIssueDetail', getsprintIssueDetail],
  ['thridPartyLinks', getthridPartyLinks],
  ['backlogSprintList', getbacklogSprintList],
  ['updateSptintmoduleState', updateSptintmoduleState],
  ['updateIssueSort', updateIssueSort],
  ['updateIssueData', updateIssueData],
  ['removeIssue', removeIssue],
  ['getModuleList', getModuleList],
  ['getProgressStateList', getProgressStateList],
  ['initLocalForageStore', initLocalForageStore],
  ['getdashboardList', getdashboardList],
  ['getIssueTypeList', getIssueTypeList]
])

function getIssueTypeList() {
  return new Promise(async resolve => {
    let result = []
    let keys = []

    await issueTypeStore.keys().then(async keyList => {
      keys = keyList
    })

    for (let i = 0; i < keys.length; i++) {
      await issueTypeStore.getItem(keys[i]).then(obj => {
        result.push(obj)
      })
    }

    resolve({
      status: 200,
      data: result
    })
  })
}
function removeIssue(issueId) {
  return new Promise(async resolve => {
    await sprints.getItem(issueId).then(async issue => {
      if (issue) {
        await sprints.setItem(issueId, Object.assign({}, issue, { isDelete: true }))

        resolve({
          status: 200,
          data: true
        })
      }
    })
  })
}

function updateIssueSort(issueList) {
  let promise = issue => new Promise(async resolve => {
    await sprints.getItem(issue.id).then(async item => {
      if (item) {
        await sprints.setItem(issue.id, Object.assign({}, item, { position: issue.position }))
        resolve()
      }
    })
  })

  return Promise.all(issueList.map(item => promise(item))).then(() => {
    return {
      data: {
        success: true
      },
      status: 200
    }
  })
}

function updateIssueData(updatedIssue) {
  return new Promise(async resolve => {
    await sprints.getItem(updatedIssue.id).then(async issue => {
      if (issue) {
        await sprints.setItem(updatedIssue.id, updatedIssue)

        resolve({
          status: 200,
          data: true
        })
      }
    })
  })
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
      await sprints.getItem(keys[i]).then(issue => {
        if (issue.type === 'active' && issue.moduleState.link !== 'close' && !issue.isDelete) {
          issueList.push(issue)
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
      await sprints.getItem(keys[i]).then(issue => {
        if (issue.type === 'backlog' && issue.moduleState.link !== 'close' && !issue.isDelete) {
          issueList.push(issue)
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
