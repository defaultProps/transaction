<template>
  <div id="uxo-edit" @click="hc_edit">
    <div v-if="editMode" class="edit-mode">
      <el-form @submit.native="handleClickSubmit()">
        <el-input v-show="textType === 'text'" v-model="value" @blur="blur" class="input" :rows="10" ref="inputNode"></el-input>
        <div v-show="textType === 'textarea'">
          <vue-tinymce v-model="value" :setup="setup" @blur="blur" :setting="setting" />
        </div>
      </el-form>
      <div class="save-options">
        <el-button size="mini" @click.prevent.stop="handleClickSubmit()" :class="[loading ? 'saved' : '']"><i class="icon" :class="[loading ? 'el-icon-loading' : 'el-icon-check']"></i></el-button>
        <el-button size="mini" @click.prevent.stop="handleClickCencel()" icon="el-icon-close"></el-button>
      </div>
    </div>
    <div v-else class="info">
      <span class="content" v-html="content"></span>
      <span class="edit-wrap">
        <i class="icon-writefill iconfont"></i>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      editMode: false,
      value: '',
      loading: false,
      cencelBtnCick: false,
      descContentHTML: "",
      setting: {
        menubar: false,
        toolbar: "undo redo | fullscreen | alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: "link image media table lists fullscreen quickbars",
        language: 'zh_CN',
        height: 450
      }
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

        this.loading = true;
        await this.cb()
        setTimeout(() => {
          this.loading = false;
          this.editMode = false;
        }, 300);
      }, 100)
    },
    async handleClickSubmit () {
      this.cencelBtnCick = false;
      this.loading = true;
      await this.cb()
      setTimeout(() => {
        this.loading = false;
        this.editMode = false;
      }, 300);
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
<style lang="scss">
#uxo-edit {
  padding: 0;
  box-sizing: border-box;
  border: 1px solid transparent;
  position: relative;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  align-items: top;
  position: relative;
  .info {
    display: flex;
    justify-content: space-between;
    align-items: top;
    border: 1px solid transparent;
    &:hover {
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      overflow: hidden;
      .edit-wrap {
        visibility: visible;
        color: #3f4441;
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
  .input {
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
    font-size: 16px;
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
