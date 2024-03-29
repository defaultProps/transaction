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
              <span class="issus-count">{{ activeSprintList.length }} 条例</span>
            </div>
          </div>
          <v-drag-list-box v-show="visibleSprint"
                           :issueList="activeSprintList"
                           :dropObj="dropObj"
                           groupName="activeSprintListDraggableGroup"
                           sprintType="active"></v-drag-list-box>
        </div>
        <div class="sprint-between">
          <div class="title">自从厌倦于追寻，我已学会一觅即中。</div>
        </div>
        <div class="backlog-box">
          <div class="backlog-title">
            <div class="left-flex">
              <span class="title">缓存区</span>
              <span class="issus-count">{{ backlogSprint.length }} 条例</span>
            </div>
          </div>
          <v-drag-list-box :dropbj="dropObj"
                           :issueList="backlogSprint"
                           :groupName="{ name: 'activeSprintListDraggableGroup', pull: true, put: true }"
                           handle=".handle"
                           sprintType="backlog"></v-drag-list-box>
        </div>
      </div>
      <v-issue-detail-box v-show="visibleSidebarRightDetail"
                          id="detailContainerBox"></v-issue-detail-box>
    </div>
    <div class="add-issue-btn"
         @click="handleClickShowNewIssueDialog()">新增</div>
  </div>
</template>
<script>
import dragListBox from './component/dragListBox'
import sidebarSprintBox from './component/sidebarSprintBox.vue'
import sprintDetail from './component/storyDetail'
import { mapState } from 'vuex'
import { sprintAxios } from '@/axios'

export default {
  data () {
    return {
      visibleSprint: true,
      dropObj: null
    }
  },
  components: {
    'v-sidebar-sprint-box': sidebarSprintBox,
    'v-drag-list-box': dragListBox,
    'v-issue-detail-box': sprintDetail
  },
  provide () {
    return {
      handleClickimplement: this.handleClickimplement
    }
  },
  mounted () {
    this.$store.dispatch('sprint/getAllSprintList')
    this.getIssueTypeList()
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
    handleClickShowNewIssueDialog () {
      this.$store.commit('sprint/VISIBLE_NEWISSUE_DIALOG', true)
    },
    getIssueTypeList () {
      sprintAxios.getIssueTypeList().then(list => {
        this.$store.commit('sprint/ISSUETYPELIST', list)
      })
    },
    handleClickvisibleNavigation () {
      this.$store.commit('sprint/SET_VISIBLESIDEBARLEFT', !this.visibleSideBarLeft)
    },
    handleClickimplement (obj, selectIssue) {
      if (obj.link === 'close') {
        if (selectIssue.type === 'backlog') {
          this.$message.error('缓存区条例不允许关闭，只能删除')
          return
        }

        if (selectIssue.type === 'active' && selectIssue.moduleState.link !== 'finish') {
          this.$confirm('工作区条例还未完成，是否继续关闭?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            customClass: 'transaction-message-box-customClass',
            showClose: false
          }).then(() => {
            this.updateIssueDataAxios(obj, selectIssue)
          }).catch(() => {
            // no throw Error()
          })
        } else {
          this.updateIssueDataAxios(obj, selectIssue)
        }
      } else {
        this.updateIssueDataAxios(obj, selectIssue)
      }
    },
    updateIssueDataAxios (obj, selectIssue) {
      let params = {}

      if (obj.type === 'progressState') {
        const { id, link, name } = obj
        params = Object.assign({}, selectIssue, { moduleState: { id, link, name } })
      } else if (obj.type === 'module') {
        const { color, id, icon, name } = obj
        params = Object.assign({}, selectIssue, { tag: { color, id, icon, name } })
      }

      sprintAxios.updateIssueData(params).then(hasUpdateData => {
        if (hasUpdateData) {
          this.$store.dispatch('sprint/updateIssueData', params)
          if (obj.link === 'close') {
            this.$store.dispatch('sprint/removeIssueItem', selectIssue)
          }
        }
      }).catch((err) => {
        this.$store.commit('metaView/PUSH_AXIOS_ERRORLIST', err)
      })
    },
    dropDownStatus (obj) {
      this.dropObj = obj
    },
    dragleave (obj) {
      this.$set(obj, 'dropStatus', false)
    },
    dragover (e, obj) {
      e.preventDefault()
      this.$set(obj, 'dropStatus', true)
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
      .sprint-between {
        width: 100%;
        height: 100px;
        color: #999;
        font-size: 12px;
        text-align: center;
        background-color: #f4f5f7;
        .title {
          position: relative;
          top: 55px;
          user-select: none;
        }
      }
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
            .add-issue-btn {
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
  .add-issue-btn {
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 60px;
    height: 60px;
    text-align: center;
    vertical-align: middle;
    line-height: 60px;
    color: #ffffff;
    font-size: 16px;
    border-radius: 50%;
    box-sizing: border-box;
    background: #205081;
  }
}
</style>
