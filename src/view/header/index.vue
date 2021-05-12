<template>
  <div class="header-container">
    <div class="header-logo">
      <img src="../../../static/image/logo.png"
           class="logo">
      <span class="title">TRANSACTION</span>
      <ul class="bubbles">
        <li v-for="v of Array(15)"
            :key="v"></li>
      </ul>
    </div>
    <el-menu :default-active="activeIndex"
             size="mini"
             class="el-menu-demo"
             mode="horizontal"
             router
             background-color="#205081"
             text-color="#fff"
             active-text-color="#ffab00">
      <template v-for="menu in HEADER_MENU_BAR_LIST">
        <el-submenu v-if="menu.children"
                    :key="menu.link"
                    :index="menu.link">
          <template slot="title">
            <i v-if="menu.icon"
               :class="menu.icon"></i>
            {{ menu.name }}
          </template>
          <el-menu-item v-for="item in menu.children"
                        :key="item.link"
                        :index="item.link">
            <i v-if="item.icon"
               :class="item.icon"></i>
            {{ item.name }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else
                      :key="menu.title"
                      :index="menu.link">
          <i v-if="menu.icon"
             :class="menu.icon"></i>
          {{ menu.name }}
        </el-menu-item>
      </template>
    </el-menu>
    <div class="nav-right">
      <el-input v-model="inputVal"
                size="mini"
                class="input-search"
                prefix-icon="el-icon-search"></el-input>
      <el-button type="primary"
                 class="add-issue-btn"
                 icon="el-icon-plus"
                 size="mini"
                 @click="handleClickShowNewIssueDialog()">新增</el-button>
      <el-avatar :src="userAvatar"
                 shape="square"
                 size="small"></el-avatar>
    </div>
  </div>
</template>
<script>
import { HEADER_MENU_BAR_LIST } from '@/libs/constant.js'

export default {
  data() {
    return {
      HEADER_MENU_BAR_LIST,
      dialogVisible: false,
      activeIndex: 'todoList',
      inputVal: '',
      activeTab: 'first',
      userAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  mounted() {
    this.highLightMenuList()
  },
  methods: {
    highLightMenuList() {
      let that = this

      function _getMenuLink(list = []) {
        list.forEach(item => {
          if (that.$route.path === item.link) {
            that.activeIndex = item.link
            return
          }

          if (item.children) {
            _getMenuLink(item.children)
          }
        })
      }

      _getMenuLink(HEADER_MENU_BAR_LIST)
    },
    handleClose(done) { done() },
    handleClickShowNewIssueDialog() {
      this.$store.commit('sprint/VISIBLE_NEWISSUE_DIALOG', true)
    }
  }
}
</script>
<style>
body,
html {
  font-family: HanziPen SC, 翩翩體-簡 粗體, HanziPen SC Bold, 翩翩体-简 粗体;
}
.el-menu--horizontal[x-placement] {
  top: 36px !important;
}
</style>
<style lang="scss" scoped>
.header-container {
  $width: 5 + random(15) + px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  height: 40px;
  padding: 0 10px 0 0;
  overflow: hidden;
  color: #fff;
  background: #205081;
  .header-logo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    height: 100%;
    padding: 0 5px;
    overflow: hidden;
    filter: contrast(15) hue-rotate(360deg);
    animation: hueRotate 10s infinite linear;
    .title {
      color: #fff;
      font-size: 12px;
      font-style: italic;
      user-select: none;
    }
    .logo {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .bubbles {
      position: absolute;
      bottom: -5px;
      left: 60px;
      width: 80px;
      height: 5px;
      background-color: #fff;
      transform: translate(-50%, 0);
      cursor: none;
      filter: blur(5px);
      user-select: none;
      li {
        position: absolute;
        top: 15px;
        background: #fff;
        border-radius: 50%;
        cursor: none;
        user-select: none;
      }
      @for $i from 0 through 25 {
        li:nth-child(#{$i}) {
          top: 15px;
          left: 15 + random(50) + px;
          width: $width;
          height: $width;
          transform: translate(-50%, -50%);
          animation: moveToTop
            #{random(6) +
            3}s
            ease-in-out -#{random(5000) /
            1000}s
            infinite;
        }
      }
    }
    @keyframes hueRotate {
      100% {
        filter: contrast(15) hue-rotate(360deg);
      }
    }
    @keyframes moveToTop {
      90% {
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -180px);
        opacity: 0.1;
      }
    }
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    .list {
      padding: 0 10px;
      user-select: none;
    }
  }
  .nav-right {
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .add-issue-btn {
      padding: 8px 12px;
      color: #ffffff;
      font-size: 14px;
      background: #161e2361;
      border-radius: 4px;
    }
    .input-search {
      width: 200px;
    }
    .avatar {
      width: 40px;
      height: 30px;
      background-image: url("https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1061311188,2230294750&fm=26&gp=0.jpg");
      background-size: cover;
      border-radius: 4px;
    }
    button {
      margin: 0 10px;
      color: #fff;
      font-weight: 400;
      font-size: 14px;
      background: transparent;
      border: none;
    }
    .user-meta {
      width: 400px;
      height: 300px;
    }
  }
  .el-menu.el-menu--horizontal {
    border: none !important;
  }
  .el-menu--horizontal > .el-menu-item {
    height: 40px;
    line-height: 40px;
    border-bottom: none !important;
  }
}
</style>
