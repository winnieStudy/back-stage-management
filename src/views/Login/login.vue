<template>
  <div>
    <el-form :model="form" label-width="100px" status-icon :rules="rules" ref="form" class="login-container">
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="用户名" label-width="80px" prop="userName" class="login-name">
        <el-input v-model="form.userName" placeholder="请输入账号" auto-complete="off" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password" class="login-pwd">
        <el-input v-model="form.password" placeholder="请输入密码" auto-complete="off" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item class="login-submit">
        <el-button type="primary" @click="login" v-preventReClick class="login-submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        form: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, message: '最小长度为3', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .login-container{
      border-radius: 15px;
      margin: 180px auto;
      background-clip: padding-box;
      width: 350px;
      padding: 35px 35px 15px 35px;
      background-color: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      .login-title{
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458
      }
      .login-submit{
        margin: 0 10px 0 10px;
      }
    }
</style>
