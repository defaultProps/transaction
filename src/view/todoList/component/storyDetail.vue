<template>
  <div class="issue-detail-container">
    <div v-if="activeIssue"
         class="scroll-style-none issue-detail-box">
      <div class="header-box">
        <el-button size="mini"
                   type="text"
                   class="close-btn"
                   icon="iconfont icon-chenghao"
                   @click="handleClickCloseDetailModule()"></el-button>
      </div>
      <div class="content-box">
        <v-edit-module-box :content="activeIssue.title"
                           :id="activeIssue.id"
                           class="title"></v-edit-module-box>
        <div class="form-item item-top">
          <div class="form-label">
            紧急度
            <el-tooltip content="此issue处理的紧急程度，由低到高数字递增"
                        placement="top">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </div>
          <el-select v-model="activeIssue.urgencyLevel"
                     placeholder="请选择"
                     size="mini"
                     class="select-level">
            <el-option-group v-for="group in levelList"
                             :key="group.label"
                             :label="group.label">
              <el-option v-for="item in group.options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
                <span :class="[item.icon, 'iconfont']"
                      :style="{'color': item.color + ' !important'}"></span>
              </el-option>
            </el-option-group>
          </el-select>
        </div>
        <div class="form-item">
          <div class="form-label">创建时间</div>
          <div class="form-value">{{ activeIssue.createTime  | filterTime }}</div>
        </div>
        <div class="form-item">
          <div class="form-label">最近更新</div>
          <div class="form-value">{{ activeIssue.updateTime | filterTime }}</div>
        </div>
        <div class="form-item desc">
          <div class="form-label">
            描述
            <el-tooltip content="此issue的详情描述信息"
                        placement="top">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </div>
          <v-edit-module-box :content="activeIssue.issueDesc"
                             :uid="activeIssue.id"
                             class="form-value"
                             textType="textarea"></v-edit-module-box>
        </div>
        <div class="form-item remark">
          <div class="form-label">
            备注
            <el-tooltip content="此issue的备注信息"
                        placement="top">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </div>
          <v-edit-module-box :content="activeIssue.issueRemark"
                             :uid="activeIssue.id"
                             textType="textarea"
                             class="form-value"></v-edit-module-box>
        </div>
        <div class="form-item remark">
          <div class="form-label">
            相关链接
            <el-tooltip content="此issue的备注信息"
                        placement="top">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div id="dragglePoint"><i class="iconfont icon-tuodong"></i></div>
  </div>
</template>
<script>
import { levelList, pointsArr } from './storyConstant.js'
import { mapState } from 'vuex'
import editModuleBox from '@/components/editModuleBox.vue'

export default {
  components: {
    'v-edit-module-box': editModuleBox
  },
  data() {
    return {
      levelList,
      pointsArr,
      hasDraggle: false // 用户是否拖动过
    }
  },
  computed: mapState({
    activeIssue: state => state.sprint.activeIssue,
    visibleSidebarRightDetail: state => state.sprint.visibleSidebarRightDetail
  }),
  watch: {
    visibleSidebarRightDetail: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.addDraggleEvent()
          })
        }
      },
      immediate: true
    }
  },
  filters: {
    filterTime(val) {
      let date = new Date(val)
      let year = date.getFullYear()
      let month = date.getMonth() < 9 ? `0${date.getMonth()}` : date.getMonth()
      let day = date.getDay() < 9 ? `0${date.getDay()}` : date.getDay()
      let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()

      return `${year}/${month}/${day} ${hour}:${minute}:${seconds}`
    }
  },
  methods: {
    addDraggleEvent() {
      let sprintDetailDom = document.getElementById('detailContainerBox')
      let dragglePoint = document.getElementById('dragglePoint')
      let that = this

      // 鼠标松开后清除绑定事件
      document.onmouseup = function (evt) {
        document.onmousemove = null
        document.onmouseup = null
      }

      if (!dragglePoint || !sprintDetailDom) {
        return
      }

      dragglePoint.onmousedown = function (el) {
        let currentPointClientX = el.clientX
        let sprintDetailWidth = sprintDetailDom.offsetWidth

        document.onmousemove = function mouseMove(e) {
          that.$store.commit('hasDraggle', true)
          el.target.setCapture && el.target.setCapture()

          let dvalue = e.clientX - currentPointClientX

          if (sprintDetailWidth - dvalue >= 280 && sprintDetailWidth - dvalue <= 600) {
            sprintDetailDom.style.width = (sprintDetailWidth - dvalue) + 'px'
          }
        }

        document.onmouseup = function () {
          document.onmousemove = null
          // 释放线程的指定窗口里设置鼠标捕获
          dragglePoint.releaseCapture && dragglePoint.releaseCapture()
          window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
        }
      }
    },
    handleClickCloseDetailModule() {
      this.$store.commit('hasDraggle', false)
      this.$store.dispatch('sprint/selectActiveIssue', null)
    }
  }
}
</script>
<style lang="scss">
.el-select-dropdown__item {
  display: flex;
  align-content: center;
  justify-content: space-between;
  .label-info {
    float: right;
    color: #8492a6;
    font-size: 12px;
  }
}
.issue-detail-container {
  position: relative;
  width: 300px;
  height: 100%;
  border-left: 1px solid rgba(16, 22, 26, 0.3);
  color: #172b4d;
  font-size: 14px;
  user-select: none;
  .header-box {
    height: 30px;
    line-height: 30px;
    background-color: #f4f5f7;
    overflow: hidden;
    .close-btn {
      float: right;
      margin-right: 10px;
    }
  }
  .content-box {
    padding: 0 10px;
    .form-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      min-height: 35px;
      &.item-top {
        margin-top: 15px;
      }
      &.desc,
      &.remark {
        display: block;
        .form-label {
          margin: 10px 0;
          margin-bottom: 10px;
        }
      }
      .select-level {
        width: 100px;
      }
      .form-label {
        min-width: 100px;
        i {
          color: #d5d5d5;
          line-height: 14px;
        }
      }
      .form-value {
        width: 100%;
      }
    }
  }

  .issue-detail-box {
    height: 100%;
    overflow-y: scroll;
  }
  #dragglePoint {
    position: absolute;
    top: 50%;
    bottom: 0;
    left: 0;
    width: 10px;
    height: 40px;
    line-height: 40px;
    background: rgba(0, 0, 0, 0.1);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    cursor: move;
    i {
      position: relative;
      left: -3px;
    }
  }
  .loadingdetail {
    color: #000;
  }

  .title {
    margin: 3px 0;
  }
}
</style>
