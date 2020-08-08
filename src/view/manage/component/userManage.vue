<template>
  <div id="userManage">
    <div class="userManage scroll-style-none">
      <el-row>
        <el-col :span="24">
          <el-form
            label-position="right"
            label-width="80px"
            :inline="true"
            :model="formLabelAlign"
            size="small">
            <el-form-item label="头像">
              <div class="avatar">
                <img class="avatar-circle" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1061311188,2230294750&fm=26&gp=0.jpg">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <el-button icon="el-icon-upload" size="mini" class="upload-btn">上传头像</el-button>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="账户">
              <el-input v-model="formLabelAlign.name" style="width: 230px" disabled></el-input>
              <el-button size="small">修改</el-button>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="formLabelAlign.password" type="password" disabled style="width: 230px"></el-input>
              <el-button size="small">修改</el-button>
            </el-form-item>
            <el-form-item label="Tel">
              <el-input v-model="formLabelAlign.tel" type="tel" disabled style="width: 230px"></el-input>
              <el-button size="small">校验</el-button>
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="formLabelAlign.email" type="email" disabled style="width: 230px"></el-input>
              <el-button size="small">校验</el-button>
            </el-form-item>
          </el-form>
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
        tel: '17779116463'
      },
      formShares: ['17779116461', '17779116462']
    }
  },
  methods: {
    handleClick() {},
    handleAvatarSuccess() {},
    beforeAvatarUpload() {}
  }
}
</script>
<style lang="scss" scoped>
#userManage {
  .el-form {
    width: 500px;
    .avatar {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: flex-end;
      .upload-btn {
        margin-left: 10px;
      }
    }
    .avatar-circle {
      border: 1px solid #fff;
      display: inline-block;
      border-radius: 8px;
      width: 100px;
      background-image: url('https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1061311188,2230294750&fm=26&gp=0.jpg');
      height: 70px;
      cursor: pointer;
      user-select: none;
      background: #e3e4e5;
    }
  }
}
</style>
