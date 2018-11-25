<template>
  <div class="navBar">
    <div @click="toggleSlide" class="icon"><icon name="toggle"></icon></div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="el-breadcrumb-item" v-for="item in pathList" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown class="dropMenu" @command="handleCommand">
      <span class="el-dropdown-link">
        <img class="avatar" src="../../static/image/avatar.jpeg" alt="">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="user">{{userName}}</el-dropdown-item>
        <el-dropdown-item command="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { removeToken } from '../utils/auth'
import { mapGetters } from 'vuex'
export default {
  name: 'navBar',
  components: {},
  props: {},
  data() {
    return {
      isSlide: false,
      pathList: [{
        path: '/home',
        name: '首页'
      }]
    }
  },
  methods: {
    toggleSlide() {
      this.isSlide = !this.isSlide
      this.$emit('slide', this.isSlide)
    },
    getBreadcrumbPath() {
      let routerObj = this.$route.matched.filter(item => item.name)[1]
      if (routerObj.name === '首页') {
        this.pathList.splice(1, 1)
        return
      }
      let second = {
        path: routerObj.path,
        name: routerObj.name
      }
      this.pathList.splice(1, 1, second)
    },
    async handleCommand(command) {
      if (command === 'exit') {
        removeToken()
        await this.$store.dispatch('clearInfo')
        location.reload()
      }
    }
  },
  created() {},
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {},
  watch: {
    $route() {
      this.getBreadcrumbPath()
    }
  }
}

</script>
<style lang="less" scoped>
  .navBar {
    position: relative;
    height: 50px;
    padding: 5px 10px 5px 30px;
    display: flex;
    align-items: center;
    background-color: #ddd;
    .icon{
      width: 25px;
      fill: #333;
      height: 25px;
      margin-right: 20px;
      cursor: pointer;
    }
    .el-breadcrumb-item{
      color: #333;
    }
    .dropMenu{
      position: absolute;
      right: 30px;
       .avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }

</style>
