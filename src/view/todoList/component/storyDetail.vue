<template>
  <div class="issue-detail-container">
    <div v-if="activeIssue"
         class="scroll-style-none issue-detail-box">
      <el-button size="mini"
                 type="text"
                 class="close-btn"
                 icon="iconfont icon-chenghao"
                 @click="handleClickCloseDetailModule()">
      </el-button>
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
        <div class="form-value">{{activeIssue.createTime}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">最近更新</div>
        <div class="form-value">{{activeIssue.updateTime}}</div>
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
    <div id="dragglePoint"><i class="iconfont icon-tuodong"></i></div>
  </div>
</template>
<script>
import { levelList, pointsArr } from './storyConstant.js'
import { mapState } from 'vuex'
import editModuleBox from '@/components/editModuleBox'

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
    activeIssue: state => state.sprint.activeIssue
  }),
  mounted() {
    this.addDraggleEvent()
  },
  methods: {
    addDraggleEvent() {
      let backlogDetailWrapper = document.getElementById('backlogDetailWrapper')
      let sprintDetailWrapper = document.getElementById('sprintDetailWrapper')
      let dragglePoint = document.getElementById('dragglePoint')
      let that = this

      document.onmouseup = function (evt) {
        document.onmousemove = null
        document.onmouseup = null
      }

      if (!dragglePoint || !backlogDetailWrapper || !sprintDetailWrapper) {
        return
      }

      dragglePoint.onmousedown = function (el) {
        let currentPointClientX = el.clientX
        let windowWidth = window.innerWidth
        let backlogDetailWidth = backlogDetailWrapper.offsetWidth
        let sprintDetailWidth = sprintDetailWrapper.offsetWidth

        document.onmousemove = function mouseMove(e) {
          that.$store.commit('hasDraggle', true)
          el.target.setCapture && el.target.setCapture()

          let dvalue = e.clientX - currentPointClientX
          let backlogPercent = ((backlogDetailWidth + dvalue) / windowWidth * 100)
          let sprintDetailPercent = ((sprintDetailWidth - dvalue) / windowWidth * 100)

          if (backlogPercent > 46 && sprintDetailPercent > 22) {
            backlogDetailWrapper.style.width = backlogPercent + '%'
            sprintDetailWrapper.style.width = sprintDetailPercent + '%'
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
  padding-left: 20px;
  color: #172b4d;
  font-size: 14px;
  user-select: none;
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
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .title {
    margin: 3px 0;
  }
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
</style>
