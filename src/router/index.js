import {router} from './routerMap'
import {getToken} from '../utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
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
