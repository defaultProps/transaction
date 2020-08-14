<template>
  <div id="sprint-detail">
    <div class="scroll-style-none sprint-detail__container" v-loading="loading">
      <div class="header">
        <button size="mini" class="btn-del" type="text" @click="handleClickCloseDetailModule()">
          <i class="iconfont icon-chenghao"></i>
        </button>
      </div>
      <uxo-edit class="title" :content="sprintIssue.title" :guid="sprintIssue.guid"></uxo-edit>
      <div class="form-item item-top">
        <div class="form-label">
          紧急度
          <el-tooltip content="此issue处理的紧急程度，由低到高数字递增" placement="top">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </div>
        <el-select v-model="sprintIssue.urgencyLevel" placeholder="请选择" size="mini" class="select-level">
          <el-option-group v-for="group in levelArr" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
              <span :class="[item.icon, 'iconfont']" :style="{'color': item.color + ' !important'}"></span>
            </el-option>
          </el-option-group>
        </el-select>
      </div>
      <div class="form-item">
        <div class="form-label">创建时间</div>
        <div class="form-value">{{sprintIssue.createTime}}</div>
      </div>
      <div class="form-item">
        <div class="form-label">最近更新</div>
        <div class="form-value">{{sprintIssue.updateTime}}</div>
      </div>
      <div class="form-item desc">
        <div class="form-label">
          描述
          <el-tooltip content="此issue的详情描述信息" placement="top">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </div>
        <uxo-edit class="form-value" :content="sprintIssue.issueDesc" :uid="sprintIssue.guid" textType="textarea"></uxo-edit>
      </div>
      <div class="form-item remark">
        <div class="form-label">
          备注
          <el-tooltip content="此issue的备注信息" placement="top">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </div>
        <uxo-edit class="form-value" :content="sprintIssue.issueRemark" :uid="sprintIssue.guid" textType="textarea"></uxo-edit>
      </div>
      <div class="form-item remark">
        <div class="form-label">
          相关链接
          <el-tooltip content="此issue的备注信息" placement="top">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div id="dragglePoint"><i class="iconfont icon-tuodong"></i></div>
  </div>
</template>
<script>
import { levelArr, pointsArr } from './storyConstant.js'

export default {
  data() {
    return {
      levelArr,
      pointsArr,
      loading: true,
      hasDraggle: false, // 用户是否拖动过
      sprintIssue: {
        name: '',
        link: '',
        type: '',
        level: '',
        title: '',
        fixed: '',
        progressState: '',
        tag: {name: '', link: ''},
        points: ''
      }
    }
  },
  watch: {
    sprintLink: function(v) {
      if (v) {
        this.getsprintIssueDetail(v)
      }
    }
  },
  props: {
    sprintLink: {
      type: String,
      default: ''
    }
  },
  created() {
    this.getsprintIssueDetail(this.sprintLink)
  },
  mounted() {
    this.addDraggleEvent();
  },
  methods: {
    getsprintIssueDetail(sprintLink) {
      this.loading = true;
      this.$axios.sprints.sprintIssueDetail({link: sprintLink}).then(obj => {
        this.loading = false;
        if (obj.issueDetail) {
          this.sprintIssue = obj.issueDetail
        }
      })
    },
    addDraggleEvent() {
      let backlogDetailWrapper = document.getElementById('backlogDetailWrapper');
      let sprintDetailWrapper = document.getElementById('sprintDetailWrapper');
      let dragglePoint = document.getElementById('dragglePoint');
      let that = this;

      document.onmouseup = function (evt) {
        document.onmousemove = null;
        document.onmouseup = null;
      }

      dragglePoint.onmousedown = function(el) {
        let currentPointClientX = el.clientX;
        let windowWidth = window.innerWidth;
        let backlogDetailWidth = backlogDetailWrapper.offsetWidth;
        let sprintDetailWidth = sprintDetailWrapper.offsetWidth;

        document.onmousemove = function mouseMove (e) {
          that.$store.commit('hasDraggle', true)
          el.target.setCapture && el.target.setCapture();

          let dvalue =  e.clientX - currentPointClientX;
          let backlogPercent = ((backlogDetailWidth + dvalue) / windowWidth * 100)
          let sprintDetailPercent = ((sprintDetailWidth - dvalue) / windowWidth * 100)

          if (backlogPercent > 46 && sprintDetailPercent > 22) {
            backlogDetailWrapper.style.width = backlogPercent + '%'
            sprintDetailWrapper.style.width =  sprintDetailPercent + '%'
          }
        }

        document.onmouseup = function() {
          document.onmousemove = null;
          // 释放线程的指定窗口里设置鼠标捕获
          dragglePoint.releaseCapture &&  dragglePoint.releaseCapture();
          window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
      }
    },
    handleClickCloseDetailModule() {
      this.$store.commit('hasDraggle', false)
      this.$emit('closeDetail')
    }
  }
}

</script>
<style lang="scss">
.el-select-dropdown__item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  .label-info {
    font-size: 12px;
    float: right;
    color: #8492a6;
  }
}
#sprint-detail {
  user-select: none;
  font-size: 14px;
  color: #172b4d;
  padding: 0 5px 0 15px;
  box-sizing: border-box;
  position: relative;
  height: 100%;
  .sprint-detail__container {
    height: 100%;
    overflow-y: scroll;
  }
  #dragglePoint {
    position: absolute;
    box-sizing: border-box;
    line-height: 40px;
    top: 50%;
    left: 0;
    bottom: 0;
    width: 10px;
    height: 40px;
    cursor: move;
    background: rgba(0, 0, 0, 0.1);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    i {
      position: relative;
      left: -3px;
    }
  }
  .loadingdetail {
    color: #000;
  }
  .header {
    display: flex;
    justify-content:flex-end;
    align-items: center;
    padding: 10px 10px 0;
    .link {
      .tag {
        text-indent: 4px;
      }
    }
    .btn-del {
      border: none;
    }
  }
  .title {
    margin: 3px 0;
  }
  .form-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 35px;
    &.item-top {
      margin-top: 15px;
    }
    &.desc, &.remark {
      margin: 10px 0;
      display: block;
      .form-label {
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
        line-height: 16px;
      }
    }
    .form-value {
      width: 100%;
    }
  }
}
</style>
