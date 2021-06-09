import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import { Auth } from 'aws-amplify'
import { AuthState } from '@aws-amplify/ui-components'

import cartModule from './modules/cart'
import category from './modules/category'
import product from './modules/product'

import seller from './modules/seller'
// 
// import category from './modules/category'
import order from './modules/order'
// import customer from './modules/customer'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
      cartModule:  state.cartModule,
  })
})

const AUTH_STATE = 'AUTH_STATE'
const SET_AUTH = 'SET_AUTH'
const SET_USER = 'SET_USER'
const SET_ROLE = 'SET_ROLE'

export const SHOW_LOADER = 'SHOW_LOADER'
export const HIDE_LOADER = 'HIDE_LOADER'
export const SET_ERROR = 'SET_ERROR'
export const NEXT_TOKEN = 'NEXT_TOKEN'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    loader: false,
    error: false,
    nextToken: null,
    drawer: false,

    isAuthorized: false,
    user: null,
    roles: [],
    company: {
      name: {
        full: 'Kaiga Project Employees Consumer Cooperative Society Limited',
        short: 'KPECCSL'
      },
      address: ['Kaiga Township', 'Mallapur, Uttara Kannada', 'Karnataka-581400'],
      telephone: '05452-2225874',
      mobile: '+91-988756985 ',
      email: 'kpeccsl@gmail.com',
      help: {
        email: 'arshad.comp@gmail.com',
        whatsapp: '+91-8277749766'
      }
    }
  },
  getters: {
    loader: (state) => {
      return state.loader
    },
    error: (state) => {
      return state.error
    },
    nextToken: (state) => {
      return state.nextToken
    },
    drawer: (state) => {
      return state.drawer
    },
    isAuthorized: (state) => {
      return state.isAuthorized
    },
    isAdmin: (state) => {
			return state.roles && (state.roles.includes('Admin') || state.roles.includes('Root'))
		},
    user: (state) => {
      return state.user
    },
    userRoles: (state) => {
      return state.roles
    },
    company: (state) => {
      return state.company
    }
  },
  mutations: {
    [SHOW_LOADER]: (state) => {
      state.loader = true
    },
    [HIDE_LOADER]: (state) => {
      state.loader = false
    },
    [SET_ERROR]: (state, error) => {
      state.error = error
    },
    [AUTH_STATE]: (state, status) => {
      state.isAuthorized = status
    },
    [SET_USER]: (state, user) => {
      state.user = user
    },
    [SET_ROLE]: (state, roles) => {
      state.roles = roles
    },
    [NEXT_TOKEN] : (state, nextToken) => {
      state.nextToken = nextToken
    },
    [TOGGLE_DRAWER] : (state) => {
      state.drawer = !state.drawer
    },
    [SET_AUTH] : (state, {authState, authData}) => {
      console.log('AUTH', authState, authData)
      if(authState === AuthState.SignedIn) {
        state.isAuthorized = true
        state.user = authData
        const userRoles = authData.signInUserSession.accessToken.payload['cognito:groups']
        if(userRoles.length > 0){
					state.roles = userRoles
				}
      } else {
        state.isAuthorized = false
        state.user = null
        state.roles = []
      }
    }
  },
  actions: {
    async authenticate({ commit }) {
      await Auth.currentAuthenticatedUser()
        .then((user) => {
          commit(SET_AUTH, {authState: AuthState.SignedIn, authData: user})
        }).catch(err => {
          commit(SET_AUTH, {authState: '', authData: null})
          console.log(err)
        })
    }
  },
  modules: {
    category,
    cartModule,
    product,
    order,
    // customer,
    seller
  }
})

export const createStore = () => {
  return new Vuex.Store({
    modules: {
      // category,
      // customer,
      // order,
      // product,
      seller
    }
  })
}
