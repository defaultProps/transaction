<template>
  <div v-if="dialogTableVisible"
       id="dialogNewIssus">
    <el-dialog :visible.sync="dialogTableVisible"
               :close-on-click-modal="false"
               :before-close="handleClose"
               :show-close="false"
               :append-to-body="true"
               size="mini"
               top="40px"
               custom-class="dialogNewIssus"
               width="50%">
      <h3 class="newissue-title">问题详情</h3>
      <el-form ref="form"
               :model="issueForm"
               :rules="rules"
               label-width="80px"
               class="form"
               size="small">
        <el-form-item label="问题类型"
                      class="form-item">
          <el-tooltip content="工作不全是生活，生活也不全是工作。"
                      placement="top">
            <i class="el-icon-info"></i>
          </el-tooltip>
          <el-select v-model="issueForm.type"
                     placeholder="请选择"
                     size="small"
                     class="select-item">
            <el-option v-for="v in progressStateList"
                       :key="v.name"
                       :label="v.label"
                       :value="v.value">
              <i :class="[v.icon]"
                 :style="{'color': v.color}"
                 class="iconfont"></i>
              {{v.label}}
            </el-option>
          </el-select>
          <div class="icon-prex">
            <i :class="[issueForm.typeIcon]"
               :style="{'color': issueForm.typeColor}"
               class="iconfont"></i>
          </div>
        </el-form-item>
        <el-form-item label="概要"
                      prop="name">
          <el-input v-model="issueForm.name"
                    placeholder="请输入概要"
                    size="small"
                    maxlength="50"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="模块类型"
                      prop="moduleType">
          <el-select v-model="issueForm.moduleType"
                     placeholder="请选择"
                     size="small"
                     class="select-item">
            <el-option v-for="v in moduleList"
                       :key="v.link"
                       :label="v.name"
                       :value="v.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紧急度"
                      prop="level">
          <el-select v-model="issueForm.level"
                     placeholder="请选择"
                     size="small"
                     class="select-item">
            <el-option-group v-for="group in levelArr"
                             :key="group.label"
                             :label="group.label">
              <el-option v-for="item in group.options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="描述"
                      prop="desc">
          <el-input v-model="issueForm.desc"
                    type="textarea"
                    placeholder="此Issue的详细描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="handleClose()">取 消</el-button>
        <el-button type="primary"
                   size="small"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { levelArr, pointsArr } from './storyConstant.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      levelArr,
      pointsArr,
      rules: {
        name: [
          { message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        moduleType: [
          { message: '请选择模块类型', trigger: 'change' }
        ]
      },
      issueForm: {
        moduleType: '',
        name: '',
        link: '',
        type: '',
        typeIcon: '',
        typeColor: '',
        level: '3',
        title: '',
        fixed: '',
        progressState: '',
        tag: { name: '', link: '' }
      }
    }
  },
  props: {
    dialogTableVisible: Boolean
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
  computed: mapState({
    moduleList: state => state.story.moduleList,
    progressStateList: state => state.story.progressStateList
  }),
  methods: {
    handleClose() {
      this.$emit('handleClose')
    }
  }
}
</script>
<style lang="scss">
.dialogNewIssus {
  .el-dialog__header {
    display: none;
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .newissue-title {
    font-size: 16px;
    font-weight: 600;
    padding: 10px 10px;
    margin: 0;
    border-bottom: 1px solid #e3e4e5;
  }
  .form {
    padding: 10px;
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
}
</style>
