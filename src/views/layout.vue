<template>
  <div class="wrapper">
    <slidebar :slide="isSlide"></slidebar>
    <div class="right" :class="{acive:isSlide}">
      <nav-bar @slide="setSlide"></nav-bar>
      <transition name="slide-fade" :duration="{ enter: 500, leave: 800 }">
        <router-view class="content"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Slidebar from '@/components/slidebar'
import NavBar from '@/components/navBar'
export default {
  components: {
    Slidebar,
    NavBar
  },
  props: {},
  data() {
    return {
      isSlide: null
    }
  },
  watch: {},
  computed: {},
  methods: {
    setSlide(val) {
      this.isSlide = val
    }
  },
  created() {},
  mounted() {}
}

</script>
<style lang="less" scoped>
  .wrapper {
    .right {
      margin-left: 200px;
      transition: margin-left .3s ease;
    }
    .content{
      padding: 20px;
    }
    .acive {
      margin-left: 65px;
    }

    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(10px);
      opacity: 0;
    }
  }

</style>
