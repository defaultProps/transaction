import Mock from 'mockjs-async'
import localforage from 'localforage';
import { localforageStore, HEADER_NAV } from './indexdb/index'

const backlogSprintStore = localforage.createInstance({
  name: 'todo',
  storeName: 'backlogSprint'
})

const activeSprintStore = localforage.createInstance({
  name: 'todo',
  storeName: 'activeSprint'
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
    case 'storeSprint':
      return localforageStore(params);
    default:
      return ''
  }

  function getheaderMenu(params) {
    return {
      status: 200,
      data: HEADER_NAV.slice(0, 1)
    }
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
          issueList.push(value)
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
