import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 按需加载路由
const _import = file => () => import('@/views/' + file + '.vue')

export const constRouterMap = [
  {
    path: '/login',
    name: '登陆',
    hidden: true,
    component: _import('login')
  },
  {
    path: '/',
    name: '主页',
    redirect: '/home',
    icon: 'home',
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
    component: _import('layout'),
    name: '权限列表',
    icon: 'quanxian',
    dropdown: true,
    redirect: '/permission/adminList',
    meta: {role: ['admin']},
    children: [
      {
        path: 'adminList',
        name: '管理员列表',
        component: _import('adminList')
      },
      {
        path: 'addAdmin',
        name: '添加管理员',
        component: _import('addAdmin')
      }
    ]
  },
  {
    path: '/article',
    component: _import('layout'),
    name: '文章',
    icon: 'wenzhang',
    redirect: '/article/articleList',
    dropdown: true,
    children: [
      {
        path: 'articleList',
        name: '文章列表',
        component: _import('articleList')
      },
      {
        path: 'addArticle',
        name: '添加文章',
        component: _import('addArticle')
      }
    ]
  }
]
export const router = new Router({
  routes: constRouterMap
})
