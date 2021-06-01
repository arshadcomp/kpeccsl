import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'

// import { Auth } from 'aws-amplify'

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Logout from '@/pages/Logout';

import Search from '@/pages/Find';
import Cart from '@/pages/Cart';

// import About from '@/pages/About';
// import Contact from '@/pages/Contact';
import Orders from '@/pages/Orders';

import ProductView from '@/pages/product/View';
import OrderView from '@/pages/order/View';

import Profile from '@/pages/Profile';

import AdminRoutes from './admin'
// import ProfileRoutes from './profile'
// import CartRoutes from './cart'


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
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
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: About
    // },
    // {
    //   path: '/contact',
    //   name: 'Contact',
    //   component: Contact
    // },
    // {
    //   path: '/orders',
    //   name: 'Orders',
    //   component: Orders,
    //   meta: {
    //     requiresAuth: true
    //   },
    // },
    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductView
    },
		AdminRoutes,
    // ProfileRoutes,
    // CartRoutes
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
    if(store.state.user===null)
      next({path: '/login'})
    
    if(to.matched.some(record => record.meta.admin)) {
      const allowedRoles = ['Root','Admin','Manager','Employee']
      try {
        // if(store.state.user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('admin')!==-1)
        if(store.state.user.signInUserSession.accessToken.payload['cognito:groups'].some(role => allowedRoles.includes(role)))
          next()
      } catch (error) {
        next({path: '/restricted'})
      }
    }
    
    next()
  }
  next()
})


export default router