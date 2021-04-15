<template>
  <div id="userManage">
    <div class="userManage scroll-style-none">
      <el-row>
        <el-col :span="12">
          <el-form :inline="true"
                   :model="formLabelAlign"
                   label-position="right"
                   label-width="60px"
                   size="small">
            <el-form-item label="头像">
              <div class="avatar">
                <img class="avatar-circle"
                     src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1061311188,2230294750&fm=26&gp=0.jpg">
                <el-upload :show-file-list="false"
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload"
                           class="avatar-uploader"
                           action="https://jsonplaceholder.typicode.com/posts/">
                  <el-button icon="el-icon-upload"
                             size="small"
                             class="upload-btn">上传头像</el-button>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="账户">
              <el-input v-model="formLabelAlign.name"
                        style="width: 230px"
                        disabled></el-input>
              <el-button size="small">修改</el-button>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="formLabelAlign.password"
                        type="password"
                        disabled
                        style="width: 230px"></el-input>
              <el-button size="small">修改</el-button>
            </el-form-item>
            <el-form-item label="Tel">
              <el-input v-model="formLabelAlign.tel"
                        type="tel"
                        disabled
                        style="width: 230px"></el-input>
              <el-button size="small">校验</el-button>
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="formLabelAlign.email"
                        type="email"
                        disabled
                        style="width: 230px"></el-input>
              <el-button size="small">校验</el-button>
            </el-form-item>
            <el-form-item label="强校验">
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          共享账号
          <div v-for="(item, index) in formShares"
               :key="index"
               class="formShares">
            <el-input v-model="formShares[index]"
                      size="small"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      activeName: 'userManage',
      imageUrl: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3389396624,1488513240&fm=26&gp=0.jpg',
      formLabelAlign: {
        name: 'uxo2',
        password: 'password',
        type: '',
        email: '1748416084@qq.com',
        tel: '17779116463',
        checkRadio: true
      },
      formShares: ['17779116461', '17779116462']
    }
  },
  methods: {
    handleClick() { },
    handleAvatarSuccess() { },
    beforeAvatarUpload() { }
  }
}
</script>
<style lang="scss" scoped>
#userManage {
  .formShares {
    .el-input {
      width: 300px;
      margin: 10px 0;
    }
  }
  .el-form {
    width: 500px;
    .avatar {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      .upload-btn {
        margin-left: 10px;
      }
    }
    .avatar-circle {
      border: 1px solid #fff;
      display: inline-block;
      border-radius: 8px;
      width: 100px;
      background-image: url("https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1061311188,2230294750&fm=26&gp=0.jpg");
      height: 70px;
      cursor: pointer;
      user-select: none;
      background: #e3e4e5;
    }
  }
  .uxo-radio {
    position: relative;
    display: block;
    width: 350px;
  }
}
</style>
