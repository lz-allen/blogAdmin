<template>
  <div class="login">
    <div class="loginInfo">
      <h4 class="title">系统登录</h4>
      <el-form :model="loginInfo">
        <el-form-item>
          <icon name="yonghu" class="user"></icon>
          <el-input type="text" placeholder="请输入用户名" v-model.trim="loginInfo.userName"></el-input>
        </el-form-item>
        <el-form-item>
          <icon name="mima" class="pwd"></icon>
          <el-input type="password" placeholder="请输入密码" @keyup.enter.native="login" v-model.trim="loginInfo.pwd"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="submit" @click="login" :loading="loading">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loginInfo: {
        userName: '',
        pwd: ''
      }
    }
  },
  created() {},
  methods: {
    async login() {
      this.loading = true
      if (!this.loginInfo.userName || !this.loginInfo.pwd) {
        this.$message({
          message: '请输入用户名或者密码',
          type: 'warning'
        })
        this.loading = false
        return
      }
      try {
        let flag = await this.$store.dispatch('userLogin', this.loginInfo)
        flag.code && this.$router.push('/home')
      } catch (error) {
        this.$message({
          message: '服务器错误',
          type: 'warning'
        })
      }
      this.loading = false
    }
  }
}

</script>
<style lang="less">
  .login {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../../static/image/bg.jpeg') no-repeat fixed;
    background-size: cover;
    .loginInfo {
      background-color: rgba(0, 0, 0, .2);
      border-radius: 10px;
      box-shadow: 0 0 5px #fff;
      border: 1px solid rgba(255, 255, 255, 0.8);
      padding: 15px 30px;
      width: 300px;

      .title {
        color: #eee;
        font-size: 30px;
      }

      .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
      }

      .user {
        left: 6px;
      }

      .pwd {
        left: 8px;
        width: 25px;
        height: 25px;
      }

      .el-form-item {
        position: relative;
        border: 1px solid rgba(255, 255, 255, 0.5);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;

        input {
          background-color: transparent;
          padding: 0 10px 0 40px;
          color: #fff;
        }
      }

      .submit {
        width: 100%;
      }
    }
  }
</style>
