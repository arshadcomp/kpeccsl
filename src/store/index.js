import Vue from 'vue';
import Vuex from 'vuex';

import { appGetters, userGetters, productGetters, cartGetters, orderGetters } from './getters'
import { appMutations, userMutations, productMutations, cartMutations, orderMutations } from './mutations'
import { appActions, userActions, productActions, cartActions, orderActions } from './actions'

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
      drawer: false,
      authorized: false,
      isAdmin: false,
      user: null,
      users: [],
      customerCare: {
        email: 'arshad.comp@gmail.com',
        whatsapp: '+91-8277749766'
      },

      // ajax loader
      showLoader: false,
     
      products: [],
      product: {},
      productCategories: [],

      featuredLists: [],

      cart: [],
      order: {},
      orders: [],
      nextToken: null,

      minCartAmount: 500,
      minCartItem: 5,

      company: {
        name: 'Kaiga Project Employees Cooperative & Credit Society Limited - Admin Console',
        shortName: 'KPECCSL'
      },
      address: ['Kaiga Township', 'Mallapur, Uttara Kannada', 'Karnataka-581400'],
			telephone: '05452-2225874',
			mobile: '+91-988756985 ',
      email: 'kpeccsl@gmail.com',
      helpEmail: 'arshad.comp@gmail.com',
      helpWhatsapp: '+91-8277749766'
    },
    getters: Object.assign({}, appGetters, userGetters, productGetters, cartGetters, orderGetters),
    mutations: Object.assign({}, appMutations, userMutations, productMutations, cartMutations, orderMutations),
    actions: Object.assign({}, appActions, userActions, productActions, cartActions, orderActions)
});

export default store