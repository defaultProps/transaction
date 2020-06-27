<template>
  <div id="draggble-list">
    <v-draggable v-model="draggbleList"
                 draggable=".item"
                 :group="group"
                 @change="log"
                 class="backlog-list">
      <div v-for="p of draggbleList" :key="p.id" class="item">
        <span class="type" :class="[p.type]">
          <i class="iconfont icon-icon-test1" :class="p.type === 'bug' ? 'icon-dashujukeshihuaico-' : 'icon-shujuzhongjian'"></i>
        </span>
        <span class="level"><i class="iconfont" :class="p.level === 1 ? 'icon-renwu' : 'icon-fl-dian'"></i></span>
        <span class="key-link">{{p.link}}</span>
        <span class="title">{{p.title}}</span>
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
      group: [String, Object]
    },
    data() {
      return {
        draggbleList: []
      }
    },
    watch: {
      list(v) {
        this.draggbleList = JSON.parse(JSON.stringify(this.list))
      }
    },
    created() {
      this.draggbleList = JSON.parse(JSON.stringify(this.list))
    },
    methods: {
      log() {
        console.log(12)
      }
    }
  }
</script>
<style lang="scss" scoped>
#draggble-list {
  height: calc(100% - 40px);
  padding-right: 10px;
  overflow-y: scroll;
  .item {
    background: #fff;
    overflow: hidden;
    height: 32px;
    box-shadow: 0 0 1px 0 rgba(9,30,66,0.31), 0 2px 4px -1px rgba(9,30,66,0.25);
    line-height: 32px;
    font-size: 15px;
    margin-bottom: 2px;
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
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
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
      &.level-1 {
        color: #F56C6C;
      }
    }
    .key-link {
      color: #0052cc;
      font-size: 15px;
      font-weight: 500;
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
