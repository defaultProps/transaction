<template>
  <div id="dialog-content">
    <template>
      <el-dialog
        title="数据选择"
        :visible.sync="dialogVisible"
        width="45%"
        style="text-algin: center"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :show-close="false">
        <div class="content-sql">
          <el-button size="mini" @click="hc_selectDataBase('mock')">Mock数据</el-button>
          <el-button size="mini" @click="hc_selectDataBase('indexedDB')">indexedDB存储</el-button>
          <el-button size="mini" @click="hc_selectDataBase('MySQL')">MySQL存储</el-button>
        </div>
        <div class="explain">
          <div class="ex-mock">* Mock数据主要是用于该网站主要功能的展示性，不支持存储信息，所有用户操作均在刷新后重置。（默认模式）</div>
          <div class="ex-indexeddb">* indexedDB主要是开发者减少成本，数据直接存储浏览器的一种方式。（强烈建议）。</div>
          <div class="ex-mysql">* MySQL存储，常规操作， 但是需要money搭建远程服务器。没钱~ （暂不支持且永不支持）</div>
        </div>
      </el-dialog>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: true,
      activeStep: null
    }
  },
  methods: {
    hc_selectDataBase(saveType) {
      this.activeStep = 'start-animation'
      setTimeout(() => {
        this.dialogVisible = false
      }, 5000);
    }
  }
}
</script>
<style lang="scss">
#dialog-content {
  .el-dialog__header {
    text-align: center;
  }
  .content-sql {
    display: flex;
    justify-content: space-around;
    align-content: center;
  }
  .explain{
    margin-top: 15px;
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
