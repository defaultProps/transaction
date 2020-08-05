<template>
  <div id="dialogNewIssus" v-if="dialogTableVisible">
    <el-dialog
      :visible.sync="dialogTableVisible"
      size="mini"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :show-close="false"
      width="40%"
    >
      <div class="dialog-header">
        <div class="title">创建问题</div>
      </div>
      <el-form
        ref="form"
        :model="issueForm"
        label-width="80px"
        :rules="rules"
        class="form"
        size="small"
      >
        <el-form-item label="问题类型" prop="name" class="form-item">
          <el-tooltip content="工作不全是生活，生活也不全是工作。" placement="top">
            <i class="el-icon-info"></i>
          </el-tooltip>
          <el-select
            v-model="issueForm.type"
            placeholder="请选择"
            size="small"
            class="select-item"
          >
            <el-option
              v-for="v in issusTypeArr"
              :key="v.name"
              :label="v.label"
              :value="v.value"
            >
              <i class="iconfont" :class="[v.icon]" :style="{'color': v.color}"></i>
              {{v.label}}
            </el-option>
          </el-select>
          <div class="icon-prex"><i class="iconfont" :class="[issueForm.typeIcon]" :style="{'color': issueForm.typeColor}"></i></div>
        </el-form-item>
        <el-form-item label="概要" prop="name">
          <el-input v-model="issueForm.name" placeholder="请输入概要" size="small"></el-input>
        </el-form-item>
        <el-form-item label="模块类型" prop="moduleType">
          <el-select v-model="issueForm.moduleType" placeholder="请选择" size="small" class="select-item">
            <el-option v-for="v in modulesList" :key="v.name" :label="v.name" :value="v.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紧急度" prop="level">
          <el-select
            v-model="issueForm.level"
            placeholder="请选择"
            size="small"
            class="select-item"
          >
            <el-option-group
              v-for="group in levelArr"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="预估" prop="point">
          <el-select
            v-model="issueForm.point"
            placeholder="请选择"
            size="small"
            class="select-item"
          >
            <el-option v-for="v in pointsArr" :key="v" :label="v" :value="v"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" :rows="5" placeholder="此Issue的详细描述" v-model="issueForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { levelArr, pointsArr, modulesList, issusTypeArr } from './storyConstant.js'
export default {
  props: {
    dialogTableVisible: Boolean
  },
  data() {
    return {
      issusTypeArr,
      levelArr,
      modulesList,
      pointsArr,
      rules: {
        name: [
          { required: true, message: '请输入标题', trigger: 'submit' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'submit' }
        ],
        moduleType: [
          { required: true, message: '请选择模块类型', trigger: 'change' }
        ],
        point: [
          { required: false, message: '请预估点数', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写描述信息', trigger: 'submit' }
        ]
      },
      issueForm: {
        moduleType: '',
        name: '',
        link: '',
        type: issusTypeArr[0].value,
        typeIcon: issusTypeArr[0].icon,
        typeColor: issusTypeArr[0].color,
        level: '3',
        title: '',
        fixed: '',
        progressState: '',
        tag: {name: '', link: ''},
        point: ''
      }
    }
  },
  watch: {
    'issueForm.type'(p) {
      this.issusTypeArr.forEach(v => {
        if (v.value === p) {
          this.issueForm.typeIcon = v.icon;
          this.issueForm.typeColor = v.color;
        }
      })
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    }
  }
}
</script>
<style lang="scss">
#dialogNewIssus {
  .form {
    padding-top: 10px;
    .form-item {

      .select-item {
        width: 100px;
        .el-input__inner {
          text-indent: 10px;
          background: #ebecf0;
        }
      }
      .icon-prex {
        position: absolute;
        left: 25px;
        top: 0;
      }
    }
  }
  .dialog-header {
    padding: 10px;
    display: flex;
    border-bottom: 2px solid #ebecf0;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 18px;
    }
  }

  .el-dialog__wrapper {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0 10px;
    }
  }
}
</style>
