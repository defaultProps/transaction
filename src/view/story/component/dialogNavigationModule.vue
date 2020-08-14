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
</style>
