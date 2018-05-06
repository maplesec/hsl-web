import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NavComponent from '@/components/NavComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login/index'], resolve)
    },
    {
      path: '/table',
      name: 'table',
      component: resolve => require(['@/components/table/table'], resolve)
    },
    {
      path: '/user',
      name: 'user',
      component: resolve => require(['@/components/user/user'], resolve)
    },
    {
      path: '/role',
      name: 'role',
      component: resolve => require(['@/components/role/role'], resolve)
    },
    {
      path: '/resource',
      name: 'resource',
      component: resolve => require(['@/components/resource/resource'], resolve)
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/nav',
      name: 'NavComponent',
      component: NavComponent
    }
  ]
})
