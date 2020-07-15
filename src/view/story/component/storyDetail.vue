<template>
  <div id="sprint-detail">
    <div class="header">
      <div class="link">
        <router-link tag="a" v-show="details.tag" :to="details.tag.link" class="tag">{{details.tag.name}}</router-link> /
        <router-link tag="a" :to="`/story/${details.link}`" :class="[details.status]">{{details.link}}</router-link>
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
        <el-option-group v-for="group in options" :key="group.label" :label="group.label">
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
        <el-option v-for="v in optionsPoints" :key="v" :label="v" :value="v"></el-option>
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
    <div class="line"></div>
    <div class="form-item desc">
      <div class="form-label">
        描述
        <el-tooltip content="此issue的详情描述信息" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <v-edit class="form-value" :content="details.desc" :uid="details.link" textType="textarea"></v-edit>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [
          {
            label: '不紧急',
            options: [
              {
                value: 'ignore',
                label: '1'
              },
              {
                value: 'delay',
                label: '2'
              }
            ]
          },
          {
            label: '一般',
            options: [
              {
                value: 'glance',
                label: '3'
              },
              {
                value: 'lookup',
                label: '4'
              }
            ]
          },
          {
            label: '紧急',
            options: [
              {
                value: 'gaze',
                label: '5'
              },
              {
                value: 'urgent',
                label: '6'
              }
            ]
          }
        ],
        optionsPoints: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    margin: 3px 0;
  }
  .form-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 35px;
    &.item-top {
      margin-top: 15px;
    }
    &.desc {
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
  .line {
    border-top: 1px solid rgba(0,0,0,0.2);
    width: 100%;
    margin-top: 10px;
  }
}
</style>
