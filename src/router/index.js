import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requiresAuth: false
    },
    component: () => import('../views/login/Login')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      requiresAuth: false
    },
    component: () => import('../views/register/Register')
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/home/Home'),
    // children: [
    //   //  嵌套子路由不加/
    //   {
    //     path: '',
    //     redirect: 'write'
    //   },
    //   {
    //     path: 'write',
    //     name: 'write',
    //     meta: {
    //       requiresAuth: true
    //     },
    //     component: () => import('../components/moment/WriteMoment'),
    //   },
    //   {
    //     path: 'profile',
    //     name: 'profile',
    //     meta: {
    //       requiresAuth: true
    //     },
    //     component: () => import('../components/user/Profile'),
    //   },
    //   {
    //     path: 'allMoments',
    //     name: 'allMoments',
    //     meta: {
    //       requiresAuth: true
    //     },
    //     component: () => import('../components/moment/AllMoments'),
    //   }
    // ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
