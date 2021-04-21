<template>
  <div id="wang-editor-box"
       @click="handleClickEditorRow">
    <template v-if="editMode">
      <el-input v-show="textType === 'text'"
                ref="inputNodeRef"
                v-model="inputTextValue"
                :rows="10"
                class="input-node"
                @blur="blurInputText"></el-input>
      <div v-show="textType === 'textarea'"
           id="text-area-editor-box"></div>
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
         class="info">
      {{ content }}
      <span class="edit-wrap">
        <i class="icon-writefill iconfont"></i>
      </span>
    </div>
  </div>
</template>
<script>
import Wangeditor from "wangeditor"

export default {
  data() {
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
    'editMode'(val) {
      if (val) {
        if (this.textType === 'text') {
          this.$nextTick(() => {
            this.$refs.inputNodeRef.focus()
            this.$refs.inputNodeRef.select()
          })
        }
        if (this.textType === 'textarea' && this.editorWangEditor) {
          this.$nextTick(() => {
            // this.editorWangEditor.config.height = 100
            this.editorWangEditor.create()
            console.log(this.content)
            this.editorWangEditor.txt.html(this.content)
          })
        }
      }
    },
    'uid'() {
      this.editMode = false
    },
    'content'(v) {
      this.inputTextValue = v
    }
  },
  created() {
    this.inputTextValue = this.content
  },
  mounted() {
    this.editorWangEditor = new Wangeditor('#text-area-editor-box')

    this.editorWangEditor.config.menus = ['bold', 'head', 'link', 'italic', 'underline']
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
    setup(editor) {

    },
    editorChange(v) {

    },
    blurInputText() {
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
    async handleClickSubmit() {
      this.cencelBtnCick = false
      this.loading = true
      await this.cb()
      setTimeout(() => {
        this.loading = false
        this.editMode = false
      }, 300)
    },
    // 点击 - 默认开启编辑模式
    handleClickEditorRow() {
      this.editMode = true
    },
    handleClickCencel() {
      this.cencelBtnCick = true
      this.editMode = false
    }
  }
}
</script>
<style lang="scss" scoped>
#wang-editor-box {
  position: relative;
  align-items: top;
  box-sizing: border-box;
  padding: 0;
  border: 1px solid transparent;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  #text-area-editor-box {
    width: 100%;
    min-height: 100px;
    border: 1px solid #c0c4cc;
    border-radius: 3px;
  }
  .info {
    display: flex;
    align-items: top;
    justify-content: space-between;
    border: 1px solid transparent;
    &:hover {
      overflow: hidden;
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      .edit-wrap {
        color: #3f4441;
        visibility: visible;
      }
    }
    .content {
      padding: 2px 0 2px 2px;
    }
    .edit-wrap {
      background: rgba(0, 0, 0, 0.2);
      color: rgba(0, 0, 0, 1);
      display: inline-block;
      width: 35px;
      text-align: center;
      padding: 2px 0;
      cursor: pointer;
      box-sizing: border-box;
      visibility: hidden;
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
