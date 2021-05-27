<template>
  <div class="markdown-ide">
    <div class="md-header-box">2</div>
    <div class="md-container">
      <div class="md-sidebar-box">
        <div id="IDERef"
             class="md-ide scroll-style-theme2"></div>
      </div>
      <div class="line-box"></div>
      <div class="md-main-box">
        3
      </div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill'
import { QUILL_TOOLBAROPTIONS } from '@/libs/constant.js'

export default {
  mounted() {
    this.initIDE()
  },
  methods: {
    initIDE() {
      this.$nextTick(() => {
        new Quill('#IDERef', QUILL_TOOLBAROPTIONS)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown-ide {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .md-header-box {
    width: 100%;
    height: 40px;
    background: #444;
  }
  .md-container {
    position: absolute;
    top: 40px;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .md-sidebar-box,
    .md-main-box {
      position: relative;
      width: calc(50% - 20px);
      height: 100%;
      .md-ide {
        width: 100%;
        height: 530px;
        overflow: hidden;
      }
      // 滚动条样式
      .scroll-style-theme2::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      //滚动条的滑块
      .scroll-style-theme2::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      // 滚动条样式
      .scroll-style-theme1::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      //滚动条的滑块
      .scroll-style-theme1::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      //滚动条的宽度
      ::-webkit-scrollbar {
        position: relative;
        right: -10px;
        width: 10px;
        height: 10px;
        background-color: #e8e8ea;
      }
      //滚动条的滑块
      ::-webkit-scrollbar-thumb {
        background-color: #c0c4cc;
      }
      ::-webkit-scrollbar-track-piece {
        background-color: transparent;
      }
    }
    .line-box {
      width: 40px;
      height: 100%;
      background: #dcdfe6;
    }
  }
}
</style>
