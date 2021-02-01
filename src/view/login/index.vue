<template>
  <div id="login" :style="{'background-image': `url('${this.switchImgList[this.activeNum]}')`}">
    <div class="header-box">
      <div class="left-panel">
        <router-link to="/product" tag="span">产品</router-link>
        <span class="quarantine">|</span>
        <router-link to="/product" tag="span">技术</router-link>
        <router-link to="/product" tag="span">设计</router-link>
        <span></span>
      </div>
      <div class="right-panel"></div>
    </div>
    <div class="container">
      <div class="form-box">
        <div class="login-form" :class="[isFirstLogin ? '' : (showRegisterAnimtion ? 'hidden-login_animation': 'show-login_animation')]">
          <div class="header-tag" :class="[isLoginPage]">
            <div class="login" @click="isLoginPage = 'hidden-login_animation'">登录</div>
          </div>
          <div class="language-btn" @click="isZhlanguage = !isZhlanguage">{{isZhlanguage ? '中文' : 'En'}}</div>
          <el-form :model="loginForm">
            <div class="title">账号</div>
            <el-form-item>
              <el-input prefix-icon="el-icon-user" ref="usernameRef" v-model="loginForm.username" class="username"></el-input>
            </el-form-item>
            <div class="title">密码</div>
            <el-form-item>
              <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password" class="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="remberCounter" disabled>记住账号</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button class="submit-btn" type="primary" @click="submitLogin()" :disabled="loadingLogin" :icon="loadingLogin ? 'el-icon-loading' : ''">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="tip-info">
            <span class="title">账号：</span><span class="data">uxo2</span>
            <span class="title">密码：</span><span class="data">xyz-t</span>
          </div>
        </div>
        <div class="register-form" :class="[isFirstLogin ? '' : (showRegisterAnimtion ? 'show-register_animation': 'hidden-register_animation')]">
          <div class="header-tag" :class="[isLoginPage]">
            <div class="login" @click="isLoginPage = 'hidden-login_animation'">注册</div>
          </div>
          <div class="language-btn" @click="isZhlanguage = !isZhlanguage">{{isZhlanguage ? '中文' : 'En'}}</div>
          <el-form :model="registerForm">
            <div class="title">账号</div>
            <el-form-item>
              <el-input prefix-icon="el-icon-user" v-model="registerForm.username" class="username"></el-input>
            </el-form-item>
            <div class="title">密码</div>
            <el-form-item>
              <el-input prefix-icon="el-icon-lock" type="password" v-model="registerForm.password" class="password"></el-input>
            </el-form-item>
            <div class="title">确认密码</div>
            <el-form-item>
              <el-input prefix-icon="el-icon-lock" type="password" v-model="registerForm.comfirmPassword" class="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="submit-btn" type="primary">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="register-transprent" :class="[isFirstLogin ? '' : (showRegisterAnimtion ? 'hidden-login_animation' : 'show-register_animation')]" :style="{'background-image': `url('${this.switchImgList[this.activeNum]}')`}">
          <el-button @click="changeView(!showRegisterAnimtion)" type="primary" class="btn">{{showRegisterAnimtion ? '登录' : '注册'}}</el-button>
        </div>
      </div>
    </div>
    <div class="switch-box">
      <el-button @click="activeNum = activeNum - 1" :disabled="activeNum === 0" class="switch-left" icon="el-icon-arrow-left" circle></el-button>
      <el-button @click="activeNum = activeNum + 1" :disabled="activeNum === switchImgList.length - 1" class="switch-right" icon="el-icon-arrow-right" circle></el-button>
    </div>
  </div>
</template>
<script>
/**
 * @desc: This amination comes form https://codepen.io/danielkvist/pen/LYNVyPL
 *        and it's funny so much that borrowed css(background-attachment: fixed) special attributes for configuration rendering.
 */
export default {
  data () {
    return {
      loadingLogin: false,
      isZhlanguage: true,
      showRegisterAnimtion: false,
      isLoginPage: true,
      isFirstLogin: true,
      loginForm: {
        username: 'uxo2',
        password: 'xyz-t'
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      remberCounter: true,
      activeNum: 0,
      switchImgList: [
        '../../../static/image/login-bg3.jpg',
        '../../../static/image/login-bg5.jfif',
        '../../../static/image/login-bg.jpg'
      ]
    }
  },
  methods: {
    changeView (val) {
      this.isFirstLogin = false
      this.showRegisterAnimtion = val
      this.isLoginPage = !this.isLoginPage
    },
    submitLogin () {
      this.loadingLogin = true
      setTimeout(() => {
        this.loadingLogin = false
        this.$router.push('/story')
      }, 800);
    }
  }
}
</script>
<style lang="scss">
#login {
  --white: #e9e9e9;
  --gray: #333;
  --blue: #0367a6;
  --lightblue: #008997;
  --button-radius: 0;
  --max-width: 758px;
  --max-height: 420px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 660px;
  background-color: var(--white);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  .container {
    background-color: transparent;
    border-radius: var(--button-radius);
    // box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25),
    //   -5px 5px 5px rgba(0, 0, 0, 0.22), 0px -5px 5px rgba(0, 0, 0, 0.22);
    height: var(--max-height);
    max-width: var(--max-width);
    overflow: hidden;
    position: relative;
    width: 750px;
    height: 428px;
    position: absolute;
    left: calc(50% - 375px);
    top: calc(50% - 230px);
    border-radius: 4px;
    .form-box {
      background: #fff;
      height: 100%;
      position: relative;
      .language-btn {
        position: absolute;
        right: 2px;
        top: 2px;
        padding: 2px 4px;
        font-size: 13px;
        cursor: pointer;
        color: #909399;
        border: 1px solid #ebeef5;
        border-radius: 3px;
        opacity: 0.8;
        &:hover {
          opacity: 1;
          border-color: #409eff;
        }
      }
      .login-form,
      .register-form {
        position: absolute;
        margin: 0 auto;
        padding: 0 20px;
        background: #fff;
        width: 50%;
        height: 100%;
        background-attachment: fixed;
        visibility: visible;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        .header-tag {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          color: #8d8d8d;
          background: transparent;
          background-attachment: fixed;
          .login,
          .register {
            width: 100%;
            height: 100%;
            text-align: center;
            cursor: pointer;
            background: transparent;
          }
        }
        .title {
          padding: 10px 0;
          font-size: 12px;
          font-weight: 600;
          color: #bfbfbf;
        }
        .el-form-item {
          input {
            border-top: none;
            border-left: none;
            border-right: none;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            background: transparent;
            color: #8d8d8d;
            font-size: 14px;
          }
          .submit-btn {
            margin-top: 20px;
            display: inline-block;
            width: 100%;
            letter-spacing: 2px;
          }
        }
        .tip-info {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .title {
            margin: 0 5px;
            font-weight: 600;
          }
          .data {
            font-size: 14px;
            color: #ffab00;
            padding: 1px 4px;
            border-radius: 2px;
            background: transparent;
          }
        }
      }
      .login-form {
        z-index: 5;
        left: 0;
        top: 0;
        &.hidden-login_animation {
          z-index: 10;
          animation: hiddenLoginPanel 0.5s forwards;
        }
        &.show-login_animation {
          z-index: 20;
          animation: showLoginPanel 0.5s forwards;
        }
      }
      .register-form {
        z-index: 5;
        left: 375px;
        top: 0;
        &.show-register_animation {
          z-index: 20;
          animation: showRegisterPanel 0.5s forwards;
        }
        &.hidden-register_animation {
          z-index: 10;
          animation: hiddenRegisterPanel 0.5s forwards;
        }
      }
      .login-transprent,
      .register-transprent {
        position: absolute;
        top: 0;
        margin: 0 auto;
        padding: 0 10px;
        background: transparent;
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .login-transprent {
        z-index: 5;
        top: 0;
        left: 0;
      }
      .register-transprent {
        z-index: 20;
        top: 0;
        left: 375px;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
        &.hidden-login_animation {
          animation: registerBtnHidden 0.5s forwards;
          .btn {
            position: relative;
            animation: hiddenBtnAnimation 0.5s forwards;
          }
        }
        &.show-register_animation {
          animation: LoginBtnHidden 0.5s forwards;
          .btn {
            position: relative;
            animation: showBtnAnimation 0.5s forwards;
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
      opacity: 0;
      z-index: 10;
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
      opacity: 1;
      z-index: 10;
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
    bottom: 20px;
    right: 20px;
  }
  .btn {
    border-radius: 20px;
    cursor: pointer;
    letter-spacing: 2px;
    padding: 14px 50px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }
  .header-box {
    position: fixed;
    top: 0;
    left: 20px;
    right: 20px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-panel {
      color: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        margin: 0 15px;
        opacity: 0.8;
        font-size: 13px;
        &:not(.quarantine) {
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
