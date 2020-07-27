<template>
  <div id="sprint-detail">
    <div class="header">
      <div class="link">
        <router-link tag="a" v-show="details.tag" :to="details.tag.link" class="tag">{{details.tag.name}}</router-link> /
        <router-link tag="a" :to="`/story/${details.link}`" class="tag">{{details.link}}</router-link>
        </div>
      <el-button type="text" icon="el-icon-close" class="btn-del" @click="hc_closeDetail()"></el-button>
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
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-option-group>
      </el-select>
    </div>
    <div class="form-item">
      <div class="form-label">
        预估
        <el-tooltip content="此issue的耗时时间，取预估值，数值越大，耗时越长" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <el-select v-model="details.points" placeholder="请选择" size="mini" class="select-point">
        <el-option v-for="v in pointsArr" :key="v" :label="v" :value="v"></el-option>
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
      <v-edit class="form-value" :content="details.desc" :uid="details.link" textType="textarea"></v-edit>
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
    'sprintdetailData': function(v) {
      if (v) {
        this.details = JSON.parse(JSON.stringify(v))
      }
    }
  },
  props: {
    sprintdetailData: [Object]
  },
  filters: {
    filterLevel(v) {
      console.log(v)
      if (v <= 2) {
        return 'unhurry'
      } else if (v <= 4) {
        return 'general'
      } else {
        return 'urgent'
      }
    }
  },
  created() {
    if (this.sprintdetailData) {
      this.details = {
        ...this.details,
        ...JSON.parse(JSON.stringify(this.sprintdetailData))
      }
    }
  },
  methods: {
    hc_closeDetail() {
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
  font-size: 14px;
  color: #172b4d;
  padding: 0 0 10px 10px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
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
    .select-point {
      width: 64px;
    }
  }
}
</style>
