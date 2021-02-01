<template>
  <div id="draggable-list">
    <div class="sort-contain" v-show="draggbleList.length && sprintType =='active'">
      <uxo-sortSprint @sortable="sortable"></uxo-sortSprint>
    </div>
    <template v-show="draggbleList.length">
      <uxo-draggable v-model="draggbleList" class="backlog-list" tag="ul" draggable=".item" ghost-class="ghost" v-bind="dragOptions" :group="group" @start="startDraggable" @end="endDraggable" @add="addDraggable">
        <transition-group>
          <li v-for="(issue, i) of draggbleList" :key="issue.guid" :data-key="issue.guid" class="item sprint-list" @contextmenu.prevent="contextmenuFn" @click="handleDraggleList(issue, i)">
            <span class="type" :class="[issue.issueType]">
              <i class="iconfont" :class="filterTypeIcon(issue.issueType)" :style="{color: filterTypeColor(issue.issueType)}"></i>
            </span>
            <span class="level"><i class="iconfont" :class="stylelevelClass(issue.urgencyLevel)"></i></span>
            <span class="title" :title="issue.title">{{issue.title}}</span>
            <el-button type="text" size="medium" class="modules-type" v-if="issue.tag">{{issue.tag.name}}</el-button>
            <el-button type="text" size="medium" v-if="issue.moduleState" :class="[issue.moduleState.link, 'info-status']">{{issue.moduleState.name}}</el-button>
          </li>
        </transition-group>
      </uxo-draggable>
    </template>
    <div class="no-draggleList" v-if="draggbleList.length === 0">
      <div class="no-info">暂无事务</div>
    </div>
  </div>
</template>
<script>
import { issusTypeArr, levelArr } from './storyConstant';
import sortSprint from './sortSprint';
import { mapState } from 'vuex';

export default {
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
    group: [String, Object]
  },
  inject: {
    modulesList: {
      type: Array,
      default: () => ([])
    },
    highlightSelectedList: {
      type: Function,
      default: () => { }
    }
  },
  data () {
    return {
      visibleeditoSprintTitle: false,
      visibleContextMenu: false, // 右键点击框
      levelArr,
      issusTypeArr,
      draggbleList: [],
      selectKey: '',
      oldIndex: -1,
      contextMenuTargets: []
    }
  },
  computed: mapState({
    moduleList: state => state.story.moduleList,
    progressStateList: state => state.story.progressStateList,

    dragOptions () {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    }
  }),
  components: {
    'uxo-sortSprint': sortSprint
  },
  watch: {
    issueList: 'initData',
    dropObj: {
      handler (v) {
        if (v && this.oldIndex >= 0) {
          this.handleUpdateSprintModuleState(v);
        }
      },
      immediate: true
    }
  },
  filters: {
    filterprogressState (v) {
      return new Map([['doing', '处理中'], ['not-start', '未开始'], ['finish', '已完成']]).get(v)
    }
  },
  created () {
    this.initData(this.issueList)
  },
  methods: {
    // action & 拖动到右侧
    handleUpdateSprintModuleState (dropObj) {
      // 判断是否是执行状态
      let moduleState = this.draggbleList[this.oldIndex].moduleState
      if (dropObj.type === 'progressState') {
        if (this.group === 'activeSprint') {
          if (dropObj.link === 'close') {
            if (moduleState.link === 'finish') {
              this.closeActiveSprintIssue(this.draggbleList[this.oldIndex].guid)
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
              link: dropObj.guid,
              name: dropObj.name,
              issueLink: this.draggbleList[this.oldIndex].guid
            }, 'progressState', dropObj.link)
          }
        } else if (this.$store.state.story.sprintType === 'backlog') {
          this.$notify.warning({
            title: '提示',
            message: 'Backlog中Issue不能设置执行状态',
            size: 'mini',
            showClose: false
          })
          return false;
        }
      } else if (dropObj.type === 'module') {
        this.updateSptintmoduleState({
          type: dropObj.type,
          link: dropObj.guid,
          name: dropObj.name,
          issueLink: this.draggbleList[this.oldIndex].guid
        }, 'module')
      }
    },
    // 设置执行状态和模块类型
    updateSptintmoduleState (params, type, value) {
      this.$axios.sprints.updateSptintmoduleState(params).then(data => {
        if (data.hasUpdateSptintmoduleState) {
          let item = this.draggbleList.find(v => v.guid === params.issueLink)

          if (item) {
            if (type === 'progressState') {
              this.$set(item, 'moduleState', { link: value, name: params.name, guid: params.link })
            }
            if (type === 'module') {
              this.$set(item, 'tag', { name: params.name, guid: params.link })
            }
          }
        }
      })
    },
    // 关闭
    closeActiveSprintIssue (link) {
      let that = this;
      this.$axios.sprints.closeActiveSprintIssue({ link }).then(data => {
        if (data.hasCloseActiveSprintIssue) {
          let index = that.draggbleList.findIndex(v => v.guid === link);

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
    contextmenuFn (event) {
      event.path.forEach((dom, index) => {
        if (index < 4 && dom.classList.contains('sprint-list')) {
          this.selectKey = dom.getAttribute('data-key')
        }
      })

      let items = [
        {
          label: "编辑",
          icon: "el-icon-edit",
          disabled: false,
          onClick: () => this.editSprint()
        },
        {
          label: "拖动到执行列表",
          icon: "el-icon-finished",
          disabled: false,
          onClick: () => this.editSprint()
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

      if (this.sprintType === 'active') {
        items = items.filter((v, i) => i !== 1)
      }

      this.highlightSelectedList(this.selectKey)
      this.$contextmenu({
        customClass: 'contextmenuContainer',
        items,
        event,
        zIndex: 3,
        minWidth: 120
      })
    },
    editSprint () {
      this.visibleeditoSprintTitle = !this.visibleeditoSprintTitle
    },
    initData (issueList) {
      this.contextMenuTargets = []
      this.draggbleList = JSON.parse(JSON.stringify(issueList))
      this.draggbleList.forEach(p => {
        this.contextMenuTargets.push(document.querySelector([`.item[data-key='${p.guid}']`]))
      })
    },
    handleClickimplement (obj) {
      this.draggbleList.forEach((item, index) => {
        if (item.guid === this.selectKey) {
          this.oldIndex = index;
          this.$emit('handleDetail', item, false)
          this.handleUpdateSprintModuleState(obj)
        }
      })
    },
    sortable (type = 'executiveMode') {
      if (type == 'executiveMode') {
        this.draggbleList.sort((pre, next) => {
          let preIndex = ['not-start', 'doing', 'finish'].indexOf(pre.moduleState.link)
          let nextIndex = ['not-start', 'doing', 'finish'].indexOf(next.moduleState.link)

          return preIndex - nextIndex;
        })
      }
    },
    handleDraggleList (v, i) {
      this.$emit('handleDetail', v)
    },
    startDraggable (evt) {
      this.oldIndex = evt.oldIndex
      this.$store.commit('sprintType', this.sprintType)
    },
    endDraggable (v) {
      this.$emit('endDraggable', v);
    },
    addDraggable (v) {

    },
    stylelevelClass (v) {
      let result;

      this.levelArr.forEach(item => {
        item.options.forEach(p => {
          if (p.label == v) {
            result = p.icon;
          }
        })
      })
      return result;
    },
    filterTypeIcon (v = 'work') {
      let p = this.issusTypeArr.find(p => p.value === v);

      return p ? p.icon : 'icon-shujuzhongjian'
    },
    filterTypeColor (v) {
      let p = this.issusTypeArr.find(p => p.value === v)

      return p ? p.color : 'rgb(0, 101, 255)'
    }
  }
}
</script>
<style lang="scss">
#draggable-list {
  height: calc(100% - 40px);
  min-height: 100px;
  box-sizing: border-box;
  background: #f4f5f7;
  padding: 10px 10px;
  position: relative;
  border-radius: 4px;
  .sort-contain {
    height: 30px;
    background-color: #ebeef5;
  }
  .no-draggleList {
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .no-info {
      text-align: center;
      height: 100%;
      line-height: 100px;
      user-select: none;
    }
  }
  .backlog-list {
    min-height: 100px;
  }
  .ghost {
    visibility: hidden;
  }
  .item {
    background: #fff;
    overflow: hidden;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    margin: 6px 0;
    user-select: none;
    padding: 0 6px 0 4px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    text-indent: 5px;
    cursor: move;
    position: relative;
    box-shadow: 0 0 1px 0 rgba(9, 30, 66, 0.31),
      0 2px 4px -1px rgba(9, 30, 66, 0.25);
    border-left: 0;
    white-space: nowrap;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;

    &.sortable-chosen {
      color: #fff;
      &:hover {
        color: #fff;
        // background: #909399;
      }
    }
    &:hover {
      background: #deebff;
    }
    &.light {
      background: #deebff;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      height: 100%;
      position: absolute;
      text-indent: -9999em;
      top: 0;
      width: 3px;
      background-color: #205081;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 16px;
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .modules-type {
      border-radius: 4px;
      color: #fff;
      padding: 3px 5px;
      font-weight: 500;
      background: rgba(0, 0, 0, 0.4);
    }
    .info-status {
      border-radius: 4px;
      color: #ffffff;
      padding: 3px 5px;
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
      color: #0065ff;
      display: inline-block;
      &.bug {
        color: #d81e06;
      }
    }
    .level {
      color: #e6a23c;
      font-size: 16px;
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
  font-size: 16px;
  .context-menu-list {
    height: 32px;
    line-height: 32px;
    margin: 0;
    &:hover {
      background: #f4f5f7;
    }
    div {
      line-height: 32px;
      height: 32px;
      &:hover {
        background: #f4f5f7;
      }
      .btn-wrapper-simple {
        line-height: 32px;
        .nav-name-right {
          margin-left: 0;
          line-height: 32px;
          height: 32px;
        }
      }
    }
  }
}
</style>
