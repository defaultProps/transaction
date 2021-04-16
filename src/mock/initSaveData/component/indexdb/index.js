import localforage from 'localforage'
import { tags, progressStateList, sprints, links, issueTypeList } from './data.js'

export function initLocalForageStore() {
  const sprintStore = localforage.createInstance({
    name: 'todo',
    storeName: 'sprints'
  })

  const linkStore = localforage.createInstance({
    name: 'todo',
    storeName: 'links'
  })

  const moduleSprintStore = localforage.createInstance({
    name: 'todo',
    storeName: 'modules'
  })

  const progressStateStore = localforage.createInstance({
    name: 'todo',
    storeName: 'progressState'
  })

  const issueTypeStore = localforage.createInstance({
    name: 'todo',
    storeName: 'issue-type'
  })

  let backlogSprintPromise = []
  let activesprintPromise = []
  let moduleSprintPromise = []
  let issueTypePromise = []
  let progressStateListPromise = []
  let linksPromise = []

  // 填充扩展链接links数据
  linkStore.clear().then(function () {
    links.forEach(link => {
      linksPromise.push(linkStore.setItem(link.link, link))
    })
  })

  // 填充执行状态implete数据
  progressStateStore.clear().then(function () {
    progressStateList.forEach(progressState => {
      progressStateListPromise.push(progressStateStore.setItem(progressState.id, progressState))
    })
  })

  // 填充模块状态tag数据
  moduleSprintStore.clear().then(function () {
    tags.forEach(tag => {
      moduleSprintPromise.push(moduleSprintStore.setItem(tag.id, tag))
    })
  })

  // 填充issue-type数据
  issueTypeStore.clear().then(function () {
    issueTypeList.forEach(item => {
      issueTypePromise.push(issueTypeStore.setItem(item.value, item))
    })
  })

  sprintStore.clear().then(function () {
    sprints.forEach(sprint => {
      if (sprint.type === 'backlog') {
        backlogSprintPromise.push(sprintStore.setItem(sprint.id, sprint))
      }
      if (sprint.type === 'active') {
        activesprintPromise.push(sprintStore.setItem(sprint.id, sprint))
      }
    })
  })

  let promiseAll = [
    ...linksPromise,
    ...backlogSprintPromise,
    ...activesprintPromise,
    ...moduleSprintPromise,
    ...issueTypePromise,
    ...progressStateListPromise
  ]

  return Promise.all(promiseAll).then(() => {
    return {
      data: {
        success: true
      },
      status: 200
    }
  })
}
