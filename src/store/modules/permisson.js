import {
  constRouterMap,
  asyncRouterMap
} from '@/router/routerMap'

const hasPermission = (roles, route) => {
  if (route.meta && route.meta.role) {
    return roles.some((role) => route.meta.role.indexOf(role) > 0)
  }
  return true
}

const filterAsyncRouter = (asyncRouterMap, roles) => {
  const accessedRouters = asyncRouterMap.filter((route) => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permisson = {
  state: {
    routers: constRouterMap,
    addRoutes: []
  },
  mutations: {
    SET_ROUTES(state, routers) {
      state.addRoutes = routers
      state.routers = constRouterMap.concat(routers)
    }
  },
  actions: {
    setRoutes: ({
      commit
    }, roles) => {
      return new Promise((resolve, reject) => {
        let accessedRouters = []
        // 如果是超级管理员获取所有的路由
        if (roles[0] === 'admin') {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTES', accessedRouters)
        resolve()
      })
    }
  }
}
export default permisson
