import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'

import Home from '@/pages/Home';
import Authenticate from '@/pages/Authenticate';
import Credits from '@/pages/Credits';

import Search from '@/pages/Search';
import Cart from '@/pages/Cart';

import Orders from '@/pages/Orders';

import ProductView from '@/pages/product/View';
import OrderView from '@/pages/order/View';

import Profile from '@/pages/Profile';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/authenticate',
      name: 'Authenticate',
      component: Authenticate
    },
    {
      path: '/credits',
      name: 'Credits',
      component: Credits
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/order/:id',
      name: 'OrderView',
      component: OrderView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductView
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeResolve((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // console.log('ROUTE USER', store.state.user)
    if(!store.state.user)
      next({path: '/authenticate'})
    
    // if(to.matched.some(record => record.meta.admin)) {
    //   const allowedRoles = ['Root','Admin','Manager','Employee']
    //   try {
    //     // if(store.state.user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('admin')!==-1)
    //     if(store.state.user.signInUserSession.accessToken.payload['cognito:groups'].some(role => allowedRoles.includes(role)))
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