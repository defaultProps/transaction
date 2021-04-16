<template>
  <div v-if="visibleDialogModule"
       id="dialogNewIssus">
    <el-dialog :visible.sync="visibleDialogModule"
               :close-on-click-modal="false"
               :append-to-body="true"
               :before-close="handleClose"
               :show-close="false"
               size="mini"
               title="模块设置"
               width="40%">
      <div class="module-container"></div>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   size="small"
                   @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { levelList, pointsArr, modulesList, issusTypeArr } from './storyConstant.js'

export default {
  data() {
    return {
      issusTypeArr,
      levelList,
      modulesList,
      pointsArr
    }
  },
  props: {
    visibleDialogModule: Boolean
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
