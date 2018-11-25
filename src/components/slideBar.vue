<template>
  <div class="slideBar">
  <el-menu router :default-active="$route.path" class="el-menu-vertical-demo menu" @open="handleOpen" :collapse="slide">
    <template v-for="item in $store.state.permission.routers">
       <el-menu-item v-if="!item.hidden&&!item.dropdown" :index="(item.path === '/'?item.path:item.path+'/') + item.children[0].path" :key="item.path">
          <icon :name="item.icon"></icon>
          <span slot="title" class="submenu_title">{{item.name}}</span>
       </el-menu-item>
       <el-submenu v-if="!item.hidden&&item.dropdown" :index="item.path" :key="item.path">
        <template slot="title">
          <icon :name="item.icon"></icon>
          <span slot="title" class="submenu_title">{{item.name}}</span>
        </template>
        <template v-for="child in item.children">
          <el-menu-item :key="child.path" :index="item.path + '/' +child.path">{{child.name}}</el-menu-item>
        </template>
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
    position: fixed;
    height: 100%;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
    .menu{
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
