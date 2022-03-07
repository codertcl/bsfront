import Vue from 'vue'
import VueRouter from 'vue-router'
import {getItem} from "../utils/storage";
import {MessageBox,Message} from 'element-ui';

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
    children: [
      //  嵌套子路由不加/
      {
        path: '',
        redirect: 'profile'
      },
      // {
      //   path: 'write',
      //   name: 'write',
      //   meta: {
      //     requiresAuth: true
      //   },
      //   component: () => import('../components/moment/WriteMoment'),
      // },
      {
        path: 'profile',
        name: 'profile',
        meta: {
          requiresAuth: true
        },
        component: () => import('../components/user/Profile'),
      },
      // {
      //   path: 'allMoments',
      //   name: 'allMoments',
      //   meta: {
      //     requiresAuth: true
      //   },
      //   component: () => import('../components/moment/AllMoments'),
      // }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//对于需要token信息的页面 判断localStorage中是否存储了token
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth === true && !getItem('userToken')) {
    MessageBox.confirm('该功能需要登录，确认登录吗', '访问提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
    )
        .then(() => {
          router.push('/login')
        })
        .catch(() => {
          Message({
            showClose: true,
            message: '已取消',
            center:true
          });
          next(false)
        })
  } else {
    next()
  }
})


export default router
