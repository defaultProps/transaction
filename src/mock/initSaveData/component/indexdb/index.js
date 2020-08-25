import localforage from 'localforage'
import { tags, progressStateList, sprints, links } from './data'

export function localforageStore() {
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

  let backlogSprintPromise = [];
  let activesprintPromise = [];
  let moduleSprintPromise = [];
  let progressStateListPromise = [];
  let linksPromise = [];

  // 填充扩展链接links数据
  linkStore.clear().then(function() {
    links.forEach(link => {
      linksPromise.push(linkStore.setItem(link.link, link))
    })
  })

  // 填充执行状态implete数据
  progressStateStore.clear().then(function() {
    progressStateList.forEach(progressState => {
      progressStateListPromise.push(progressStateStore.setItem(progressState.guid, progressState))
    })
  })
  // 填充模块状态tag数据
  moduleSprintStore.clear().then(function() {
    tags.forEach(tag => {
      moduleSprintPromise.push(moduleSprintStore.setItem(tag.guid, tag))
    })
  })
  sprintStore.clear().then(function() {
    sprints.forEach(sprint => {
      if (sprint.type === 'backlog') {
        backlogSprintPromise.push(sprintStore.setItem(sprint.guid, sprint))
      }
      if (sprint.type === 'active') {
        activesprintPromise.push(sprintStore.setItem(sprint.guid, sprint))
      }
    })
  })

  let promiseAll = [...linksPromise, ...backlogSprintPromise, ...activesprintPromise, ...moduleSprintPromise, ...progressStateListPromise];

  return Promise.all(promiseAll).then(() => {
    return {
      data: {
        success: true
      },
      status: 200
    }
  })
}
