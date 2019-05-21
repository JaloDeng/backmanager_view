import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/components/Home')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login')
    }
  ]
})
