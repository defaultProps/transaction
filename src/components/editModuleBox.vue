<template>
  <div class="edit-mode-container"
       @click="handleClickEditModel">
    <div v-show="isEditMode"
         class="edit-mode">
      <el-input v-show="textType === 'text'"
                ref="inputLineNodeRef"
                v-model="value"
                :rows="10"
                class="input"
                size="mini"
                @blur="handleClickSubmit"></el-input>
      <div v-show="textType === 'textarea'"
           :id="`${typeDomId}-editModeRef`"
           class="textareaDetail"></div>
      <div class="save-options">
        <el-button :class="[saveIssueLoading ? 'saved' : '']"
                   size="mini"
                   @click.prevent.stop="handleClickSubmit()">
          <i :class="[saveIssueLoading ? 'el-icon-loading' : 'el-icon-check']"
             class="icon"></i>
        </el-button>
        <el-button size="mini"
                   icon="el-icon-close"
                   @click.prevent.stop="handleClickCencel()"></el-button>
      </div>
    </div>
    <div v-show="!isEditMode"
         class="text-mode-box">
      <div v-if="content"
           :class="[textType, 'content']">
        {{ content }}
      </div>
      <div v-else
           class="empty-text">
        暂无数据
      </div>
    </div>
  </div>
</template>
<script>
import Quill from 'quill'
import { QUILL_DETAIL_TOOLBAROPTIONS } from '@/libs/constant.js'
import { mapState } from 'vuex'
import { sprintAxios } from '@/axios'

export default {
  data() {
    return {
      isEditMode: false,
      inputTextValue: '',
      saveIssueLoading: false,
      quillObj: null
    }
  },
  watch: {
    'isEditMode'(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.textType === 'text' && this.$refs['inputLineNodeRef']) {
            this.$refs.inputLineNodeRef.focus()
            this.$refs.inputLineNodeRef.select()
          }

          if (this.textType === 'textarea' && document.getElementById(`${this.typeDomId}-editModeRef`) && !this.quillObj) {
            this.quillObj = new Quill(`#${this.typeDomId}-editModeRef`, QUILL_DETAIL_TOOLBAROPTIONS)
            this.quillObj.setText(this.activeIssue[this.typeDomId])
            this.$nextTick(() => {
              this.quillObj.focus()
            })

            let texearea = document.querySelector(`#${this.typeDomId}-editModeRef .ql-editor`)

            if (texearea) {
              texearea.addEventListener('blur', this.handleClickSubmit)
            }
          }
        })
      }
    }
  },
  created() {
    this.value = this.content
  },
  props: {
    textType: {
      type: String,
      default: 'text',
      required: false
    },
    content: {
      type: [String, Number],
      default: '',
      required: false
    },
    typeDomId: {
      type: String,
      default: '',
      required: true
    },
    doneCallback: {
      type: Function,
      default: function () { },
      required: false
    }
  },
  computed: mapState({
    activeIssue: state => state.sprint.activeIssue
  }),
  methods: {
    async handleClickSubmit() {
      this.saveIssueLoading = true

      let formmatValue = this.quillObj.getText().replace(/[\r\n]/g, "").replace(/\s+/g, "")
      let params = Object.assign({}, this.activeIssue, { [this.typeDomId]: formmatValue })

      sprintAxios.updateIssueData(params).then(hasUpdateData => {
        if (hasUpdateData) {
          this.$store.dispatch('sprint/updateIssueData', params)
          this.saveIssueLoading = false
          this.isEditMode = false
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleClickEditModel() {
      this.isEditMode = true
    },
    handleClickCencel() {
      this.isEditMode = false
      this.saveIssueLoading = false
      this.inputTextValue = ''
      this.quillObj.setContents('')
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-mode-container {
  position: relative;
  align-items: top;
  box-sizing: border-box;
  padding: 0;
  border: 1px solid transparent;
  border-top-left-radius: 4px;
  .textareaDetail {
    height: 100px;
    overflow-y: scroll;
  }
  .text-mode-box {
    padding: 0 2px;
    border: 1px solid transparent;
    .textarea {
      min-height: 50px;
    }
    &:hover {
      overflow: hidden;
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      cursor: pointer;
    }
    .content {
      padding: 2px 0 2px 2px;
    }
    .empty-text {
      height: 100px;
      color: #606266;
      line-height: 100px;
      text-align: center;
    }
  }
  .input-node {
    padding: 0 0 0 1px;
    .el-input__inner {
      height: 25px;
      padding: 0 0 0 3px;
      color: #172b4d;
      font-size: 14px;
      line-height: 25px;
      background: transparent;
      border: 0;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      border-bottom-right-radius: 0;
    }
    .el-textarea__inner {
      color: #172b4d;
      &:focus {
        border: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
  }
  .save-options {
    position: absolute;
    right: 0px;
    bottom: -25px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 50px;
    height: 25px;
    font-size: 14px;
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-top: 0;
    button {
      margin: 0;
      padding: 3px;
      font-size: 13px;
      background: rgba(0, 0, 0, 0.2);
    }
    .saved {
      color: #fff;
      background: #00875a;
    }
  }
}
</style>
