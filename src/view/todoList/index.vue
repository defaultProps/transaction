<template>
  <div class="sprint-container">
    <div class="sprint-flex-container">
      <v-sidebar-sprint-box v-show="visibleSideBarLeft"
                            class="sidebar-left"
                            @dropDownStatus="dropDownStatus"></v-sidebar-sprint-box>
      <div id="sprintListBox"
           class="sprint-list-box scroll-style-none">
        <div class="backlog-box">
          <div class="backlog-title">
            <div class="left-flex">
              <span :class="[visibleSprint ? 'visibleSprint': '', 'header-expander']"
                    size="mini"
                    @click="visibleSprint = !visibleSprint">
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="14"
                     height="10">
                  <g fill="none"
                     fill-rule="evenodd">
                    <path d="M3.29175 4.793c-.389.392-.389 1.027 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955c.388-.392.388-1.027 0-1.419-.389-.392-1.018-.392-1.406 0l-2.298 2.317-2.307-2.327c-.194-.195-.449-.293-.703-.293-.255 0-.51.098-.703.293z"
                          fill="#344563"></path>
                  </g>
                </svg>
              </span>
              <span class="title">工作区</span>
              <span class="issus-count">{{ activeSprintList.length }} 问题</span>
            </div>
          </div>
          <v-drag-list-box v-show="visibleSprint"
                           :issueList="activeSprintList"
                           :dropObj="dropObj"
                           groupName="activeSprintListDraggableGroup"
                           sprintType="active"
                           @endDraggable="endDraggable"></v-drag-list-box>
        </div>
        <div class="backlog-box">
          <div class="backlog-title">
            <div class="left-flex">
              <span class="title">缓存区</span>
              <span class="issus-count">{{ backlogSprint.length }} 问题</span>
            </div>
            <div class="right-flex">
              <el-button type="primary"
                         class="add-issue"
                         icon="el-icon-plus"
                         size="mini"
                         @click="dialogTableVisible = true">新增</el-button>
            </div>
          </div>
          <v-drag-list-box :dropbj="dropObj"
                           :issueList="backlogSprint"
                           :groupName="{ name: 'activeSprintListDraggableGroup', pull: true, put: true }"
                           handle=".handle"
                           sprintType="backlog"
                           @endDraggable="endDraggable"></v-drag-list-box>
        </div>
      </div>
      <v-issue-detail-box v-show="visibleSidebarRightDetail"
                          id="detailContainerBox"></v-issue-detail-box>
    </div>
    <v-add-issue-dialog-box :dialogTableVisible="dialogTableVisible"
                            @handleClose="handleClose"></v-add-issue-dialog-box>
  </div>
</template>
<script>
import dragListBox from './component/dragListBox'
import sidebarSprintBox from './component/sidebarSprintBox.vue'
import sprintDetail from './component/storyDetail'
import dialogNewIssus from './component/dialogNewIssus'
import { mapState } from 'vuex'
import { sprintAxios } from '@/axios/index.js'

export default {
  data() {
    return {
      visibleSprint: true, // 是否显示工作区issue-list
      dialogTableVisible: false, // 是否显示新增issue弹框
      backlogSprintListLoading: false, // backlog数据loading
      activeSprintListLoading: false, // 工作区数据loading
      dropObj: null // sprint列表拖动到左侧导航栏时的数据
    }
  },
  components: {
    'v-sidebar-sprint-box': sidebarSprintBox,
    'v-drag-list-box': dragListBox,
    'v-issue-detail-box': sprintDetail,
    'v-add-issue-dialog-box': dialogNewIssus
  },
  mounted() {
    this.getbacklogList()
    this.getsprintList()
  },
  computed: mapState({
    backlogSprint: state => state.sprint.backlogSprint,
    activeSprintList: state => state.sprint.activeSprintList,
    visibleSidebarRightDetail: state => state.sprint.visibleSidebarRightDetail,
    activeIssue: state => state.sprint.activeIssue,
    visibleSideBarLeft: state => state.sprint.visibleSideBarLeft,
    hasDraggle: state => state.story.hasDraggle
  }),
  methods: {
    // 左侧导航开启关闭
    handleClickvisibleNavigation() {
      this.$store.commit('sprint/SET_VISIBLESIDEBARLEFT', !this.visibleSideBarLeft)
    },
    dropDownStatus(obj) {
      this.dropObj = obj
    },
    handleClose() {
      this.dialogTableVisible = false
    },
    // 请求数据
    endDraggable(obj) {

    },
    dragleave(obj) {
      this.$set(obj, 'dropStatus', false)
    },
    dragover(e, obj) {
      e.preventDefault()
      this.$set(obj, 'dropStatus', true)
    },
    // 获取工作区列表数据
    async getsprintList() {
      this.activeSprintListLoading = true

      sprintAxios.activeSprintList({ type: 'sprint' }).then(obj => {
        this.$store.commit('sprint/ACTIVE_SPRINT_LIST', obj.issueList)

        this.$nextTick(() => {
          this.activeSprintListLoading = false
        })
      })
    },
    // 获取缓存区列表数据
    async getbacklogList() {
      this.backlogSprintListLoading = true

      sprintAxios.backlogSprintList({ type: 'backlog' }).then(obj => {
        this.$store.commit('sprint/BACKLOG_SPRINT_LIST', obj.issueList)

        this.$nextTick(() => {
          this.backlogSprintListLoading = false
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.sprint-container {
  .sprint-flex-container {
    position: fixed;
    top: 40px;
    right: 0;
    bottom: 0px;
    left: 0;
    display: flex;
    box-sizing: border-box;
    .sidebar-left {
      width: 200px;
      height: 100%;
    }
    .sprint-list-box {
      flex: 1;
      overflow-y: scroll;
      .backlog-box {
        &:last-child {
          margin-bottom: 0;
        }
        .backlog-title {
          position: sticky;
          top: 0;
          z-index: 19;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 45px;
          padding: 0 10px;
          font-size: 14px;
          background: #f4f5f7;
          user-select: none;
          .left-flex {
            .header-expander {
              position: relative;
              display: inline-block;
              margin-right: 3px;
              padding: 2px 3px;
              color: #fff;
              background-color: #f4f5f7;
              transform: rotate(-90deg);
              cursor: pointer;
              &.visibleSprint {
                transform: rotate(0);
              }
            }
            .title {
              max-width: 40px;
              padding: 0 10px 0 0;
              color: #172b4d;
              font-weight: 600;
              font-size: 14px;
            }
            .issus-count {
              overflow: hidden;
              font-weight: 600;
              font-size: 14px;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .right-flex {
            .add-issue {
              padding: 8px 12px;
              color: #ffffff;
              font-size: 14px;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
