<template>
  <div id="draggable-list">
    <div class="sort-contain" v-show="draggbleList.length && sprintType =='active'">
      <v-sortSprint @sortable="sortable"></v-sortSprint>
    </div>
    <template v-show="draggbleList.length">
      <v-draggable
        v-model="draggbleList"
        draggable=".item"
        class="backlog-list"
        tag="div"
        ghost-class="ghost"
        v-bind="dragOptions"
        :group="group"
        animation="200"
        @start="startDraggable"
        @end="endDraggable"
        @add="addDraggable">
        <div
          v-for="(p, i) of draggbleList"
          :key="p.order"
          :data-key="p.link"
          class="item"
          @contextmenu="showMenu"
          @click="handleDraggleList(p, i)">
          <span class="type" :class="[p.type]">
            <i class="iconfont" :class="filterTypeIcon(p.type)" :style="{color: filterTypeColor(p.type)}"></i>
          </span>
          <span class="level"><i class="iconfont" :class="stylelevelClass(p.level)" :style="{'color': filterLevelColor(p.level)}"></i></span>
          <span class="title" :title="p.title">{{p.title}}</span>
          <el-button type="text" size="mini" :class="[p.moduleState && p.moduleState.value, 'modules-type']"  v-if="p.moduleState">{{p.moduleState.name}}</el-button>
          <el-button type="text" size="mini" v-if="p.progressState" :class="[p.progressState, 'info-status']">{{p.progressState | filterprogressState}}</el-button>
        </div>
      </v-draggable>
    </template>
    <div class="no-draggleList" v-if="draggbleList.length === 0">
      <div class="no-info">暂无事务</div>
    </div>
    <vue-context-menu
            :contextMenuData="contextMenuData"
            @savedata="savedata"
            @newdata="newdata"></vue-context-menu>
  </div>
</template>
<script>
  // import * as KeyCode from 'keycode-js';
  import { issusTypeArr, levelArr } from './storyConstant'
  import sortSprint from './sortSprint'
  export default {
    props: {
      list: {
        type: Array,
        default: function() { return [] }
      },
      sprintType: [String],
      dropDraggleObj: [Object],
      loading: [Boolean],
      group: [String, Object]
    },
    data() {
      return {
        contextMenuData: {
          menuName: 'draggle',
          axis: {
            x: null,
            y: null
          },
          menulists: [
            {
              fnHandler: 'moveToSprint',
              btnName: '移动到Sprint'
            },
            {
              fnHandler: 'deleteIssue',
              btnName: '删除此Issue'
            }
          ]
        },
        visibleContextMenu: false, // 右键点击框
        levelArr,
        issusTypeArr,
        draggbleList: [],
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
      list: 'initData',
      dropDraggleObj: {
        handler(v) {
          console.log(this.group)
          if (v && this.oldIndex >= 0) {
            if (v.type === 'implement') {
              if (this.group === 'backlog') {
                this.$set(this.draggbleList[this.oldIndex], 'progressState', v.link);
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
      this.initData(this.list)
    },
    methods: {
      showMenu () {
        event.preventDefault()
        var x = event.clientX
        var y = event.clientY
        // Get the current location
        this.contextMenuData.axis = {
          x, y
        }
      },
      savedata () {
        alert(1)
      },
      newdata () {
        console.log('newdata!')
      },
      initData(list) {
        this.contextMenuTargets = []
        this.draggbleList = JSON.parse(JSON.stringify(list))
        this.draggbleList.forEach(p => {
          this.contextMenuTargets.push(document.querySelector([`.item[data-key='${p.link}']`]))
        })
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
    .key-link {
      color: #0052cc;
      font-size: 12px;
      font-weight: 600;
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
