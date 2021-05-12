<template>
  <el-dialog :visible.sync="visibleNewIssueDialog"
             :close-on-click-modal="false"
             :before-close="handleClose"
             :show-close="false"
             :append-to-body="true"
             :destroy-on-close="true"
             top="40px"
             custom-class="dialogNewIssus"
             width="800px"
             lock-scroll
             @opened="openedDialog">
    <h3 class="newissue-title">新增条例</h3>
    <el-form ref="newIssueRef"
             :model="newIssue"
             :rules="rules"
             label-width="70px"
             class="form-box"
             size="mini">
      <el-form-item label="概要"
                    prop="title">
        <el-input v-model="newIssue.title"
                  placeholder="请输入条例概要"
                  size="small"
                  maxlength="50"
                  show-word-limit
                  class="input-title"></el-input>
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
          <el-tooltip content="此issue处理的紧急程度，由低到高依次递增"
                      placement="top">
            <i class="el-icon-info info-icon"></i>
          </el-tooltip>
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
      position: relative;
      top: -4px;
      display: flex;
      align-items: center;
      justify-self: flex-start;
      .info-icon {
        margin-left: 6px;
        color: #c0c4cc;
      }
      .radio-line-level {
        position: relative;
        width: 38px;
        height: 6px;
        &:first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        &:last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }
    #newIssueDialogDescDom {
      height: 100px;
      overflow-y: scroll;
      border: 1px solid #dcdfe6;
      border-top: 0;
      border-radius: 4px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
  .el-dialog__footer {
    padding: 10px;
  }
  .newissue-title {
    height: 41px;
    margin: 0;
    padding: 10px 10px;
    overflow: hidden;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    background: #205081;
    border-bottom: 1px solid #e3e4e5;
  }
  .form-box {
    padding: 15px 20px;
    .input-title {
      width: 300px;
    }
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
