<template>
  <div class="edit-mode-container"
       @click="hc_edit">
    <div v-if="editMode"
         class="edit-mode">
      <el-form @submit.native="handleClickSubmit()">
        <el-input v-show="textType === 'text'"
                  ref="inputNode"
                  v-model="value"
                  :rows="10"
                  class="input"
                  size="mini"
                  @blur="blur"></el-input>
        <div v-show="textType === 'textarea'">
          <!-- <vue-tinymce v-model="value"
                       :setup="setup"
                       :setting="setting"
                       @blur="blur" /> -->
        </div>
      </el-form>
      <div class="save-options">
        <el-button :class="[loading ? 'saved' : '']"
                   size="mini"
                   @click.prevent.stop="handleClickSubmit()">
          <i :class="[loading ? 'el-icon-loading' : 'el-icon-check']"
             class="icon"></i>
        </el-button>
        <el-button size="mini"
                   icon="el-icon-close"
                   @click.prevent.stop="handleClickCencel()"></el-button>
      </div>
</template>
    <div v-else
         class="text-mode-box">
      <div v-if="content"
           class="content">{{ content }}</div>
      <div v-else
           class="empty-text">暂无数据</div>
    </div>
  </div>
</template>
<script>
import Wangeditor from "wangeditor"

export default {
  data () {
    return {
      editorWangEditor: null,
      editMode: false,
      inputTextValue: '',
      loading: false,
      cencelBtnCick: false,
      descContentHTML: ""
    }
  },
  watch: {
    'editMode' (newVal) {
      if (newVal && this.textType === 'text') {
        this.$nextTick(() => {
          this.$refs.inputNode.focus()
          this.$refs.inputNode.select()
        })
      }
    },
    'uid' () {
      this.editMode = false;
    },
    'content' (v) {
      this.value = v;
    }
  },
  created () {
    this.value = this.content
  },
  props: {
    uid: [String],
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
    cb: {
      type: Function,
      default: function () { },
      required: false
    }
  },
  methods: {
    setup (editor) {

    },
    editorChange (v) {

    },
    blur () {
      setTimeout(async () => {
        if (this.cencelBtnCick) {
          return
        }

        this.loading = true
        await this.cb()
        setTimeout(() => {
          this.loading = false
          this.editMode = false
        }, 300)
      }, 100)
    },
    async handleClickSubmit () {
      this.cencelBtnCick = false;
      this.loading = true;
      await this.cb()
      setTimeout(() => {
        this.loading = false
        this.editMode = false
      }, 300)
    },
    hc_edit () {
      this.editMode = true;
    },
    handleClickCencel () {
      this.cencelBtnCick = true;
      this.editMode = false;
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
  .text-mode-box {
    padding: 0 2px;
    border: 1px solid transparent;
    &:hover {
      overflow: hidden;
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      overflow: hidden;
      cursor: pointer;
    }
    .content {
      padding: 2px 0 2px 2px;
    }
    .empty-text {
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #606266;
    }
  }
  .input-node {
    padding: 0 0 0 1px;
    .el-input__inner {
      padding: 0 0 0 3px;
      border: 0;
      height: 25px;
      line-height: 25px;
      color: #172b4d;
      font-size: 14px;
      background: transparent;
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
    font-size: 14px;
    position: absolute;
    right: 0px;
    bottom: -25px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-top: 0;
    height: 25px;
    width: 50px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: space-around;
    button {
      padding: 3px;
      margin: 0;
      font-size: 13px;
      background: rgba(0, 0, 0, 0.2);
    }
    .saved {
      background: #e6a23c;
      color: #fff;
    }
  }
}
</style>
