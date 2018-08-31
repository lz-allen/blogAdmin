<template>
  <div class="slideBar">
  <el-menu router :default-active="$route.path" class="el-menu-vertical-demo menu" @open="handleOpen" :collapse="slide">
    <template>
       <el-menu-item index="/home">
          <icon name="home"></icon>
          <span slot="title" class="submenu_title">首页</span>
       </el-menu-item>
       <el-submenu index="/adminList">
        <template slot="title">
          <icon name="quanxian"></icon>
          <span slot="title" class="submenu_title">权限</span>
        </template>
        <el-menu-item index="/adminList">管理员列表</el-menu-item>
        <el-menu-item index="/addAdmin">添加管理员</el-menu-item>
      </el-submenu>
       <el-submenu :index="'/articleList'">
        <template slot="title">
          <icon name="wenzhang"></icon>
          <span slot="title" class="submenu_title">文章</span>
        </template>
        <el-menu-item index="/articleList">文章列表</el-menu-item>
        <el-menu-item index="/addArticle">添加文章</el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
  </div>
</template>

<script>
export default {
  name: 'slideBar',
  components: {},
  props: {
    slide: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isCollapse: true
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleOpen(key, keyPath) {
      this.$router.push(key)
    }
  },
  created() {},
  mounted() {}
}

</script>
<style lang="less">
  .slideBar{
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .menu{
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
    }
    .icon{
      width: 20px;
      height: 20px;
    }
    .submenu_title{
      padding-left: 10px;
    }
    .el-menu-item{
      color: #fff;
      &:hover{
        background-color: transparent;
      }
      &.is-active{
        .icons{
          fill: #00BC85;
        }
        color: #00bc83;
        background-color: transparent;
      }
    }
    .el-submenu__title{
      color: #fff;
      text-align: left;
      &:hover{
        background: transparent;
        .submenu_title{
          color: #fff;
        }
      }
    }
    .el-menu{
      .icons{
          fill: #fff;
      }
      text-align: left;
      background: #000000e6;
    }
  }
</style>
