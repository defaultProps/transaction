<template>
  <div id="moduleStory">
    <div class="story-backlog">
      <div class="sidebar-left" v-show="visibleNavigation">
        <uxo-storyStatusNavigation @dropDownStatus="dropDownStatus"></uxo-storyStatusNavigation>
      </div>
      <div class="sprint-list-box" :class="[activeLightLink ? 'scroll-style-theme1' : 'scroll-style-none']">
        <div class="backlog">
          <div class="backlog-title">
            <div>
              <span size="mini" :class="{'visibleSprint': visibleSprint}" @click="visibleSprint = !visibleSprint" class="header-expander">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10">
                  <g fill="none" fill-rule="evenodd">
                    <path d="M3.29175 4.793c-.389.392-.389 1.027 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955c.388-.392.388-1.027 0-1.419-.389-.392-1.018-.392-1.406 0l-2.298 2.317-2.307-2.327c-.194-.195-.449-.293-.703-.293-.255 0-.51.098-.703.293z" fill="#344563"></path>
                  </g>
                </svg>
              </span>
              <span class="title">工作区</span>
              <span class="issus-count">{{activeSprint.issueList.length}} 问题</span>
            </div>
          </div>
          <uxo-draggleList :issueList="activeSprint.issueList" :dropObj="dropObj" group="activeSprint" v-show="visibleSprint" sprintType="active" @endDraggable="endDraggable" @handleDetail="handleDetail"></uxo-draggleList>
        </div>
        <div class="space-between"></div>
        <div class="backlog">
          <div class="backlog-title">
            <div>
              <span class="title">缓存区</span>
              <span class="issus-count">{{backlogSprint.length}} 问题</span>
            </div>
          </div>
          <uxo-draggleList handle=".handle" sprintType="backlog" @handleDetail="handleDetail" :dropObj="dropObj" @endDraggable="endDraggable" :issueList="backlogSprint" :group="{ name: 'activeSprint', pull: true, put: true }"></uxo-draggleList>
        </div>
      </div>
      <div class="sprint-detail-box">
        <uxo-sprintDetail class="detail-container" :sprintLink="activeLightLink" @closeDetail="closeDetail"></uxo-sprintDetail>
      </div>
    </div>
    <div class="newIssue-btn" size="medium" @click="dialogTableVisible = true"><i class="el-icon-plus"></i></div>
    <el-button size="small" class="triggernavgation" @click="handleClickvisibleNavigation">
      <i :class="[visibleNavigation ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right']"></i>
    </el-button>
    <uxo-dialogNewIssus :dialogTableVisible="dialogTableVisible" @handleClose="handleClose"></uxo-dialogNewIssus>
  </div>
</template>
<script>
import draggleList from './component/storyList'
import storyStatusNavigation from './component/storyStatusNavigation'
import sprintDetail from './component/storyDetail'
import dialogNewIssus from './component/dialogNewIssus'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      visibleSprint: true,
      dialogTableVisible: false,
      activeSprintListLoading: false,
      sprintData: [],
      selecType: null,
      backlogSprint: [],
      activeSprint: {
        issueList: []
      },
      visibleNavigation: true, // 是否显示左侧状态栏
      backlogLoading: false,
      sprintLoading: false,
      activeCollapse: 0,
      activeLightLink: '', // 当前高亮选中link
      affairVal: '',
      sprintLen: 20,
      detailLen: 0,
      sprintType: '', // 保存是active拖动还是backlog拖动
      dropObj: null // sprint列表拖动到左侧导航栏时的数据
    }
  },
  provide () {
    return {
      highlightSelectedList: this.highlightSelectedList
    }
  },
  components: {
    'uxo-storyStatusNavigation': storyStatusNavigation,
    'uxo-draggleList': draggleList,
    'uxo-sprintDetail': sprintDetail,
    'uxo-dialogNewIssus': dialogNewIssus
  },
  created () {
    this.getbacklogList()
    this.getsprintList();
  },
  computed: mapState({
    hasDraggle: state => state.story.hasDraggle
  }),
  methods: {
    dropDownStatus (obj) {
      this.dropObj = obj;
    },
    handleClose () {
      this.dialogTableVisible = false;
    },
    // 请求数据
    endDraggable (obj) {
      this.highlightSelectedList(this.activeLightLink);
      if (this.dropObj) {
        setTimeout(() => {
          this.dropObj = null;
        }, 4000);
      }
    },
    dragleave (obj) {
      this.$set(obj, 'dropStatus', false)
    },
    dragover (e, obj) {
      e.preventDefault()
      this.$set(obj, 'dropStatus', true)
    },
    closeDetail () {
      this.activeLightLink = null;
      this.highlightSelectedList()
      this.renderlayout()
    },
    handleDetail (v, hasRenderLayout = true) {
      this.activeLightLink = v.guid;

      if (hasRenderLayout) {
        this.renderlayout()
      }

      this.highlightSelectedList(this.activeLightLink)
    },
    // css - 排版 - 左侧导航关闭
    handleClickvisibleNavigation () {
      this.visibleNavigation = !this.visibleNavigation;
      this.renderlayout();
    },
    renderlayout () {
      if (this.visibleNavigation) {
        this.sprintLen = this.activeLightLink ? 15 : 20;
        this.detailLen = 20 - this.sprintLen;
      } else {
        this.sprintLen = this.activeLightLink ? 18 : 24;
        this.detailLen = 24 - this.sprintLen;
      }

      // document.getElementById('backlogDetailWrapper').style.width = this.sprintLen / 24 * 100 + '%'
      // document.getElementById('sprintDetailWrapper').style.width = Math.floor(this.detailLen / 24 * 100) + '%'
    },
    // css & 拖动列表高亮
    highlightSelectedList (key) {
      let dom = document.querySelector(`.item[data-key="${key}"]`);
      let allDraggableList = document.querySelectorAll(`.item[data-key]`);

      allDraggableList.forEach(el => {
        el.classList.remove('light')
      })

      if (key && dom) {
        dom.classList.add('light')
        this.activeLightLink = key
      }
    },
    getsprintList () {
      this.activeSprintListLoading = true;
      this.$axios.sprints.activeSprintList({ type: 'sprint' }).then(activeSprint => {
        this.activeSprintListLoading = false;
        this.activeSprint = activeSprint;
      })
    },
    getbacklogList () {
      this.backlogLoading = true
      this.$axios.sprints.backlogSprintList({ type: 'backlog' }).then(backlogSprint => {
        this.backlogLoading = false
        this.backlogSprint = backlogSprint.issueList
      })
    }
  }
}
</script>
<style lang="scss">
$color-highColor: #172b4d;
$bg-big: #f4f5f7;

#moduleStory {
  width: 100%;
  height: 100%;
  .newIssue-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: 1px solid #205081;
    background: #205081;
    border-radius: 50%;
    color: #fff;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      color: rgb(255, 171, 0);
      font-size: 22px;
    }
  }
  .triggernavgation {
    float: right;
    color: #172b4d;
    font-size: 16px;
    font-weight: 600;
    background: #ebeef5;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
  }
  .story-backlog {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0px;
    top: 40px;
    display: flex;
    box-sizing: border-box;
    .sidebar-left {
      height: 100%;
      width: 200px;
    }
    .sprint-list-box {
      height: 100%;
      overflow-y: scroll;
      box-sizing: border-box;
      flex: 1;
      .space-between {
        height: 120px;
        margin: 10px 0;
        line-height: 100px;
        text-align: center;
        font-size: 16px;
        background: #f4f5f7;
      }
      .backlog {
        &:last-child {
          margin-bottom: 0;
        }
        .backlog-title {
          height: 45px;
          font-size: 16px;
          padding: 0 10px;
          position: sticky;
          top: 0;
          z-index: 19;
          background: #f4f5f7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .header-expander {
            padding: 2px 3px;
            cursor: pointer;
            position: relative;
            display: inline-block;
            background-color: #f4f5f7;
            color: #fff;
            margin-right: 3px;
            transform: rotate(-90deg);
            &.visibleSprint {
              transform: rotate(0);
            }
          }
          .title {
            font-weight: 600;
            font-size: 16px;
            color: #172b4d;
            padding: 0 10px 0 0;
            max-width: 40px;
          }
          .item-meta {
            width: 60px;
          }
          .issus-count {
            font-size: 14px;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .date {
            font-size: 14px;
          }
          .status {
            color: #fff;
            padding: 1px 2px;
            font-size: 12px;
            border-radius: 4px;
            box-sizing: border-box;
            height: 20px;
            text-align: left;
            font-weight: 600;
            background-color: #00875a;
            border-color: #00875a;
            &.doing {
              background-color: #00875a;
              border-color: #00875a;
            }
            &.count {
              background-color: #e6a23c;
              border-color: #e6a23c;
              line-height: 16px;
              height: 16px;
              font-size: 12px;
              padding: 0 7px;
              margin-left: 10px;
              border-radius: 3px;
            }
          }
          .backlog-select {
            width: 100px;
            float: right;
            padding: 0;
            font-weight: 600;
            font-size: 14px;
            color: #409eff !important;
            background: transparent;
            .el-input__inner {
              color: #409eff !important;
              background: #ecf5ff;
              border-color: #b3d8ff;
              outline: none;
            }
          }
        }
      }
      .sprint {
        margin-bottom: 30px;
        background: #f4f5f7;
        padding: 10px;
        box-sizing: border-box;
        .sprintlist {
          position: sticky;
          top: 0;
          z-index: 20;
        }
        .sprint-ul {
          box-sizing: border-box;
          .count {
            float: right;
          }
        }
      }
    }
    .sprint-detail-box {
      height: 100%;
      width: 400px;
    }
  }
}
</style>
