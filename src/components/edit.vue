<template>
  <div id="uxo-edit" @click="hc_edit">
    <div v-if="editMode" v-show="editMode">
      <el-input v-model="val" class="input" size="mini"></el-input>
      <div class="save-options">
        <el-button size="mini" @click.prevent.stop="hc_submit()"><i class="icon" :class="[loading ? 'el-icon-loading' : 'el-icon-check']"></i></el-button>
        <el-button size="mini" @click.prevent.stop="hc_cencel()" icon="el-icon-close"></el-button>
      </div>
    </div>
    <div v-else class="info">
      <span class="content">{{content}}</span>
      <span class="edit-wrap">
        <i class="el-icon-edit"></i>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editMode: false,
      val: '',
      loading: false
    }
  },
  created() {
    this.val = this.content
  },
  props: {
    content: {
      type: String,
      default: '',
      required: false
    },
    cb: {
      type: Function,
      default: function() {},
      required: false
    }
  },
  methods: {
    async hc_submit() {
      this.loading = true;
      await this.cb()
      setTimeout(() => {
        this.loading = false;
        this.editMode = false;
      }, 1000);
    },
    hc_edit() {
      this.editMode = true;
    },
    hc_cencel() {
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
      background: #fff;
      border: 1px solid rgba(0, 0, 0, 0.2);
      .edit-wrap {
        visibility: visible;
      }
    }
    .content {
      padding: 2px 10px 2px 2px;
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
    height: 25px;
    line-height: 25px;
    .el-input__inner {
      padding: 0 0 0 3px;
      border: 0;
      height: 25px;
      line-height: 25px;
      border-radius: 0;
      color: #172b4d;
      border: 1px solid rgba(0, 0, 0, 0.2);
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
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    button {
      padding: 3px;
      margin: 0;
      font-size: 13px;
      background: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
