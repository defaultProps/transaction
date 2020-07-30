<template>
  <div id="dialog-content">
    <template>
      <el-dialog title="存储状态"
                 :visible="dialogVisible"
                 width="45%"
                 custom-class="dialog-blur"
                 style="text-algin: center"
                 :close-on-press-escape="false"
                 :close-on-click-modal="false"
                 :show-close="false">
        <div class="current-storage">当前存储: {{currentStorageFn()}}</div>
        <div class="content-sql">
          <el-button size="mini" @click="hc_selectDataBase('mock')" :disabled="hasDisabledClickOtherBtn">Mock数据</el-button>
          <el-button size="mini" @click="hc_selectDataBase('indexedDB')" v-loading="indexDBLoading" :disabled="hasDisabledClickOtherBtn">indexedDB存储</el-button>
          <el-button size="mini" @click="hc_selectDataBase('websql')" v-loading="websqlLoading" :disabled="hasDisabledClickOtherBtn">WebSQL存储</el-button>
          <el-button size="mini" @click="hc_selectDataBase('cloudServer')" v-loading="cloudServerLoading" :disabled="hasDisabledClickOtherBtn">云服务器存储</el-button>
        </div>
        <div class="explain">
          <div class="ex-mock">* Mock数据主要是用于该网站主要功能的展示性，不支持存储信息，所有用户操作均在刷新后重置。<strong>（演示专用）</strong></div>
          <div class="ex-indexeddb">* indexedDB是目前主流的一种客户端存储技术，兼容性强、响应速度较快。<strong>（强烈推荐）</strong></div>
          <div class="ex-Websql">* Web SQL存储兼容性差，目前只支持chrome和Edge浏览器。<strong>（开发练习，不建议使用）</strong></div>
          <div class="cloudserver">* 云服务器存储，常规操作， 但是需要money搭建远程服务器。 <strong>（需个人配置）</strong></div>
        </div>
        <div class="implementSteps">

        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClickCancel()" size="mini" :disabled="hasDisabledClickOtherBtn">取 消</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>
<script>
const STORAGEMEYHODS = [
  {value: 'mock', label: 'Mock数据'},
  {value: 'indexdb', label: 'indexedDB数据'},
  {value: 'websql', label: 'Web SQL存储'},
  {value: 'cloudserver', label: '云服务器存储'}
];
export default {
  data() {
    return {
      STORAGEMEYHODS,
      activeStep: null,
      mockLoading: false,
      indexDBLoading: false,
      websqlLoading: false,
      cloudServerLoading: false,
      currentStorage: 'mock'
    }
  },
  props: {
    dialogVisible: Boolean
  },
  watch: {
    dialogVisible: function(v) {
      if (v) {
        this.styleFilterContent();
      }
    }
  },
  computed: {
    hasDisabledClickOtherBtn() {
      return this.mockLoading || this.indexDBLoading || this.cloudServerLoading || this.websqlLoading
    }
  },
  methods: {
    currentStorageFn() {
      let result = ''

      this.STORAGEMEYHODS.forEach(p => {
        if (p.value === this.currentStorage) {
          result = p.label
        }
      })
      return result;
    },
    styleFilterContent(blur = true) {
      let dom = document.getElementById('storyBacklog')

      if (dom) {
        dom.style.filter = blur ? 'blur(3px)' : 'none'
      }
    },
    handleClickCancel() {
      this.styleFilterContent(false)
      this.$emit('update:dialogVisible', false)
    },
    hc_selectDataBase(saveType) {
      this.activeStep = 'start-animation'
      this.styleFilterContent()
      this.mockLoading = true;

      setTimeout(() => {
        this.styleFilterContent(false)
        this.mockLoading = false
        this.$emit('update:dialogVisible', false)
      }, 2000)
    }
  }
}
</script>
<style lang="scss">
#dialog-content {
  .el-dialog__header {
    text-align: center;
    margin-bottom: 0;
  }
  .el-dialog__body {
    padding: 10px 20px 15px;
  }
  .el-dialog__footer {
    padding: 0 20px 10px;
  }
  .current-storage {
    font-size: 12px;
    text-align: center;
    margin: 0 0 10px;
    padding-bottom: 10px;
    box-shadow: 0 3px 3px -3px rgba(0, 0, 0, 0.2);
  }
  .content-sql {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
    align-content: center;
  }
  .implementSteps {
    width: 100%;
    height: 100px;
    margin-top: 5px;
    background: rgba(0, 0, 0, 0.1);
  }
  .explain{
    margin-top: 12px;
    font-size: 12px;
    line-height: 20px;
    strong {
      font-size: 600;
    }
  }
}
</style>
