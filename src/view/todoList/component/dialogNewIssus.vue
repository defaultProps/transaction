<template>
  <el-dialog :visible.sync="visibleNewIssueDialog"
             :close-on-click-modal="false"
             :before-close="handleClose"
             :show-close="false"
             :append-to-body="true"
             top="50px"
             custom-class="dialogNewIssus"
             width="800px">
    <h3 class="newissue-title">问题详情</h3>
    <el-form :model="newIssue"
             :rules="rules"
             label-width="70px"
             class="form">
      <el-form-item label="概要"
                    prop="name">
        <el-input v-model="newIssue.name"
                  placeholder="请输入条例概要，比如：#锻炼 | "
                  size="small"
                  maxlength="50"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="条例类型"
                    class="form-item">
        <el-radio-group v-model="newIssue.type"
                        size="small">
          <el-radio-button v-for="item in issueTypeList"
                           :key="item.value"
                           :label="item.value"
                           :value="item.value">{{ item.label }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="模块类型"
                    prop="moduleType">
        <el-select v-model="newIssue.moduleType"
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
        <el-radio-group v-model="newIssue.level"
                        size="small">
          <el-radio-button v-for="item in LEVEL_LIST"
                           :key="item.label"
                           :label="item.label"
                           :value="item.label">{{ item.label }}</el-radio-button>
        </el-radio-group>
        <div class="radio-line-box">
          <div v-for="item in LEVEL_LIST"
               :key="item.label"
               :style="{'background': item.color }"
               class="radio-line-level"></div>
        </div>
      </el-form-item>
      <el-form-item label="描述"
                    prop="desc">
        <el-input v-model="newIssue.desc"
                  type="textarea"
                  placeholder="此Issue的详细描述"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button size="small"
                 @click="handleClose()">取 消</el-button>
      <el-button type="primary"
                 size="small"
                 @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { LEVEL_LIST, pointsArr } from './storyConstant.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      LEVEL_LIST,
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
      newIssue: {
        moduleType: '',
        name: '',
        link: '',
        type: 'life',
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
  computed: mapState({
    visibleNewIssueDialog: state => state.sprint.visibleNewIssueDialog,
    moduleList: state => state.story.moduleList,
    issueTypeList: state => state.sprint.issueTypeList
  }),
  methods: {
    handleClose() {
      this.$store.commit('sprint/VISIBLE_NEWISSUE_DIALOG', false)
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
    .radio-line-box {
      display: flex;
      align-items: center;
      justify-self: flex-start;
      .radio-line-level {
        position: relative;
        top: -3px;
        width: 38px;
        height: 2px;
      }
    }
  }
  .el-dialog__footer {
    padding: 10px;
  }
  .newissue-title {
    margin: 0;
    padding: 10px 10px;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    background: #205081;
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
        top: 0;
        left: 25px;
      }
    }
  }
}
</style>
