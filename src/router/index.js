import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/components/Login')
    },
    {
      path: '/home',
      name: '主页',
      component: () => import('@/components/Home')
    }
  ]
})
