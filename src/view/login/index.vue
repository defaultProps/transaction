<template>
  <div id="login">
    <div class="container" :style={'background': switchImgList[activeNum - 1]}>
      <div class="header-tag" :class="[activeTag]">
        <div class="login" @click="activeTag = 'login-t'">登录</div>
        <div class="register" @click="activeTag = 'register-t'">注册</div>
      </div>
      <div class="form-box">
        <div class="login-form" v-if="activeTag === 'login-t'">
          <el-form :model="loginForm">
            <div class="title">账号</div>
            <el-form-item>
              <el-input prefix-icon="el-icon-user" v-model="loginForm.username" class="username"></el-input>
            </el-form-item>
            <div class="title">密码</div>
            <el-form-item>
              <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password" class="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="submit-btn">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="tip-info">
            <span class="title">账号：</span><span class="data">uxo2</span>
            <span class="title">密码：</span><span class="data">xyz-t</span>
          </div>
        </div>
        <div class="register-form" v-if="activeTag === 'register-t'"></div>
      </div>
    </div>
    <div class="switch-box">
      <el-button :disabled="activeNum === 1" class="switch-left" icon="el-icon-arrow-left" circle></el-button>
      <el-button :disabled="activeNum === switchImgList.length" class="switch-right" icon="el-icon-arrow-right" circle></el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeTag: 'login-t',
      loginForm: {
        username: '',
        password: ''
      },
      activeNum: 1,
      switchImgList: [
        '../../../static/image/login-bg3.jpg',
        '../../../static/image/login-bg2.jpg',
        '../../../static/image/login-bg1.jpg',
        '../../../static/image/login-bg.jpg'
      ]
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
  background-color: var(--white);
  // background: url("https://martechseries.com/wp-content/uploads/2020/07/Nuxeo-Unveils-New-Low-Code-User-Interface-for-Nuxeo-Insight.jpg");
  // background: url("https://res.cloudinary.com/dwbddafc1/image/upload/v1597151453/background_n6feku.jpg");
  // background: url("https://codepen.io/danielkvist/pen/LYNVyPL");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  .container {
    background-color: transparent;
    border-radius: var(--button-radius);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25),
      -5px 5px 5px rgba(0, 0, 0, 0.22), 0px -5px 5px rgba(0, 0, 0, 0.22);
    height: var(--max-height);
    max-width: var(--max-width);
    overflow: hidden;
    position: relative;
    width: 380px;
    height: 370px;
    position: absolute;
    right: 100px;
    top: 100px;
    border-radius: 4px;
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
      &.login-t {
        .login {
          font-weight: 600;
          background: transparent;
          color: #409eff;
          letter-spacing: 2px;
        }
        .register {
          font-weight: 600;
          color: #8d8d8d;
          background: transparent;
          letter-spacing: 2px;
        }
      }
      &.register-t {
        .register {
          font-weight: 600;
          background: transparent;
          color: #409eff;
          letter-spacing: 2px;
        }
        .login {
          font-weight: 600;
          color: #8d8d8d;
          letter-spacing: 2px;
          background: transparent;
        }
      }
      .login,
      .register {
        width: 50%;
        height: 100%;
        text-align: center;
        cursor: pointer;
      }
    }
    .form-box {
      height: 320px;
      background: transparent;
      .login-form {
        width: 80%;
        margin: 0 auto;
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
            color: #409eff;
            font-weight: 600;
            font-size: 14px;
          }
          .submit-btn {
            margin-top: 20px;
            display: inline-block;
            width: 100%;
            background: #409eff;
            color: #fff;
            letter-spacing: 2px;
            border: 1px solid #409eff;
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
    }
  }
  .switch-box {
    position: fixed;
    bottom: 20px;
    right: 20px;
    button {
      background: transparent;
      font-size: 13px;
      color: #fff;
      border: 1px solid #fff;
    }
  }
}
</style>
