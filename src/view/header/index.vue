<template>
  <div id="header">
    <div class="header-logo">
      <img class="logo" :src="$image.logo">
      <span class="title">transaction</span>
      <ul class="bubbles">
        <li v-for="v of Array(15)" :key="v"></li>
      </ul>
    </div>
    <el-menu :default-active="activeIndex" size="mini" class="el-menu-demo" mode="horizontal" router background-color="#205081" text-color="#fff" active-text-color="#ffab00">
      <template v-for="menu in menuList">
        <el-submenu v-if="menu.children" :key="menu.link" :index="menu.link">
          <template slot="title">
            <i v-if="menu.icon" :class="menu.icon"></i>
            {{menu.name}}
          </template>
          <el-menu-item v-for="item in menu.children" :key="item.link" :index="item.link">
            <i v-if="item.icon" :class="item.icon"></i>
            {{item.name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="menu.title" :index="menu.link">
          <i v-if="menu.icon" :class="menu.icon"></i>
          {{menu.name}}
        </el-menu-item>
      </template>
    </el-menu>
    <div class="nav-right">
      <el-input v-model="inputVal" size="mini" class="input" prefix-icon="el-icon-search"></el-input>
      <el-button title="配置域" type="text" size="mini" icon="el-icon-lock" @click="$router.push('/manage')" class="">配置域</el-button>
      <div class="avatar"></div>
      <!-- <el-popover placement="bottom-start"
									width="300"
									trigger="click"
									visible-arrow="false">
				<span slot="reference" class="avatar"></span>
				<div class="user-meta">
					<el-button></el-button>
				</div>
			</el-popover> -->
    </div>
  </div>
</template>
<script>
import { menuList } from '@/libs/constant/header.js'

export default {
  data () {
    return {
      menuList,
      dialogVisible: false,
      activeIndex: 'story',
      inputVal: ''
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
#header {
  height: 40px;
  background: #205081;
  z-index: 100;
  color: #fff;
  display: flex;
  padding: 0 10px 0 0;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  .header-logo {
    display: flex;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    padding: 0 5px;
    overflow: hidden;
    filter: contrast(15) hue-rotate(0);
    animation: hueRotate 10s infinite linear;
    filter: contrast(15) hue-rotate(360deg);
    .title {
      font-size: 12px;
      user-select: none;
      font-style: italic;
      color: #fff;
    }
    .logo {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .bubbles {
      position: absolute;
      bottom: -5px;
      width: 80px;
      height: 5px;
      left: 60px;
      user-select: none;
      transform: translate(-50%, 0);
      background-color: #fff;
      filter: blur(5px);
      cursor: none;
      li {
        position: absolute;
        user-select: none;
        border-radius: 50%;
        background: #fff;
        top: 15px;
        cursor: none;
      }
      @for $i from 0 through 25 {
        li:nth-child(#{$i}) {
          $width: 5 + random(15) + px;
          left: 15 + random(50) + px;
          top: 15px;
          transform: translate(-50%, -50%);
          width: $width;
          height: $width;
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
        opacity: 0.1;
        transform: translate(-50%, -180px);
      }
    }
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    .list {
      padding: 0 10px;
      user-select: none;
    }
  }
  .nav-right {
    position: absolute;
    right: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .avatar {
      width: 40px;
      height: 30px;
      background-size: cover;
      border-radius: 4px;
      background-image: url("https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1061311188,2230294750&fm=26&gp=0.jpg");
    }
    button {
      margin: 0 10px;
      background: transparent;
      color: #fff;
      border: none;
      font-weight: 400;
      font-size: 14px;
    }
    .input {
      width: 145px;
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
