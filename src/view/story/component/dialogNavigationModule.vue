<template>
  <div id="dialogNewIssus" v-if="visibleDialogModule">
    <el-dialog
      :visible.sync="visibleDialogModule"
      size="mini"
      title="模块设置"
      :close-on-click-modal="false"
      :append-to-body="true"
      :before-close="handleClose"
      :show-close="false"
      width="40%">
      <div class="module-container">

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="handleClose" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { levelArr, pointsArr, modulesList, issusTypeArr } from './storyConstant.js'
export default {
  props: {
    visibleDialogModule: Boolean
  },
  data() {
    return {
      issusTypeArr,
      levelArr,
      modulesList,
      pointsArr
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('closeVisibleDialogModule')
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
