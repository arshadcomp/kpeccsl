import { API } from 'aws-amplify';

import { createOrder } from '@/graphql/mutations';
import { ordersbyUserByTime } from '@/graphql/queries';
import { updateOrder } from '@/graphql/mutations'
import { getInventory } from '@/graphql/queries';

import {
	// NEXT_TOKEN,
	SHOW_LOADER,
	HIDE_LOADER,
	SET_ERROR
} from '@/store/index'

const LIST_ORDERS = 'LIST_ORDERS'

const actions = {
  createOrder({dispatch, commit, getters}, items){
    commit(SHOW_LOADER)
    let order = {}
    order.status = 'CONFIRMED'
    order.history = [
      { name: 'PENDING', createdAt: new Date().toISOString() },
      { name: 'CONFIRMED', createdAt: new Date().toISOString() }
    ]
    order.items = []
    items.forEach(item => {
      order.items.push({
        id: item.id,
        code: item.code,
        name: item.name, 
        image: item.image, 
        quantity: item.quantity, 
        price: item.price, 
        unit: item.unit,
        status:'CONFIRMED'
      })
    })
    order.sellerID = items[0].sellerID
    order.owner = getters.user.attributes.sub
    const customer = getters.user.attributes
    order.customer = {
      address: customer.address,
      email: customer.email,
      name: customer.name,
      phone_number: customer.phone_number,
      sub: customer.sub
    }
    console.log('ORDER', order)

    API.graphql({
      query: createOrder,
      variables: { input: order },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then(response => {
      let cart = getters.cart
      // let order = response.data.createOrder
      console.log('CREATE ORDER', response.data.createOrder)
      cart.forEach((item)=> {
        API.graphql({
          query: getInventory,
          variables: {id: item.inventory.id},
          authMode: 'API_KEY'
        })
        .then(response => {
          console.log('INVENTORY SUCCESS', response.data.getInventory)
          dispatch('updateInventory', { id:response.data.getInventory.id, stock: response.data.getInventory.stock - item.quantity })
        })
        .catch(error => console.log('ERROR FETCHING INVENTORY', error));
      })
      commit(HIDE_LOADER)
      commit('EMPTY_CART')
      commit('EMPTY_BAGS')
      commit('SET_ORDER', order)
    })
    .catch(error => {
      console.log('ERROR CREATING ORDER', error)
      commit(HIDE_LOADER)
      commit(SET_ERROR, error)
    })
  },
  myOrders({commit, getters}) {
    commit(SHOW_LOADER)
    API.graphql({
      query: ordersbyUserByTime,
      variables: {
        owner: getters.user.attributes.sub,
        sortDirection: 'DESC'
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    .then(response => {
      console.log('ORDERS BY USER', response)
      commit(HIDE_LOADER)
      commit(LIST_ORDERS, response.data.OrdersbyUserByTime.items)
    })
    .catch(error => {
      console.log('ERROR FETCHING ORDERS BY USER', error)
      commit(HIDE_LOADER)
    })
  },
  updateOrder({ commit }, payload) {
    API.graphql({
      query: updateOrder,
      variables: { input: payload },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
      .then((response) => {
        console.log('UPDATE ORDER SUCCESS', response.data.updateOrder)
        commit('UPDATE_ORDER', response.data.updateOrder)
      })
      .catch(error => {
        console.log('ERROR UPDATING ORDER', error)
      });
  }
}

export default actions
