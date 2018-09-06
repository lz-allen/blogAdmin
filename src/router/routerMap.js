import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 按需加载路由
const _import = file => () => import('@/views/' + file + '.vue')

export const constRouterMap = [
  {
    path: '/login',
    name: '登陆',
    component: _import('login')
  },
  {
    path: '/',
    name: '布局',
    redirect: '/home',
    component: _import('layout'),
    children: [
      {
        path: 'home',
        name: '首页',
        component: _import('home')
      }
    ]
  }
]
export const asyncRouterMap = [
  {
    path: '/permission',
    name: '权限管理',
    redirect: '/permission/adminList',
    component: _import('layout'),
    children: [
      {
        path: '/adminList',
        name: '管理员列表',
        component: _import('adminList')
      },
      {
        path: '/addAdmin',
        name: '添加管理员',
        component: _import('addAdmin')
      }
    ]
  },
  {
    path: '/article',
    name: '权限管理',
    redirect: '/article/articleList',
    component: _import('layout'),
    children: [
      {
        path: '/article/articleList',
        name: '文章列表',
        component: _import('articleList')
      },
      {
        path: '/article/addArticle',
        name: '添加文章',
        component: _import('addArticle')
      }
    ]
  }
]
export const router = new Router({
  routes: constRouterMap
})
