// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index'
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './iconfont/iconfont'
import icon from './components/icon'
import axios from './utils/fetch'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 注册全局图标组件
Vue.component('Icon', icon)
Vue.prototype.axios = axios
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
