<template>
  <div id="draggable-list">
    <div class="sort-contain" v-show="draggbleList.length && sprintType =='active'">
      <v-sortSprint @sortable="sortable"></v-sortSprint>
    </div>
    <template v-show="draggbleList.length">
      <v-draggable
        v-model="draggbleList"
        class="backlog-list"
        tag="div"
        ghost-class="ghost"
        v-bind="dragOptions"
        :group="group"
        animation="150"
        @start="startDraggable"
        @end="endDraggable"
        @add="addDraggable">
        <div
          v-for="(issue, i) of draggbleList"
          :key="issue.order"
          :data-key="issue.guid"
          class="item sprint-issue-draggable"
          @contextmenu.prevent="contextmenuFn"
          @click="handleDraggleList(issue, i)">
          <span class="type" :class="[issue.issueType]">
            <i class="iconfont" :class="filterTypeIcon(issue.issueType)" :style="{color: filterTypeColor(issue.issueType)}"></i>
          </span>
          <span class="level"><i class="iconfont" :class="stylelevelClass(issue.urgencyLevel)" :style="{'color': filterLevelColor(issue.urgencyLevel)}"></i></span>
          <span class="title" :title="issue.title">{{issue.title}}</span>
          <el-button type="text" size="mini" :class="[issue.tag && issue.tag.guid, 'modules-type']"  v-if="issue.tag">{{issue.tag.name}}</el-button>
          <el-button type="text" size="mini" v-if="issue.moduleState" :class="[issue.moduleState.link, 'info-status']">{{issue.moduleState.name}}</el-button>
        </div>
      </v-draggable>
    </template>
    <div class="no-draggleList" v-if="draggbleList.length === 0">
      <div class="no-info">暂无事务</div>
    </div>
  </div>
</template>
<script>
  // import * as KeyCode from 'keycode-js';
  import { issusTypeArr, levelArr } from './storyConstant'
  import sortSprint from './sortSprint'
  export default {
    props: {
      issueList: {
        type: Array,
        default: function() { return [] }
      },
      sprintType: [String],
      dropDraggleObj: [Object],
      loading: [Boolean],
      group: [String, Object]
    },
    inject: {
      progressStateList: {
        type: Array,
        default: () => ([])
      },
      modulesList: {
        type: Array,
        default: () => ([])
      },
      highlightSelectedList: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        visibleContextMenu: false, // 右键点击框
        levelArr,
        issusTypeArr,
        draggbleList: [],
        selectKey: '',
        oldIndex: -1,
        contextMenuTargets: []
      }
    },
    computed: {
      dragOptions() {
        return {
          animation: 0,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        }
      }
    },
    components: {
      'v-sortSprint': sortSprint
    },
    watch: {
      issueList: 'initData',
      dropDraggleObj: {
        handler(v) {
          if (v && this.oldIndex >= 0) {
            if (v.type === 'implement') {
              if (this.group === 'backlog') {
                this.$set(this.draggbleList[this.oldIndex], 'progressState', v.guid);
              } else {
                this.$notify.warning({
                  title: '提示',
                  message: 'Backlog中Issue不能设置执行状态',
                  size: 'mini',
                  showClose: false
                });
              }
            } else if (v.type === 'module') {
              this.$set(this.draggbleList[this.oldIndex], 'moduleState', v);
            }
          }
        },
        immediate: true
      }
    },
    filters: {
      filterprogressState(v) {
        return new Map([['doing', '处理中'], ['not-start', '未开始'], ['finish', '已完成']]).get(v)
      }
    },
    created() {
      this.initData(this.issueList)
    },
    methods: {
      contextmenuFn(event) {
        event.path.forEach((dom, index) => {
          if (index < 4 && dom.classList.contains('sprint-issue-draggable')) {
            this.selectKey = dom.getAttribute('data-key')
          }
        })

        this.highlightSelectedList(this.selectKey)
        this.$contextmenu({
          customClass: 'contextmenuContainer',
          items: [
            {
              label: "执行状态",
              disabled: false,
              children: this.progressStateList.map(item => ({label: item.name, value: item.link, onClick: () => this.handleClickimplement(item.link)}))
            },
            {
              label: "模型状态",
              disabled: false,
              children: [{ label: "翻译成简体中文" }, { label: "翻译成繁体中文" }],
              onClick: () => {
                this.clipboardContent = 'xxx';
              }
            }
          ],
          event,
          zIndex: 3,
          minWidth: 140
        })
      },
      initData(issueList) {
        this.contextMenuTargets = []
        this.draggbleList = JSON.parse(JSON.stringify(issueList))
        this.draggbleList.forEach(p => {
          this.contextMenuTargets.push(document.querySelector([`.item[data-key='${p.guid}']`]))
        })
      },
      handleClickimplement(implementType) {
        console.log(implementType)
      },
      sortable(type = 'executiveMode') {
        if (type == 'executiveMode') {
          this.draggbleList.sort((pre, next) => {
            let preIndex = ['not-start', 'doing', 'finish'].indexOf(pre.progressState)
            let nextIndex = ['not-start', 'doing', 'finish'].indexOf(next.progressState)

            return preIndex - nextIndex;
          })
        }
      },
      handleDraggleList(v, i) {
        this.$emit('handleDetail', v)
      },
      startDraggable(evt) {
        this.oldIndex = evt.oldIndex
      },
      endDraggable(v) {
        this.$emit('endDraggable', v);
      },
      addDraggable(v) {

      },
      filterLevelColor(v) {

      },
      stylelevelClass(v) {
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
      filterTypeIcon(v) {
        return this.issusTypeArr.find(p => p.value === v).icon
      },
      filterTypeColor(v) {
        return this.issusTypeArr.find(p => p.value === v).color
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
    background-color: #EBEEF5;
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
    font-size: 14px;
    margin-bottom: 0px;
    user-select: none;
    padding: 0 6px 0 4px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    text-indent: 5px;
    cursor: move;
    position: relative;
    box-shadow: 0 0 1px 0 rgba(9,30,66,0.31), 0 2px 4px -1px rgba(9,30,66,0.25);
    border-left: 0;
    white-space: nowrap;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    &.ghost:hover {
      background-color: #deebff;
    }
    &:hover {
      filter: contrast(0.9)
    }
    &.light {
      filter: contrast(0.9);
      background: #deebff;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      height: 100%;
      position: absolute;
      text-indent: -9999em;
      top: 0;
      width: 3px;
      background-color: #f93;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 14px;
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .modules-type {
      border-radius: 4px;
      color: #fff;
      padding: 2px 3px;
      background: rgba(0,0,0,0.4);
    }
    .info-status {
      border-radius: 4px;
      color: #fff;
      padding: 2px 3px;
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
    @for $i from 1 through 30 {
      .module-#{$i} {
        background-color: #ffab00;
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
      color: #E6A23C;
      font-size: 17px;
      .icon-1_square {
        color: #67C23A;
      }
      .icon-2_square {
        color: #67C23A;
      }
      .icon-3_square {
        color: #E6A23C;
      }
      .icon-4_square {
        color: #E6A23C;
      }
      .icon-5_square {
        color: #F56C6C;
      }
      .icon-6_square {
        color: #F56C6C;
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
