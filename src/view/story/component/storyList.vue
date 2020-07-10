<template>
  <div id="draggable-list" class="draggable-list">
    <v-draggable v-model="draggbleList"
                 draggable=".item"
                 :group="group"
                 tag="div"
                 ghost-class="ghost"
                 v-bind="dragOptions"
                 @start="startDraggable"
                 @end="endDraggable"
                 @add="addDraggable"
                 class="backlog-list">
        <div v-for="(p, i) of draggbleList"
             :key="p.order"
             :data-key="p.link"
             class="item"
             @click="handleDraggleList(p, i)">
          <span class="type" :class="[p.type]">
            <i class="iconfont icon-icon-test1" :class="p.type === 'bug' ? 'icon-dashujukeshihuaico-' : 'icon-shujuzhongjian'"></i>
          </span>
          <span class="level"><i class="iconfont" :class="filterLevel(p.level)"></i></span>
          <span class="key-link">{{p.link}}</span>
          <span class="title">{{p.title}}</span>
          <el-button type="text" size="mini" :class="[p.moduleState && p.moduleState.link, 'modules-type']" :style="{backgroundColor: p.moduleState.color}" v-if="p.moduleState">{{p.moduleState.name}}</el-button>
          <el-button type="text" size="mini" :class="[p.progressState, 'info-status']">{{p.progressState | filterprogressState}}</el-button>
          <el-button type="info" circle class="points">{{p.points}}</el-button>
        </div>
    </v-draggable>
  </div>
</template>
<script>
  export default {
    props: {
      list: {
        type: Array,
        default: function() { return [] }
      },
      dropDraggleObj: [Object],
      loading: [Boolean],
      group: [String, Object]
    },
    data() {
      return {
        draggbleList: [],
        oldIndex: -1
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
    watch: {
      list(v) {
        this.draggbleList = JSON.parse(JSON.stringify(this.list))
      },
      dropDraggleObj: {
        handler(v) {
          if (v && this.oldIndex >= 0) {
            if (v.type === 'implement') {
              this.$set(this.draggbleList[this.oldIndex], 'progressState', v.link);
              console.log(v)
            } else if (v.type === 'module') {
              console.log(v)
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
      this.draggbleList = JSON.parse(JSON.stringify(this.list))
    },
    methods: {
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
        console.log(3)
      },
      filterLevel(v) {
        return ['icon-1_square', 'icon-2_square', 'icon-3_square', 'icon-4_square', 'icon-5_square', 'icon-6_square', 'icon-7_square'][v]
      }
    }
  }
</script>
<style lang="scss">
#draggable-list {
  height: calc(100% - 40px);
  padding: 0 10px 10px;
  box-sizing: border-box;
  position: relative;
  background: #f4f5f7;
  padding-bottom: 40px;
  // .flip-list-move {
    // transition: transform 0.3s;
  // }
  .ghost {
    background: #EBEEF5 !important;
    opacity: 0.5;
    visibility: hidden;
  }
  .item {
    background: #fff;
    overflow: hidden;
    height: 32px;
    box-shadow: 0 0 11px 0 rgba(9,30,66,0.31), 0 2px 4px -1px rgba(9,30,66,0.25);
    line-height: 32px;
    font-size: 14px;
    margin-bottom: 2px;
    user-select: none;
    padding: 0 4px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    text-indent: 5px;
    cursor: move;
    position: relative;
    border-top: 1px solid #f6f6f6;
    white-space: nowrap;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    &:hover {
      background: #f6f6f6;
    }
    &.light {
      background-color: rgba(0, 0, 0, 0.1);
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
      padding: 1px 2px;
      &.article {
        background-color: #00875a;
      }
    }
    .info-status {
      border-radius: 4px;
      color: #fff;
      padding: 1px 2px;
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
      font-size: 14px;
      font-weight: 600;
    }
    .points {
      padding: 0;
      width: 25px;
      height: 25px;
      font-size: 12px;
      transform: scale(0.75);
    }
  }
}
</style>
