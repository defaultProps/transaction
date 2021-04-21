<template>
  <div class="todo-list-container">
    <v-sprint-header-box v-show="draggbleList.length && sprintType =='active'"
                         class="issue-header"
                         @sortable="sortable"></v-sprint-header-box>
    <v-draggable-box v-show="draggbleList.length"
                     v-model="draggbleList"
                     v-bind="dragOptions"
                     :group="groupName"
                     class="backlog-list"
                     tag="ul"
                     draggable=".drag-item"
                     ghost-class="ghost"
                     @start="startDraggable"
                     @end="endDraggable"
                     @add="addDraggable">
      <li v-for="issue of draggbleList"
          :key="issue.id"
          :data-key="issue.id"
          class="drag-item sprint-list"
          @contextmenu.prevent="handleContextmenuFn(issue, $event)"
          @click="handleDraggleList(issue)">
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
        <el-button v-if="issue.moduleState"
                   :class="[issue.moduleState.link, 'info-status']"
                   type="text"
                   size="medium">{{ issue.moduleState.name }}</el-button>
      </li>
    </v-draggable-box>
    <div v-if="draggbleList.length === 0"
         class="no-draggleList">
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
  inject: {
    modulesList: {
      type: Array,
      default: () => ([])
    }
  },
  computed: mapState({
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
    // dropObj: {
    //   handler(v) {
    //     if (v && this.oldIndex >= 0) {
    //       this.handleUpdateSprintModuleState(v)
    //     }
    //   },
    //   immediate: true
    // }
  },
  filters: {
    filterprogressState(v) {
      return new Map([['doing', '处理中'], ['not-start', '未开始'], ['finish', '已完成']]).get(v)
    }
  },
  methods: {
    initDragListData() {
      this.contextMenuTargets = []
      this.draggbleList = JSON.parse(JSON.stringify(this.issueList))
    },
    // action & 拖动到右侧
    handleUpdateSprintModuleState(dropObj) {
      // 判断是否是执行状态
      let moduleState = this.draggbleList[this.oldIndex].moduleState

      if (dropObj.type === 'progressState') {
        if (this.groupName === 'activeSprint') {
          if (dropObj.link === 'close') {
            if (moduleState.link === 'finish') {
              this.closeActiveSprintIssue(this.draggbleList[this.oldIndex].id)
            } else {
              this.$notify.info({
                title: '提示',
                showClose: false,
                message: '未完成的Issue不能拖动到关闭'
              })
            }
          } else {
            this.updateSptintmoduleState({
              type: dropObj.type,
              link: dropObj.id,
              name: dropObj.name,
              issueLink: this.draggbleList[this.oldIndex].id
            }, 'progressState', dropObj.link)
          }
        } else if (this.$store.state.story.sprintType === 'backlog') {
          this.$notify.warning({
            title: '提示',
            message: 'Backlog中Issue不能设置执行状态',
            size: 'mini',
            showClose: false
          })
          return false
        }
      } else if (dropObj.type === 'module') {
        this.updateSptintmoduleState({
          type: dropObj.type,
          link: dropObj.id,
          name: dropObj.name,
          issueLink: this.draggbleList[this.oldIndex].id
        }, 'module')
      }
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
    // 关闭
    closeActiveSprintIssue(link) {
      let that = this
      sprintAxios.closeActiveSprintIssue({ link }).then(data => {
        if (data.hasCloseActiveSprintIssue) {
          let index = that.draggbleList.findIndex(v => v.id === link)

          that.draggbleList.splice(index, 1)
          that.$notify.success({
            title: '提示',
            message: '已存入<a href="/closeStoryIssue">仓库</a>',
            dangerouslyUseHTMLString: true,
            showClose: false
          })
        }
      })
    },
    // 右键绑定回调
    handleContextmenuFn(selectIssue, event) {
      this.$store.dispatch('sprint/selectActiveIssue', selectIssue)

      let contextmenuItem = []

      if (selectIssue.type === 'active') {
        contextmenuItem = [
          {
            label: "编辑",
            icon: "el-icon-edit",
            disabled: false
          },
          {
            label: "执行状态",
            disabled: false,
            children: this.progressStateList.map(item => ({ label: item.name, value: item.link, onClick: () => this.handleClickimplement(item) }))
          },
          {
            label: "模型状态",
            disabled: false,
            customClass: 'contextmenu-subMenu',
            children: this.moduleList.map(item => ({ label: item.name, value: item.link, onClick: () => this.handleClickimplement(item) }))
          }
        ]
      } else {
        contextmenuItem = [
          {
            label: "编辑",
            icon: "el-icon-edit",
            disabled: false
          },
          {
            label: "拖动到执行列表",
            icon: "el-icon-finished",
            disabled: false
          },
          {
            label: "执行状态",
            disabled: false,
            children: this.progressStateList.map(item => ({ label: item.name, value: item.link, onClick: () => this.handleClickimplement(item) }))
          },
          {
            label: "模型状态",
            disabled: false,
            customClass: 'contextmenu-subMenu',
            children: this.moduleList.map(item => ({ label: item.name, value: item.link, onClick: () => this.handleClickimplement(item) }))
          }
        ]
      }

      this.$contextmenu({
        customClass: 'contextmenu-issue-box',
        items: contextmenuItem,
        event,
        zIndex: 100,
        minWidth: 120
      })

      return false
    },
    handleClickimplement(obj) {
      this.draggbleList.forEach((item, index) => {
        if (item.id === this.selectKey) {
          this.oldIndex = index
          this.$store.dispatch('sprint/selectActiveIssue', item)
          this.handleUpdateSprintModuleState(obj)
        }
      })
    },
    sortable(type = 'executiveMode') {
      if (type === 'executiveMode') {
        this.draggbleList.sort((pre, next) => {
          let preIndex = ['not-start', 'doing', 'finish'].indexOf(pre.moduleState.link)
          let nextIndex = ['not-start', 'doing', 'finish'].indexOf(next.moduleState.link)

          return preIndex - nextIndex
        })
      }
    },
    handleDraggleList(item) {
      this.$store.dispatch('sprint/selectActiveIssue', item)
    },
    startDraggable(evt) {
      this.oldIndex = evt.oldIndex
      this.$store.commit('sprintType', this.sprintType)
    },
    endDraggable(v) {
      this.$emit('endDraggable', v)
    },
    addDraggable(v) {

    },
    stylelevelClass(v) {
      let result

      this.levelList.forEach(item => {
        item.options.forEach(p => {
          if (p.label === v) {
            result = p.icon
          }
        })
      })
      return `${result} iconfont`
    },
    filterTypeIcon(v = 'work') {
      let p = this.issusTypeArr.find(p => p.value === v)

      return p ? p.icon : 'icon-shujuzhongjian'
    },
    filterTypeColor(v) {
      let p = this.issusTypeArr.find(p => p.value === v)

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
    background-color: #ebeef5;
  }
  .no-draggleList {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 100px;
    .no-info {
      height: 100%;
      line-height: 100px;
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
      background: #deebff;
    }
    &.light {
      background: #deebff;
    }
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      text-indent: -9999em;
      background-color: #205081;
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
      font-size: 12px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 4px;
    }
    .info-status {
      padding: 3px 5px;
      color: #ffffff;
      font-size: 12px;
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
