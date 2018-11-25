import {router} from './routerMap'
import store from '../store'
import {getToken} from '../utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    NProgress.start()
    if (to.path === '/login') {
      next('/home')
    } else {
      if (!store.state.user.roles) {
        store.dispatch('getUserInfo').then((res) => {
          let roles = res.data.roles
          store.dispatch('setRoutes', roles).then(() => {
            router.addRoutes(store.state.permission.addRoutes)
            next({ ...to }) // hash模式  确保路由加载完成
          })
        }).catch(err => {
          console.log(err)
        })
        next()
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) >= 0) {
      next()
    } else {
      next('/login')
    }
  }
})
router.afterEach((to, from) => {
  document.title = to.name
  NProgress.done()
})

export default router
