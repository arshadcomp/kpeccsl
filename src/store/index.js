import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

import { appGetters, userGetters, productGetters, cartGetters, orderGetters } from './getters'
import { appMutations, userMutations, productMutations, cartMutations, orderMutations } from './mutations'
import { appActions, userActions, productActions, cartActions, orderActions } from './actions'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({cart:  state.cart})
})

const store = new Vuex.Store({
    strict: true,
    state: {
      drawer: false,
      authorized: false,
      isAdmin: false,
      isEmployee: false,
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

      sellers: [
        {
          id: 1,
          name: 'KPECCSL',
          employeeIds: ['54907741-7a42-4c09-9466-8e83ad0920ff', '0286dd09-fd56-4254-86ee-c9b06486ca78', '1c2ccaad-35d3-4da5-a100-d0ea071b1e4a'],
          address: 'Kaiga Township',
          gstin: '29AAAAK3464F1ZO',
          minCartAmount: 500,
          minCartItem: 5,
          deliveryCharge: [
            {min: 1, max: 100000, charge: 0},
          ]
        },
        {
          id: 12,
          name: 'KPECCSL Milk Counter',
          employeeIds: ['54907741-7a42-4c09-9466-8e83ad0920ff'],
          address: 'Kaiga Township',
          gstin: '29AAAAK3464F1ZO',
          minCartAmount: 500,
          minCartItem: 5,
        },
        {
          id: 13,
          name: 'KPECCSL Petrol Pump',
          employeeIds: ['54907741-7a42-4c09-9466-8e83ad0920ff'],
          address: 'Kaiga Township',
          gstin: '29AAAAK3464F1ZO',
          minCartAmount: 500,
          minCartItem: 5,
        },
        {
          id: 17,
          name: 'Paraga Farmer Produce Company Limited',
          employeeIds: ['54907741-7a42-4c09-9466-8e83ad0920ff', 'c0fb8451-514b-4fe5-958c-7831c139c23c', '18f7f552-bf7c-46c8-a0c0-de065bd8a203'],
          address: 'Sirsi',
          gstin: 'dummy-29AAAAK3464F1ZO',
          minCartAmount: 1,
          minCartItem: 1,
          deliveryCharge: [
            {min: 1, max: 500, charge: 20},
            {min: 500, max: 750, charge: 10},
            {min: 750, max: 100000, charge: 0},
          ]
        },
        {
          id: 10,
          employeeIds: ['54907741-7a42-4c09-9466-8e83ad0920ff'],
          name: 'Dummy Seller',
          address: 'Kaiga Township',
        }
      ],

      company: {
        name: 'Kaiga Project Employees Cooperative & Credit Society Limited',
        shortName: 'KPECCSL'
      },
      address: ['Kaiga Township', 'Mallapur, Uttara Kannada', 'Karnataka-581400'],
			telephone: '05452-2225874',
			mobile: '+91-988756985 ',
      email: 'kpeccsl@gmail.com',
      helpEmail: 'arshad.comp@gmail.com',
      helpWhatsapp: '+91-8277749766'
    },
    plugins: [vuexLocal.plugin],
    getters: Object.assign({}, appGetters, userGetters, productGetters, cartGetters, orderGetters),
    mutations: Object.assign({}, appMutations, userMutations, productMutations, cartMutations, orderMutations),
    actions: Object.assign({}, appActions, userActions, productActions, cartActions, orderActions)
});

export default store