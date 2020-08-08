<template>
  <div id="sprint-detail">
    <div id="dragglePoint"><i class="iconfont icon-tuodong"></i></div>
    <div class="header">
      <div class="link">
        <router-link tag="a" v-show="details.tag" :to="details.link" class="tag">{{details.tag.name}}</router-link> /
        <router-link tag="a" :to="`/story/${details.link}`" class="tag">{{details.link}}</router-link>
      </div>
      <el-button type="text" icon="el-icon-close" class="btn-del" @click="handleClickCloseDetailModule()"></el-button>
    </div>
    <v-edit class="title" :content="details.title" :uid="details.link"></v-edit>
    <div class="form-item item-top">
      <div class="form-label">
        紧急度
        <el-tooltip content="此issue处理的紧急程度，由低到高数字递增" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <el-select v-model="details.level" placeholder="请选择" size="mini" class="select-level">
        <el-option-group v-for="group in levelArr" :key="group.label" :label="group.label">
          <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
            <span :class="[item.icon, 'iconfont']" :style="{'color': item.color + ' !important'}"></span>
          </el-option>
        </el-option-group>
      </el-select>
    </div>
    <div class="form-item">
      <div class="form-label">创建时间</div>
      <div class="form-value">{{details.createTime}}</div>
    </div>
    <div class="form-item">
      <div class="form-label">最近更新</div>
      <div class="form-value">{{details.updateTime}}</div>
    </div>
    <div class="form-item desc">
      <div class="form-label">
        描述
        <el-tooltip content="此issue的详情描述信息" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <v-edit class="form-value" :content="details.desc" :uid="details.link" textType="textarea"></v-edit>
    </div>
    <div class="form-item remark">
      <div class="form-label">
        备注
        <el-tooltip content="此issue的备注信息" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <v-edit class="form-value" :content="details.remark" :uid="details.link" textType="textarea"></v-edit>
    </div>
  </div>
</template>
<script>
import { levelArr, pointsArr } from './storyConstant.js'

export default {
  data() {
    return {
      levelArr,
      pointsArr,
      details: {
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
    sprintdetailData: function(v) {
      if (v) {
        this.details = JSON.parse(JSON.stringify(v))
      }
    }
  },
  props: {
    sprintdetailData: [Object]
  },
  mounted() {
    // 非常消耗资源，卡顿
    this.addDraggleEvent();
  },
  methods: {
    addDraggleEvent() {
      let backlogDetailWrapper = document.getElementById('backlogDetailWrapper');
      let sprintDetailWrapper = document.getElementById('sprintDetailWrapper');
      let dragglePoint = document.getElementById('dragglePoint');

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
          el.target.setCapture && el.target.setCapture();
          window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);

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
  height: 100%;
  padding: 0 5px 0 15px;
  box-sizing: border-box;
  overflow-y: scroll;
  position: relative;
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
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    .link {
      .tag {
        text-indent: 4px;
      }
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
