import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '@/pages/Home'
import Authenticate from '@/pages/Authenticate'

import ProductRoutes from './product'
import OrderRoutes from './order'

Vue.use(VueRouter)

const routes = [
  {
    path: '/authenticate',
    name: 'Authenticate',
    component: Authenticate,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  ProductRoutes,
  OrderRoutes,
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters.isAuthorized)
      next({path: '/authenticate'})
    
    // if(to.matched.some(record => record.meta.admin)) {
    //   try {
    //     if(store.state.user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('admin')!==-1)
    //       next()
    //   } catch (error) {
    //     next({path: '/restricted'})
    //   }
    // }
    
    next()
  }
  next()
})

export default router
