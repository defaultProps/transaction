<template>
  <div class="todo-list-container">
    <v-sprint-header-box v-show="draggbleList.length && sprintType =='active'"
                         class="issue-header"
                         @sortable="sortableCallback"></v-sprint-header-box>
    <v-draggable-box v-model="draggbleList"
                     v-bind="dragOptions"
                     :group="groupName"
                     class="backlog-list"
                     tag="ul"
                     draggable=".drag-item"
                     ghost-class="ghost"
                     @change="changeDraggableItem"
                     @start="startDraggable"
                     @add="addDraggable">
      <li v-for="issue of draggbleList"
          :key="issue.id"
          :data-key="issue.id"
          class="drag-item sprint-list"
          @contextmenu.prevent="handleContextmenuFn(issue, $event)"
          @click="handleClickIssue(issue)">
        <span :class="[issue.issueType, 'type']">
          <i :class="[filterTypeIcon(issue.issueType), 'iconfont']"
             :style="{color: filterTypeColor(issue.issueType)}"></i>
        </span>
        <span class="level">
          <i :class="stylelevelClass(issue.urgencyLevel)"></i>
        </span>
        <span :title="issue.title"
              class="title">
          {{ issue.title }}
        </span>
        <el-button v-if="issue.tag"
                   type="text"
                   size="medium"
                   class="modules-type">
          {{ issue.tag.name }}
        </el-button>
        <el-button v-if="issue.type ==='active'"
                   :class="[issue.moduleState.link, 'info-status']"
                   type="text"
                   size="medium">{{ issue.moduleState.name }}</el-button>
      </li>
    </v-draggable-box>
    <div v-if="draggbleList.length === 0"
         class="no-draggleList">
      <img src="@/assets/noInfo.png"
           alt="暂无数据"
           class="noinfo">
      <div class="no-info">暂无事务</div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { issusTypeArr, levelList } from './storyConstant'
import sprintHeaderBox from './sprintHeaderBox.vue'
import { mapState } from 'vuex'
import { sprintAxios } from '@/axios'

export default {
  components: {
    'v-draggable-box': draggable,
    'v-sprint-header-box': sprintHeaderBox
  },
  data() {
    return {
      levelList,
      issusTypeArr,
      draggbleList: [],
      selectKey: "",
      oldIndex: -1
    }
  },
  props: {
    issueList: {
      type: Array,
      default: function () { return [] }
    },
    activeSprintListLoading: [Boolean],
    sprintType: [String],
    dropObj: {
      type: Object,
      default: null
    },
    loading: [Boolean],
    groupName: [String, Object]
  },
  computed: mapState({
    draggableObj: state => state.story.draggableObj,
    moduleList: state => state.story.moduleList,
    progressStateList: state => state.story.progressStateList,
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    }
  }),
  watch: {
    issueList: "initDragListData"
  },
  inject: ['handleClickimplement'],
  methods: {
    // 排序改变
    changeDraggableItem(obj) {
      if (obj.moved) {
        if (this.sprintType === 'active' || this.sprintType === 'backlog') {
          // 确保与add-draggable冲突
          const { oldIndex, newIndex } = obj.moved

          let params = [
            {
              id: this.draggbleList[newIndex].id,
              title: this.draggbleList[newIndex].title,
              position: newIndex
            },
            {
              id: this.draggbleList[oldIndex].id,
              title: this.draggbleList[newIndex].title,
              position: oldIndex
            }
          ]

          sprintAxios.updateIssueSort(params).catch(err => {
            this.$store.commit('metaView/PUSH_AXIOS_ERRORLIST', err)
          })
        }
      }
    },
    initDragListData() {
      this.contextMenuTargets = []
      this.draggbleList = JSON.parse(JSON.stringify(this.issueList))
    },
    // 设置执行状态和模块类型
    updateSptintmoduleState(params, type, value) {
      sprintAxios.updateSptintmoduleState(params).then(data => {
        if (data.hasUpdateSptintmoduleState) {
          let item = this.draggbleList.find(v => v.id === params.issueLink)

          if (item) {
            if (type === 'progressState') {
              this.$set(item, 'moduleState', { link: value, name: params.name, id: params.link })
            }
            if (type === 'module') {
              this.$set(item, 'tag', { name: params.name, id: params.link })
            }
          }
        }
      })
    },
    // 右键绑定回调
    handleContextmenuFn(selectIssue, event) {
      this.$store.dispatch('sprint/selectActiveIssue', selectIssue)

      let editContextMenuItem = {
        label: "编辑",
        icon: "el-icon-edit",
        disabled: false
      }

      let executionStatusContextItem = {
        label: "执行状态",
        icon: "el-icon-edit",
        children: this.progressStateList.map(item => ({
          label: item.name,
          value: item.link,
          onClick: () => this.handleClickimplement(item, selectIssue)
        }))
      }

      let moduleStatusContextMenuItem = {
        label: "模型状态",
        icon: "el-icon-edit",
        children: this.moduleList.map(item => ({
          label: item.name,
          value: item.link,
          onClick: () => this.handleClickimplement(item, selectIssue)
        }))
      }

      let moveExecutionStatusContextItem = {
        label: "拖动到执行列表",
        icon: "el-icon-finished",
        onClick: () => this.moveExecutionList(selectIssue)
      }

      let deleteIssueContextItem = {
        label: "移除",
        icon: "el-icon-delete",
        onClick: () => this.removeIssueContextMenuItem(selectIssue)
      }

      let contextmenuItem = []

      if (selectIssue.type === 'active') {
        contextmenuItem = [editContextMenuItem, executionStatusContextItem, moduleStatusContextMenuItem, deleteIssueContextItem]
      } else {
        contextmenuItem = [editContextMenuItem, moduleStatusContextMenuItem, moveExecutionStatusContextItem, deleteIssueContextItem]
      }

      this.$contextmenu({
        items: contextmenuItem,
        zIndex: 100,
        event
      })

      return false
    },
    // 移除issue
    removeIssueContextMenuItem(issue) {
      sprintAxios.removeIssue(issue.id).then(hasSuccess => {
        if (hasSuccess) {
          this.$store.dispatch('sprint/removeIssueItem', issue)
        }
      }).catch(err => {
        this.$store.commit('metaView/PUSH_AXIOS_ERRORLIST', err)
      })
    },
    // 拖动到执行列表
    moveExecutionList(issue) { },
    sortableCallback(type) {
      if (type === 'executiveMode') {
        this.draggbleList.sort((pre, next) => {
          let preIndex = ['not-start', 'doing', 'finish'].indexOf(pre.moduleState.link)
          let nextIndex = ['not-start', 'doing', 'finish'].indexOf(next.moduleState.link)

          return preIndex - nextIndex
        })
      }
    },
    handleClickIssue(item) {
      this.$store.dispatch('sprint/selectActiveIssue', item)
    },
    startDraggable(event) {
      this.$store.commit('sprint/DRAGGABLEOBJ', this.draggbleList[event.oldIndex])
    },
    addDraggable(event) {
      let addIssueObj = this.draggbleList[event.newIndex]
      let params = Object.assign(addIssueObj, { type: addIssueObj.type === 'backlog' ? 'active' : 'backlog', moduleState: this.progressStateList[0] })

      sprintAxios.updateIssueData(params).then(hasAddIssue => {
        if (hasAddIssue) {
          this.$store.dispatch('sprint/getAllSprintList')
        }
      }).catch(err => {
        this.$store.commit('metaView/PUSH_AXIOS_ERRORLIST', err)
      })
    },
    stylelevelClass(urgencyLevelStr) {
      let result

      this.levelList.forEach(item => {
        item.options.forEach(p => {
          if (+p.label === +urgencyLevelStr) {
            result = p.icon
          }
        })
      })
      return `${result} iconfont`
    },
    filterTypeIcon(issueTypeStr = 'work') {
      let p = this.issusTypeArr.find(p => p.value === issueTypeStr)

      return p ? p.icon : 'icon-shujuzhongjian'
    },
    filterTypeColor(issueTypeStr) {
      let p = this.issusTypeArr.find(p => p.value === issueTypeStr)

      return p ? p.color : 'rgb(0, 101, 255)'
    }
  }
}
</script>
<style lang="scss" scoped>
.todo-list-container {
  position: relative;
  box-sizing: border-box;
  height: calc(100% - 40px);
  min-height: 100px;
  padding: 10px 10px;
  background: #f4f5f7;
  border-radius: 4px;
  .issue-header {
    height: 30px;
    background-color: #f5f7fa;
  }
  .no-draggleList {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    img {
      width: 60px;
    }
    .no-info {
      color: #999;
      font-size: 12px;
      text-align: center;
      user-select: none;
    }
  }
  .backlog-list {
    min-height: 100px;
  }
  .ghost {
    visibility: hidden;
  }
  .drag-item {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 32px;
    margin: 1px 0;
    padding: 0 6px 0 4px;
    overflow: hidden;
    font-size: 14px;
    line-height: 32px;
    white-space: nowrap;
    text-indent: 5px;
    background: #fff;
    border-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    box-shadow: 0 0 1px 0 rgba(9, 30, 66, 0.31),
      0 2px 4px -1px rgba(9, 30, 66, 0.25);
    cursor: move;
    user-select: none;
    &.sortable-chosen {
      color: #409eff;
      &:hover {
        color: #409eff;
      }
    }
    &:hover {
      background: #e4e7ed;
    }
    &.light {
      background: #e4e7ed;
    }
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      text-indent: -9999em;
      background-color: #0006;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      content: "";
    }
    .title {
      flex: 1;
      overflow: hidden;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-overflow: ellipsis;
    }
    .modules-type {
      padding: 3px 5px;
      color: #fff;
      font-size: 13px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 4px;
    }
    .info-status {
      padding: 3px 5px;
      color: #ffffff;
      font-size: 13px;
      border-radius: 4px;
      &.not-start {
        background-color: #00875a;
      }
      &.doing {
        background-color: #ffab00;
      }
      &.finish {
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
    .type {
      display: inline-block;
      color: #0065ff;
      &.bug {
        color: #d81e06;
      }
    }
    .level {
      color: #e6a23c;
      font-size: 14px;
      .icon-1_square {
        color: #67c23a;
      }
      .icon-2_square {
        color: #67c23a;
      }
      .icon-3_square {
        color: #e6a23c;
      }
      .icon-4_square {
        color: #e6a23c;
      }
      .icon-5_square {
        color: #f56c6c;
      }
      .icon-6_square {
        color: #f56c6c;
      }
    }
  }
}
// context
.vue-contextmenuName-draggle {
  width: 240px;
  font-size: 14px;
  .context-menu-list {
    height: 32px;
    margin: 0;
    line-height: 32px;
    &:hover {
      background: #f4f5f7;
    }
    div {
      height: 32px;
      line-height: 32px;
      &:hover {
        background: #f4f5f7;
      }
      .btn-wrapper-simple {
        line-height: 32px;
        .nav-name-right {
          height: 32px;
          margin-left: 0;
          line-height: 32px;
        }
      }
    }
  }
}
</style>
