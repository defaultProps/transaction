<template>
  <div id="login-container"
       :style="{'background-image': `url('${switchImgList[activeNum]}')`}">
    <div class="header-box">
      <div class="left-panel">
        <router-link to="/product"
                     tag="span">产品</router-link>
        <span class="quarantine">|</span>
        <router-link to="/product"
                     tag="span">技术</router-link>
        <router-link to="/product"
                     tag="span">设计</router-link>
        <span class="quarantine">|</span>
        <router-link to="/product"
                     tag="span">认知</router-link>
        <router-link to="/product"
                     tag="span">规划</router-link>
      </div>
    </div>
    <div class="main-box">
      <div class="form-box">
        <div :class="animationFormLoginClass()">
          <div class="header-title">登录</div>
          <el-form :model="loginForm">
            <div class="label-title">账号</div>
            <el-form-item>
              <el-input v-model="loginForm.username"
                        prefix-icon="el-icon-user"
                        clearable
                        disabled
                        class="username"></el-input>
            </el-form-item>
            <div class="label-title">密码</div>
            <el-form-item>
              <el-input v-model="loginForm.password"
                        prefix-icon="el-icon-lock"
                        type="password"
                        clearable
                        disabled
                        class="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="remberCounter"
                           disabled>记住账号</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button :disabled="loadingLogin"
                         :icon="loadingLogin ? 'el-icon-loading' : ''"
                         class="register-btn"
                         type="primary"
                         @click="handleClickLoginSubmit()">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="tip-info">
            <span class="tip-title">账号：</span><span class="tip-value">uxo</span>
            <span class="tip-title">密码：</span><span class="tip-value">123456</span>
          </div>
        </div>
        <div :class="animationFormRegisterClass()">
          <div class="header-title">注册</div>
          <el-form :model="registerForm">
            <div class="label-title">账号</div>
            <el-form-item>
              <el-input v-model="registerForm.username"
                        prefix-icon="el-icon-user"
                        class="username"></el-input>
            </el-form-item>
            <div class="label-title">密码</div>
            <el-form-item>
              <el-input v-model="registerForm.password"
                        prefix-icon="el-icon-lock"
                        type="password"
                        class="password"></el-input>
            </el-form-item>
            <div class="label-title">确认密码</div>
            <el-form-item>
              <el-input v-model="registerForm.comfirmPassword"
                        prefix-icon="el-icon-lock"
                        type="password"
                        class="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="register-btn"
                         type="primary">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div :class="[isFirstLogin ? '' : (showRegisterAnimtion ? 'hidden-login_animation' : 'show-register_animation')]"
             :style="{'background-image': `url('${switchImgList[activeNum]}')`}"
             class="register-transprent">
          <el-button type="primary"
                     class="switch-btn"
                     @click="handleChangeView(!showRegisterAnimtion)">
            {{ showRegisterAnimtion ? '登录' : '注册' }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="switch-box">
      <el-button :disabled="activeNum === 0"
                 circle
                 class="switch-left"
                 icon="el-icon-arrow-left"
                 @click="activeNum = activeNum - 1"></el-button>
      <el-button :disabled="activeNum === switchImgList.length - 1"
                 class="switch-right"
                 icon="el-icon-arrow-right"
                 circle
                 @click="activeNum = activeNum + 1"></el-button>
    </div>
  </div>
</template>
<script>
/**
 * @desc: This amination comes form https://codepen.io/danielkvist/pen/LYNVyPL
 *        and it's funny so much that borrowed css(background-attachment: fixed) special attributes for configuration rendering.
 */
import coreAxios from '@/axios'
import bg1 from '@/assets/login-bg3.jpg'
import bg2 from '@/assets/login-bg4.jpg'
import bg3 from '@/assets/login-bg.jpg'

export default {
  data () {
    return {
      loadingLogin: false, // 登录按钮提交点击loading
      showRegisterAnimtion: false, // 是否切换到注册页面动画
      isFirstLogin: true, // 是否为首次登录， 首次登录关闭动画效果，非首次登录开启效果
      loginForm: { // 登录表单数据
        username: 'uxo',
        password: '123456'
      }, // 注册表单数据
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      remberCounter: true, // 是否记住账号
      activeNum: 0, // 当前背景图片页数
      switchImgList: [bg1, bg2, bg3] // 背景图片列表
    }
  },
  methods: {
    // 登录页面动画切换classname
    animationFormLoginClass () {
      let classname = 'login-form '

      if (this.isFirstLogin) {
        classname += this.showRegisterAnimtion ? 'hidden-login_animation' : 'show-login_animation'
      }

      return classname
    },
    // 注册页面动画切换classname
    animationFormRegisterClass () {
      let classname = 'register-form '

      if (this.isFirstLogin) {
        classname += this.showRegisterAnimtion ? 'show-register_animation' : 'hidden-register_animation'
      }

      return classname
    },
    // 切换表单
    handleChangeView (val) {
      this.isFirstLogin = false
      this.showRegisterAnimtion = val
    },
    // axios 登录提交表单
    handleClickLoginSubmit () {
      this.loadingLogin = true

      coreAxios.sprintAxios.initLocalForageStore().then(() => {
        this.$nextTick(() => {
          this.loadingLogin = false
          this.$router.push('/todoList')
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#login-container {
  --white: #e9e9e9;
  --gray: #333;
  --blue: #0367a6;
  --lightblue: #008997;
  --button-radius: 0;
  --max-width: 758px;
  --max-height: 420px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  min-height: 660px;
  background-color: var(--white);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  .header-box {
    position: fixed;
    top: 0;
    right: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    .left-panel {
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #fff;
      span {
        margin: 0 15px;
        font-size: 13px;
        opacity: 0.8;
        &:not(.quarantine) {
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }

  .main-box {
    position: absolute;
    top: calc(50% - 230px);
    left: calc(50% - 375px);
    width: 750px;
    max-width: var(--max-width);
    height: 428px;
    overflow: hidden;
    background-color: transparent;
    border-radius: var(--button-radius);
    border-radius: 4px;
    .form-box {
      position: relative;
      height: 100%;
      background: #fff;
      .login-form,
      .register-form {
        position: absolute;
        width: 50%;
        height: 100%;
        margin: 0 auto;
        padding: 0 20px;
        background: #fff;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-attachment: fixed;
        visibility: visible;
        .header-title {
          color: #8d8d8d;
          font-size: 20px;
          line-height: 50px;
          text-align: center;
          .login,
          .register {
            width: 100%;
            height: 100%;
            text-align: center;
            background: transparent;
            cursor: pointer;
          }
        }
        .label-title {
          padding: 10px 0;
          color: #bfbfbf;
          font-size: 12px;
        }
        .el-form-item {
          .register-btn {
            display: inline-block;
            width: 100%;
            margin-top: 20px;
            letter-spacing: 2px;
          }
        }
        .tip-info {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 12px;

          .tip-title {
            margin: 0 5px;
          }

          .tpi-value {
            padding: 1px 4px;
            color: #ffab00;
            background: transparent;
            border-radius: 2px;
          }
        }
      }
      .login-form {
        top: 0;
        left: 0;
        z-index: 5;
        &.hidden-login_animation {
          z-index: 10;
          animation: hiddenLoginPanel 0.6s forwards;
        }
        &.show-login_animation {
          z-index: 20;
          animation: showLoginPanel 0.6s forwards;
        }
      }
      .register-form {
        top: 0;
        left: 375px;
        z-index: 5;
        &.show-register_animation {
          z-index: 20;
          animation: showRegisterPanel 0.6s forwards;
        }
        &.hidden-register_animation {
          z-index: 2;
          animation: hiddenRegisterPanel 0.6s forwards;
        }
      }
      .login-transprent,
      .register-transprent {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 100%;
        margin: 0 auto;
        padding: 0 10px;
        background: transparent;
      }
      .login-transprent {
        top: 0;
        left: 0;
        z-index: 5;
      }
      .register-transprent {
        top: 0;
        left: 375px;
        z-index: 20;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-attachment: fixed;
        &.hidden-login_animation {
          animation: registerBtnHidden 0.6s forwards;
          .switch-btn {
            position: relative;
            animation: hiddenBtnAnimation 0.6s forwards;
          }
        }
        &.show-register_animation {
          animation: LoginBtnHidden 0.6s forwards;
          .switch-btn {
            position: relative;
            animation: showBtnAnimation 0.6s forwards;
          }
        }
      }
    }
  }

  @keyframes LoginBtnHidden {
    0% {
      left: 0;
    }
    100% {
      left: 375px;
    }
  }

  @keyframes showBtnAnimation {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes hiddenBtnAnimation {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes showLoginPanel {
    0% {
      left: 375px;
      opacity: 0;
    }
    25% {
      z-index: 1;
      opacity: 1;
    }

    100% {
      left: 0;
      opacity: 1;
    }
  }

  @keyframes hiddenLoginPanel {
    0% {
      left: 0;
      opacity: 1;
    }
    25% {
      z-index: 1;
      opacity: 1;
    }
    100% {
      left: 375px;
      opacity: 0;
    }
  }
  @keyframes hiddenRegisterPanel {
    0% {
      left: 375px;
      opacity: 1;
    }
    30% {
      opacity: 1;
    }

    50% {
      z-index: 10;
      opacity: 0;
    }
    100% {
      left: 0;
      opacity: 0;
    }
  }
  @keyframes showRegisterPanel {
    0% {
      left: 0;
      opacity: 0;
    }
    30% {
      opacity: 0;
    }
    50% {
      z-index: 10;
      opacity: 1;
    }
    100% {
      left: 375px;
      opacity: 1;
    }
  }
  @keyframes registerBtnHidden {
    0% {
      left: 375px;
    }
    100% {
      left: 0;
    }
  }
  .switch-box {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
  .switch-btn {
    padding: 14px 50px;
    letter-spacing: 2px;
    text-transform: uppercase;
    border-radius: 20px;
    cursor: pointer;
    transition: transform 80ms ease-in;
  }
}
</style>
