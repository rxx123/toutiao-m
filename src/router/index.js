import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'
Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/'),
    meta: { requiresAuth: true }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true,
    meta: { requiresAuth: true }
  },
  {
    name: 'user-profile',
    path: '/user/profile',
    component: () => import('@/views/user-profile'),
    meta: { requiresAuth: true }
  },
  {
    name: 'user-chat',
    path: '/user/chat',
    component: () => import('@/views/user-chat'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user'),
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.user) {
      return next()
    }
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需求登录才能访问，确认登录吗?'
    }).then(() => {
      console.log('确认')
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => {
      console.log('取消')
      next(false)
    })
  } else {
    next()
  }
})
export default router
