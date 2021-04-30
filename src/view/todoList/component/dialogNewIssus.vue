<template>
  <el-dialog :visible.sync="visibleNewIssueDialog"
             :close-on-click-modal="false"
             :before-close="handleClose"
             :show-close="false"
             :append-to-body="true"
             :destroy-on-close="true"
             top="40px"
             custom-class="dialogNewIssus"
             width="900px"
             lock-scroll
             @opened="openedDialog">
    <h3 class="newissue-title">问题详情</h3>
    <el-form ref="newIssueRef"
             :model="newIssue"
             :rules="rules"
             label-width="70px"
             class="form">
      <el-form-item label="概要"
                    prop="title">
        <el-input v-model="newIssue.title"
                  placeholder="请输入条例概要"
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
          <el-option v-for="item in moduleList"
                     :key="item.link"
                     :label="item.name"
                     :value="item.name"></el-option>
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
        <div id="newIssueDialogDescDom"
             class="scroll-theme-1"></div>
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
import Quill from 'quill'
import { QUILL_TOOLBAROPTIONS } from '@/libs/constant.js'

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
        type: 'life',
        level: '3'
      }
    }
  },
  computed: mapState({
    visibleNewIssueDialog: state => state.sprint.visibleNewIssueDialog,
    moduleList: state => state.story.moduleList,
    issueTypeList: state => state.sprint.issueTypeList
  }),
  mounted() {

  },
  methods: {
    handleClose() {
      this.$refs.newIssueRef.resetFields()
      this.$store.commit('sprint/VISIBLE_NEWISSUE_DIALOG', false)
    },
    openedDialog() {
      this.$nextTick(() => {
        new Quill('#newIssueDialogDescDom', QUILL_TOOLBAROPTIONS)
      })
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
    #newIssueDialogDescDom {
      height: 100px;
      overflow-y: scroll;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
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
