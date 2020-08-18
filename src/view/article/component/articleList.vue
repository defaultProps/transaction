<template>
  <div id="article-list">
    <div class="top-bar">
      <el-button type="warning" size="mini" class="btn" @click="hc_open('https://github.com/uxo2/articles/issues')">新建文章</el-button>
      <el-input placeholder="请输入内容" v-model="inputVal" size="mini" class="inputval">
        <template slot="append">
          <div class="btn-search"><i class="el-icon-search"></i></div>
        </template>
      </el-input>
      <el-button type="text" icon="el-icon-warning" size="medium" class="info"></el-button>
    </div>
    <div class="main">
      <uxo-draggable v-model="draggbleList"
                  draggable=".item"
                  class="draggable-list"
                  tag="div"
                  ghost-class="ghost"
                  v-bind="dragOptions"
                  @start="startDraggable"
                  @end="endDraggable">
      <transition-group type="transition" name="flip-list">
        <div v-for="(p, i) of draggbleList"
            :key="p.order"
            class="draggable-li"
            @click="handleDraggleList(p ,i)"
            :class="[p.selected ? 'light' : 'default']">
          <span class="type" :class="[p.type]">
            <i class="iconfont" :class="p.type === 'read' ? 'icon-Reading' : 'icon-xiezuo'"></i>
          </span>
          <span class="level"><i class="iconfont" :class="filterLevel(p.level)"></i></span>
          <span class="key-link">{{p.link}}</span>
          <span class="title">{{p.title}}</span>
        </div>
      </transition-group>
    </uxo-draggable>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      inputVal: '',
      draggbleList: [],
      group: '',
      backlogLoading: false,
      sortBy: 'desc',
      type: "hot", // 热门hot、最新new、热榜list
      isLoading: true,
      currentPage: 1, // 当前加载页数
      loading: "", // 遮罩层
      catalogLists: [],
      articles: [] // 文章列表
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
    '$route.query.type': 'getArticleLists'
  },
  created() {
    this.getArticleLists()
  },
  methods: {
    handleDraggleList(v, i) {

    },
    startDraggable(v) {

    },
    endDraggable(v) {

    },
    filterLevel(v) {
      return ['icon-1_square', 'icon-2_square', 'icon-3_square', 'icon-4_square', 'icon-5_square', 'icon-6_square', 'icon-7_square'][v]
    },
    hc_open(link) {
      window.open(link)
    },
    getArticleLists() {
      this.$axios.article.list({ type: this.$route.query.type }).then(data => {
        this.draggbleList = data
      })
    }
  }
}
</script>
<style lang="scss">
#article-list {
  position: fixed;
  left: 200px;
  top: 40px;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  .top-bar {
    height: 34px;
    line-height: 34px;
    border: none;
    padding: 0 15px;
    font-size: 14px;
    display: flex;
    position: sticky;
    top: 0;
    z-index: 20;
    justify-content: flex-start;
    align-items: center;
    background: linear-gradient(left, #409EFF, #409EFF 10%,#fff 35%);
    border-bottom: 1px solid #f6f6f6;
    .btn {
      margin: 0 8px 0 -5px;
      color: #fff;
      padding: 6px;
      background: #ffab00;
    }
    .info {
      padding: 6px;
      margin: 0 8px 0 -3px;
      background: transparent;
      color: #409EFF;
    }
    .el-input-group__append {
      background: #ffab00;
      padding: 0 8px;
      .btn-search {
        color: #fff;
        height: 24px;
        font-size: 12px;
      }
    }
    .inputval {
      width: 150px;
      height: 26px;
      line-height: 26px;
      .el-input__inner {
        height: 26px;
        line-height: 26px;
      }
    }
  }
  .main {
    padding: 10px;
    box-sizing: border-box;
    .draggable-list {
      .draggable-li {
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
        &::before {
          content: '';
          position: absolute;
          left: 0;
          height: 100%;
          position: absolute;
          text-indent: -9999em;
          top: 0;
          width: 3px;
          background-color: #ffab00;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        .type {
          &.read {
            color: #0065ff;
          }
          &.write {
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
      }
    }
  }
}
</style>
