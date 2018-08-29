<template>
  <div class="wrapper">
    <div class="loginInfo">
      <h4 class="title">博客登录</h4>
      <el-form :model="loginInfo">
        <el-form-item>
         <icon name="yonghu" class="user"></icon>
          <el-input type="text" placeholder="请输入用户名" v-model="loginInfo.name"></el-input>
        </el-form-item>
        <el-form-item>
          <icon name="mima" class="pwd"></icon>
          <el-input type="password" placeholder="请输入密码" v-model="loginInfo.pwd"></el-input>
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
        name: '',
        pwd: ''
      }
    }
  },
  created() {
  },
  methods: {
    async login() {
      this.loading = true
      if (!this.loginInfo.name || !this.loginInfo.pwd) {
        this.$message({
          message: '请输入用户名或者密码',
          type: 'warning'
        })
        this.loading = false
        return
      }
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}

</script>
<style lang="less">
  .wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../../static/image/bg.jpeg') no-repeat fixed;
    background-size: cover;
  }

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
    .icon{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
    }
    .user{
      left: 6px;
    }
    .pwd{
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

</style>
