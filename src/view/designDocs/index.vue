<template>
  <div class="design-docs-container">
    <div class="sidebar-box scroll-style-none">
      <div class="content-block">
        <div class="header-block"
             @click="visibleComponentDesignDocs = !visibleComponentDesignDocs">
          事务面板
          <i :class="[visibleComponentDesignDocs ? 'el-icon-arrow-down' : 'el-icon-arrow-right']"></i>
        </div>
        <template v-if="visibleComponentDesignDocs">
          <ul v-for="item in TODO_LIST_FUNCTION_DOCS"
              :key="item.title"
              class="scroll-style-none">
            <li @click="handleClickLocation(item.value)"> {{ item.label }}</li>
          </ul>
        </template>
      </div>
    </div>
    <div class="main-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { TODO_LIST_FUNCTION_DOCS } from '@/libs/constant.js'

export default {
  data() {
    return {
      TODO_LIST_FUNCTION_DOCS,
      visibleComponentDesignDocs: true // 是否显示事务面板文档
    }
  },
  methods: {
    handleClickLocation(name) {
      this.$router.push(`/design-docs/${name}`)
    }
  }
}
</script>
<style lang="scss">
.design-docs-container {
  .el-collapse-item__header {
    height: 34px;
    padding: 3px 7px 3px 10px;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    line-height: 34px;
    background: #3282b8;
    user-select: none;
  }
  .el-collapse-item__content {
    padding: 0;
    background: #f5f5f5;
  }
}
</style>
<style lang="scss" scoped>
.design-docs-container {
  position: fixed;
  top: 40px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  background: #f5f5f5;
  .sidebar-box {
    position: relative;
    top: -1px;
    width: 200px;
    height: 100%;
    overflow-y: scroll;
    border-right: 1px solid #dcdfe6;
    .content-block {
      .header-block {
        position: sticky;
        top: -1px;
        z-index: 200;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        height: 34px;
        padding: 3px 5px 3px 10px;
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        background: #3282b8;
        cursor: pointer;
        user-select: none;
        &:hover {
          background: #205081;
        }
        i {
          font-size: 12px;
        }
      }
      ul {
        .sub-title {
          height: 30px;
          color: #999;
          font-size: 12px;
          line-height: 30px;
          text-indent: 10px;
        }
        li {
          height: 30px;
          color: #666;
          font-size: 14px;
          line-height: 30px;
          text-indent: 25px;
          cursor: pointer;
          &:hover {
            background: #e4e7ed;
          }
        }
      }
    }
  }
  .main-box {
    flex: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
